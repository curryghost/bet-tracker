FROM oven/bun:latest as build
COPY ./ /app
WORKDIR /app
RUN bun install
RUN bun build

FROM oven/bun:latest
COPY --from=build/node_modules /app
COPY --from=build/dist /app
WORKDIR /app
RUN bun dist/entry.mjs