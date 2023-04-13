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
  env: {
    alchemyKey: process.env.ALCHEMY_KEY,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    apiUrl: process.env.API_URL,
  },
};

const config = {
  ...nextConfig,
  webpack,
};

export default config;
