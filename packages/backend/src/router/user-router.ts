import { publicProcedure, t } from '../trpc'
import { string, z } from 'zod'
import axios from 'axios'
import { logger } from '../logger'
const githubOAuthUrl = 'https://github.com/login/oauth/access_token'

export const userRouter = {
  test: publicProcedure.query(() => {
    return 'this is test'
  }),
  getGithubCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async (opt) => {
      const githubClientId = process.env.GITHUB_CLIENTID
      const githubSercet = process.env.GITHUB_SECRET

      const { code } = opt.input
      logger.info(githubClientId + '|id')
      logger.info(githubSercet)
      const { data } = await axios.get(
        `${githubOAuthUrl}?client_id=${githubClientId}&client_secret=${githubSercet}&code=${code}`,
      )
      if (data) {
        return data
      }
    }),
}
