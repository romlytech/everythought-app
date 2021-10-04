import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteFonts from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "EveryThought.app",
        short_name: "EveryThought",
        start_url: "https://EveryThought.app",
        display: "standalone",
        description: "Anonmous thoughts with others.",
      },
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Rubik",
            styles: "ital,wght@0,300;0,400;0,500;0,600;0,700;1,400",
          },
          {
            name: "Lora",
            styles: "ital,wght@0,300;0,400;0,500;0,600;0,700;1,400",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888/.netlify/functions",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
