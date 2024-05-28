export const getGithubOAuthUrl = (clientId: string, socpe: string) =>
  `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${socpe}`

export const baseAPI =
  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''
export const getGithubCodeAPI = `${baseAPI}/trpc/user.getGithubCode`