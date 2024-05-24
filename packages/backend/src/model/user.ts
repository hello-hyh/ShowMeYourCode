import { prismaClient } from '../../prisma'
import { Prisma, user as UserType } from '@prisma/client'

export const user = {
  findMany: async () => prismaClient.user,
  create: async (data: { name: string }) => {
    return user
  },
  findUser: async (data: { userId: number }) => {
    return prismaClient.user.findFirst({
      where: {
        userid: data.userId,
      },
    })
  },
  createByThrid: async (data: UserType) => {
    // user.findUser()
  },
}
