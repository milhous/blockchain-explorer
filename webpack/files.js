/**
 * 文件
 * @param {any} rules 规则
 */
const files = rules => {
  const fileLoaderRule = rules.find(rule => rule.test?.test?.('.svg'));

  // 文件配置
  const fileConfig = [];

  // svg通过url方式加载
  fileConfig.push({
    test: /\.svg$/i,
    resourceQuery: /url/,
    use: [
      {
        loader: fileLoaderRule.loader,
        options: fileLoaderRule.options,
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
    issuer: fileLoaderRule.issuer,
    resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]},
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
