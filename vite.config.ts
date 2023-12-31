import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

const base = "/";
globalThis.__vite_test_filename = __filename;
globalThis.__vite_test_dirname = __dirname;

export default defineConfig({
  base,
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: true,
  },
});
