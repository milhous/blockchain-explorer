FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

# Install dependencies only when needed
FROM base AS builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build
RUN rm -rf ./.yarn/cache

EXPOSE $APP_PORT

CMD yarn run start -p $APP_PORT