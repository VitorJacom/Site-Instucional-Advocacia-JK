import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.jkadvogados.com",

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    format: "directory",
  },

  redirects: {
    "/admin": "./index.html",
  },

  server: {
    port: 4321,
    host: true,
  },
});
