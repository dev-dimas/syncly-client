import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import generouted from "@generouted/react-router/plugin";
import lqip from "vite-plugin-lqip";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  plugins: [react(), generouted(), lqip(), removeConsole()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
