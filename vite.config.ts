import react from "@vitejs/plugin-react";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import { terser } from "rollup-plugin-terser";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import importmap from "./importmap.json" assert { type: "json" };

export default defineConfig(({ command }) => ({
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
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
}));
