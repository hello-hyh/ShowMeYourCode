import { z } from 'zod'
import { authorizedProcedure, publicProcedure } from '../trpc'
import { sendEmailCode } from '../utils/stmp-server'
import { logger } from '../logger'

function getCode() {
  return Math.random().toString(36).slice(-6)
}

export const stmpRouter = {
  sendEmailCode: publicProcedure
    .input(
      z.object({
        to: z.string(),
      }),
    )
    .mutation(async (opt) => {
      const { to } = opt.input
      const code = getCode()
      opt.ctx.session['code'] = code
      opt.ctx.session['expireTime'] = Date.now() + 1000 * 60 * 5
      await sendEmailCode(to, code)
      return null
    }),
}
