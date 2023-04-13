import webpack from './webpack/index.js';

// nextJs配置
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
};

const config = {
  ...nextConfig,
  webpack,
};

export default config;
