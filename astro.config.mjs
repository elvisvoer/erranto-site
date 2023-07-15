import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

const isDev = import.meta.env.MODE === "development";
const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
  site: isDev ? `http://localhost:${DEV_PORT}` : "https://erranto.com",

  server: {
    /* Dev. server only */
    port: DEV_PORT,
  },

  integrations: [mdx(), tailwind(), svelte()],
});
