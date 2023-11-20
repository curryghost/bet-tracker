FROM oven/bun:canary-slim as build
ENV NODE_ENV=production
COPY ./bun.lockb /app
COPY ./package.json /app
WORKDIR /app
RUN bun install --production
COPY . .
RUN bun run build

FROM node:21-alpine3.18
ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
WORKDIR /app
CMD [ "node", "dist/server/entry.mjs" ]