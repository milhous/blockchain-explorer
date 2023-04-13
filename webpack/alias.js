import {getFolder} from './utils.js';

// 获取配置
const getConfig = map => {
  const config = {};

  for (const [name, dir] of map.entries()) {
    config[`@${name}`] = dir;
  }

  return config;
};

// 别名配置
const alias = () => {
  const appFolder = getFolder('app');
  const pageFolder = getFolder('pages');
  const aliasConfig = {...getConfig(appFolder), ...getConfig(pageFolder)};

  return aliasConfig;
};

export default alias;
