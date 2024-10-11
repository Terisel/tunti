import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tunti/", // Replace [REPO_NAME] with your actual repo name
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.porssisahko.net",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      },
      "/new-api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    },
    
  }
})
