import { describe, it, expect } from 'vitest';
import { getGithubOAuthUrl } from './constans';

describe('getGithubOAuthUrl', () => {
  it('should generate the correct GitHub OAuth URL with given clientId and scope', () => {
    const clientId = 'testClientId';
    const scope = 'repo,user';
    const expectedUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;

    const result = getGithubOAuthUrl(clientId, scope);

    expect(result).toBe(expectedUrl);
  });

  it('should handle empty clientId and scope', () => {
    const clientId = '';
    const scope = '';
    const expectedUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;

    const result = getGithubOAuthUrl(clientId, scope);

    expect(result).toBe(expectedUrl);
  });

  it('should handle special characters in clientId and scope', () => {
    const clientId = 'clientIdWithSpecialChars!@#$%^&*()';
    const scope = 'scopeWithSpecialChars!@#$%^&*()';
    const expectedUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;

    const result = getGithubOAuthUrl(clientId, scope);

    expect(result).toBe(expectedUrl);
  });
});
