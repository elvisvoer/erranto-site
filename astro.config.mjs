import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";
const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
  site: "https://erranto.com",

  server: {
    /* Dev. server only */
    port: DEV_PORT,
  },

  integrations: [mdx(), tailwind(), svelte(), sitemap(), clerk(), db()],
  trailingSlash: "never",
  adapter: vercel(),
  output: "server",
  env: {
    schema: {
      PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
        context: "server",
        access: "public",
      }),
      CLERK_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      DPK_ADMIN_EMAIL: envField.string({
        context: "server",
        access: "secret"
      })
    },
  },
});
