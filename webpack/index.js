// 文件
import files from './files.js';
// 别名
import alias from './alias.js';
// 插件
import plugins from './plugins.js';

// webpack配置
const webpack = config => {
  if (Array.isArray(config.externals)) {
    config.externals.push('bufferutil', 'utf-8-validate');
  }

  // 处理svg文件
  const filesConfig = files(config.module.rules);

  config.module.rules.push(...filesConfig);

  // 处理别名
  const aliasConfig = alias();

  config.resolve.alias = {...config.resolve.alias, ...aliasConfig};

  // 处理插件
  const pluginsConfig = plugins();

  config.plugins.push(...pluginsConfig);

  return config;
};

export default webpack;
