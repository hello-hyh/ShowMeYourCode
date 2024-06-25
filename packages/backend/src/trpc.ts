import { initTRPC, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { decodeAndVerifyJwtToken } from './utils/jwt'
import { logger } from './logger'

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      try {
        const authUser = await decodeAndVerifyJwtToken(token)
        return authUser
      } catch (error) {
        return null
      }
    }
    return null
  }
  const authUser = await getUserFromHeader()

  return {
    session: req.session,
    authUser,
  }
} // no context

export type Context = Awaited<ReturnType<typeof createContext>>
export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const authorizedProcedure = publicProcedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts
    // `ctx.user` is nullable
    if (!ctx.authUser) {
      //     ^?
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return opts.next({
      ctx: {
        authToken: ctx.authUser,
      },
    })
  },
)
