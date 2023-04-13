/**
 * 文件
 * @param {any} rules 规则
 */
const files = rules => {
  let svgLoaderOptions = {};

  for (const rule of rules) {
    if (rule.test && rule.options && ('' + rule.test).includes('svg')) {
      svgLoaderOptions = rule.options;

      break;
    }
  }

  // 文件配置
  const fileConfig = [];

  // svg通过url方式加载
  fileConfig.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: /url/,
    use: [
      {
        loader: 'next-image-loader',
        options: svgLoaderOptions,
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            'prefixIds',
          ],
        },
      },
    ],
  });

  // svg通过inline方式加载
  fileConfig.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: {not: [/url/]},
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              'prefixIds',
            ],
          },
        },
      },
    ],
  });

  // svga
  fileConfig.push({
    test: /\.svga$/i,
    type: 'asset/resource',
  });

  return fileConfig;
};

export default files;
