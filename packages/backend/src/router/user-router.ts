import { publicProcedure, authorizedProcedure, t } from '../trpc'
import { string, z } from 'zod'
import axios from 'axios'
import { logger } from '../logger'
import { user } from '../model/user'
import type { user as UserType } from '@prisma/client'
import GithubUserModel from '../../test.json'
import { TRPCError } from '@trpc/server'
import { buildJWT, decodeAndVerifyJwtToken } from '../utils/jwt'

const githubOAuthUrl = 'https://github.com/login/oauth/access_token'
const githubOAuthGetUserInfoUrl = 'https://api.github.com/user'
export const userRouter = {
  test: authorizedProcedure.query(() => {
    return 'this is test'
  }),
  getUserInfo: authorizedProcedure.query(async (opt) => {
    return await user.findUser({
      userId: (opt.ctx.authUser as UserType).userid,
    })
  }),
  getGithubCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async (opt) => {
      const { authUser } = opt.ctx
      if (opt.ctx.authUser)
        return {
          authUser,
        }
      const githubClientId = process.env.GITHUB_CLIENTID
      const githubSercet = process.env.GITHUB_SECRET
      const { code } = opt.input
      if (!code) {
        return new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'code is required',
        })
      }
      const { data: tokenInfo } = await axios.get(
        `${githubOAuthUrl}?client_id=${githubClientId}&client_secret=${githubSercet}&code=${code}`,
        {
          timeout: 30000,
          headers: {
            Accept: 'application/json',
          },
        },
      )
      if (tokenInfo) {
        const authToken = tokenInfo.access_token
        const authType = tokenInfo.token_type
        if (authToken && authType) {
          const { data: userInfo } = await axios.get<typeof GithubUserModel>(
            githubOAuthGetUserInfoUrl,
            {
              headers: {
                Authorization: `token ${authToken}`,
              },
            },
          )
          if (userInfo && userInfo.email) {
            const newUser: Partial<UserType> = {
              email: userInfo.email,
              nick_name: userInfo.login,
              user_name: userInfo.login,
              avatar_url: userInfo.avatar_url,
              github_open_id: `${userInfo.id}`,
            }
            const res = await user.createOrGetToken(newUser)
            return res
          }
        }
      }
    }),
  verifyToekn: publicProcedure
    .input(z.string().optional())
    .query(async (opt) => {
      const token = opt.input
      const { authUser } = opt.ctx
      if (!token) {
        if (authUser) {
          return {
            authUser,
          }
        }
        return new TRPCError({
          code: 'UNAUTHORIZED',
        })
      } else {
        const res = await decodeAndVerifyJwtToken(token)
        return res
      }
    }),
  loginByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        verifyCode: z.string(),
      }),
    )
    .mutation(async (opt) => {
      const { email, verifyCode } = opt.input
      const { session } = opt.ctx
      const sessionCode = session.code
      const sessionExpireTime = session.expireTime
      logger.info(`${sessionCode} ${sessionExpireTime}`)
      if (!sessionCode || !sessionExpireTime) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        })
      }
      if (
        email &&
        sessionCode === verifyCode &&
        sessionExpireTime > Date.now()
      ) {
        const res = await user.createByEmail(email)
        session['code'] = null
        session['expireTime'] = null
        return await buildJWT(res)
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Login failed',
        })
      }
    }),
}
