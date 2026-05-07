import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://vitorjacom.github.io",

  base: "/Site-Instucional-Advocacia-JK",

  build: {
    format: "directory",
  },

  server: {
    port: 4321,
    host: true,
  },
});
