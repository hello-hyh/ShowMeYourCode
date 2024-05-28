import { user as UserType } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const buildJWT = (data: UserType) => {
  return {
    token: jwt.sign(data, process.env.JWTPRIVATEKEY!, {
      expiresIn: '24h',
      algorithm: 'RS256',
    }),
    expiresTime: new Date().getTime() + 24 * 60 * 60 * 1000,
  }
}

export const decodeAndVerifyJwtToken = async (token: string) => {
  return jwt.verify(token, process.env.JWTPRIVATEKEY!, {
    algorithms: ['RS256'],
  })
}
