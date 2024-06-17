const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const path = require('path');

const projectRoot = __dirname;

const workspaceRoot = path.resolve(projectRoot, '../..');

const extraNodeModules = {
  'backend': path.resolve(path.join(__dirname, '../../backend')),
  'frontend': path.resolve(path.join(__dirname, '../../frontend'))
};
const watchFolders = [
  projectRoot,
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
const nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
module.exports = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules,
    nodeModulesPaths
  },
  watchFolders
}) 
