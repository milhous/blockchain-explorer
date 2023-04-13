import CopyPlugin from 'copy-webpack-plugin';

import {getFolder, pathExists, isDirectory, resolveAppPath} from './utils.js';

// 插件
const plugins = () => {
  const appFolder = getFolder('app');
  const pluginsConfig = [];

  const patterns = [];

  for (const [name, dir] of appFolder.entries()) {
    const path = `${dir}/locales`;
    const isExisted = pathExists(path);

    if (isExisted && isDirectory(path)) {
      patterns.push({
        from: path,
        to: resolveAppPath(`./.next/static/locales/${name}`),
        globOptions: {
          ignore: ['**/.DS_Store'],
        },
        noErrorOnMissing: true,
      });
    }
  }

  if (patterns.length) {
    pluginsConfig.push(
      new CopyPlugin({
        patterns,
      }),
    );
  }

  return pluginsConfig;
};

export default plugins;
