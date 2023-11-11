FROM oven/bun:canary-slim as build
ENV NODE_ENV=production
COPY ./ /app
WORKDIR /app
RUN bun install
RUN bun run build

FROM oven/bun:canary-slim
ENV HOST=0.0.0.0
ENV PORT=4321
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
WORKDIR /app
CMD [ "bun", "dist/server/entry.mjs" ]