import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
})
import { logger } from './logger'
import { createContext, publicProcedure, router } from './trpc'
import expressSession from 'express-session'
import * as trpcExpress from '@trpc/server/adapters/express'
import { userRouter } from './router/user-router'
import { stmpRouter } from './router/stmp-router'

const appRouter = router({
  user: userRouter,
  stmp: stmpRouter,
  test: publicProcedure.query(() => {
    logger.info(process.env.GITHUB_SECRET + '| process.env.GITHUB_SECRET')
    return process.env.GITHUB_SECRET
  }),
})
const app = express()
// 预留位置
const allowedOrigins = ['http://localhost:9999']

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  }),
)
app.use(
  expressSession({
    secret: 'GG##@$',
    cookie: { domain: 'localhost' },
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.get('/test', (req, res) => {
  res.json({ ok: true })
})
const prot = 3000

app.listen(prot, () => {
  console.log(`Example app listening on port ${prot}`)
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
