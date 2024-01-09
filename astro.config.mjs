import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
  site: "https://erranto.com",
  server: {
    /* Dev. server only */
    port: DEV_PORT,
  },
  integrations: [mdx(), tailwind(), svelte(), sitemap()],
});
