import { defineConfig } from "vite";
import Compression from 'vite-plugin-compression';

export default defineConfig({
  base: './hugo-blog',
  publicDir: './public',
  build: {
    outDir: './dist',
    rollupOptions: {
      input: ["./public/index.html"],
    }
  },
  css: {
    postcss: "./assets/css/postcss.config.js"
  },
  plugins: [Compression({})],

})
