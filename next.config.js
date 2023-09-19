import nextIntlPlugin from 'next-intl/plugin';

import webpack from './webpack/index.js';

const withNextIntl = nextIntlPlugin('./app/libs/i18n/index.ts');

const env = process.env;

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
  env: {
    APP_CONTAINER_NAME: env.APP_CONTAINER_NAME,
    APP_HOST: env.APP_HOST,
    APP_PORT: env.APP_PORT,
    DATABASE_USER: env.DATABASE_USER,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_PORT: env.DATABASE_PORT,
    DATABASE_NAME: env.DATABASE_NAME,
    DATABASE_URL: env.DATABASE_URL,
    DATABASE_URL_WITH_SCHEMA: env.DATABASE_URL_WITH_SCHEMA,
    NETWORK_FRONTEND_NAME: env.NETWORK_FRONTEND_NAME,
    API_URL: env.API_URL,
  },
};

const config = withNextIntl({
  ...nextConfig,
  webpack,
});

export default config;
