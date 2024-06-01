import { prismaClient } from '../../prisma'
import { Prisma, user as UserType } from '@prisma/client'
import GithubUserModel from '../../test.json'
import { buildJWT } from '../utils/jwt'

export const user = {
  findMany: async () => prismaClient.user,
  createOrGetToken: async (userInfo: Partial<UserType>) => {
    const res = await user.findUser({
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      userId: userInfo.userid,
    })
    if (res) {
      const jwtInfo = buildJWT(res)
      return {
        ...jwtInfo,
        ...res,
      }
    } else {
      const newUser = await prismaClient.user.create({
        data: {
          email: userInfo.email!,
          nick_name: userInfo.nick_name!,
          user_name: userInfo.user_name!,
          avatar_url: userInfo.avatar_url!,
        },
      })
      if (newUser) {
        const jwtInfo = buildJWT(newUser)
        return {
          ...jwtInfo,
          ...newUser,
        }
      }
    }
  },
  create: async (data: UserType) => {
    const res = await prismaClient.user.create({
      data: data,
    })
    return res
  },
  findUser: async (data: {
    userId?: number
    email?: string
    phone?: string
  }) => {
    return await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            userid: data.userId,
            email: data.email,
            phone: data.phone,
          },
        ],
      },
    })
  },
  createByEmail: async (email: string) => {
    const res = await user.findUser({
      email: email,
    })
    if (res) {
      return res
    } else {
      const newUser = await prismaClient.user.create({
        data: {
          email: email,
          nick_name: email,
          user_name: email,
        },
      })
      return newUser
    }
  },
}
