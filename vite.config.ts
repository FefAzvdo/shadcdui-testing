import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/prod/" : "/",
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    plugins: [react()],
  };
});
