import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"), // App starts from /client
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "client/dist"), // Output should be flat
    emptyOutDir: true,
  },
  base: "/", // 👈 required for Netlify routing
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
