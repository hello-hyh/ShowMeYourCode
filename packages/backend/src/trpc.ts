import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

type Context = Awaited<ReturnType<typeof createContext>>
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
