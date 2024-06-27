module.exports = {
  apps: [{
    name: 'showmeyourcode-backend',
    script: './src/index.ts',
    interpreter: './node_modules/.bin/tsx',
    instances: 1,
  }]
};
