import react from "@vitejs/plugin-react";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import { terser } from "rollup-plugin-terser";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import importmap from "./importmap.json" assert { type: "json" };
import path from "path";

export default defineConfig(() => ({
  build: {
    copyPublicDir: false,
  },
  plugins: [
    react(),
    {
      ...rollupImportMapPlugin([importmap]),
      enforce: "pre",
      apply: "build",
    },
    viteCompression({
      algorithm: "brotliCompress",
    }),
    viteCompression({
      algorithm: "gzip",
    }),
    terser(),
  ],
  test: {
    global: true,
    environment: "jsdom",
    deps: {
      inline: ["@testing-library/user-event"],
    },
    setupFiles: ["vitest-setup.tsx"],
  },
  resolve: {
    alias: {
      "~utils": path.resolve(__dirname, "./src/utils/"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~store": path.resolve(__dirname, "./src/store"),
      "~vitest-setup": path.resolve(__dirname, "./vitest-setup"),
      "~mocks": path.resolve(__dirname, "./src/mocks")
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
}));
