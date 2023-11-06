import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [preact(), tailwind({ applyBaseStyles: false })],
});
