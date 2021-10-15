import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteFonts from "vite-plugin-fonts";
// import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    // Pages({
    //   pagesDir: [
    //     { dir: "src/pages", baseRoute: "" },
    //     { dir: "src/pages/public/", baseRoute: "" },
    //     { dir: "src/pages/auth/", baseRoute: "" },
    //   ],
    // }),
    Components({ resolvers: [HeadlessUiResolver()] }),
    VitePWA({
      manifest: {
        name: "EveryThought.app",
        short_name: "EveryThought",
        start_url: "https://EveryThought.app",
        display: "standalone",
        description:
          "EveryThought is a web application designed to help you identify and recognize your emotions by using daily guided prompts and journaling.",
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
