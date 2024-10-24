import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const host = process.env.VITE_HOST || 'localhost';
const port = 5173;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    host,
    port
  }
})
