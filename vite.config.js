import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSvg from "vite-svg-loader";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSvg()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
