import { user as UserType } from '@prisma/client'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { logger } from '../logger'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const buildJWT = (data: UserType) => {
  const privateKey = readFileSync(
    path.join(__dirname, '../../keys/private_key.pem'),
    'utf-8',
  )

  return {
    token: jwt.sign(data, privateKey!, {
      expiresIn: '24h',
      algorithm: 'RS256',
    }),
    expiresTime: new Date().getTime() + 24 * 60 * 60 * 1000,
  }
}

export const decodeAndVerifyJwtToken = async (token: string) => {
  const privateKey = readFileSync(
    path.join(__dirname, '../../keys/private_key.pem'),
    'utf-8',
  )

  return jwt.verify(token, privateKey!, {
    algorithms: ['RS256'],
  })
}
