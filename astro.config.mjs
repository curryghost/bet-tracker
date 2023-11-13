import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
