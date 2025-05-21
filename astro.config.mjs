// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://nixxontech.com",
  output: "static",
  integrations: [],
  devToolbar: {
    enabled: false,
  },
});
