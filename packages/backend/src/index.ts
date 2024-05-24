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
import * as trpcExpress from '@trpc/server/adapters/express'
import { userRouter } from './router/user-router'

const appRouter = router({
  user: userRouter,
  test: publicProcedure.query(() => {
    logger.info(process.env.GITHUB_SECRET + '| process.env.GITHUB_SECRET')
    return process.env.GITHUB_SECRET
  }),
})
const app = express()
app.use(cors())
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
