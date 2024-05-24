export const getGithubOAuthUrl = (clientId: string, socpe: string) =>
  `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${socpe}`
