import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const port = process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173;
  const previewPort = process.env.VITE_PREVIEW_PORT
    ? parseInt(process.env.VITE_PREVIEW_PORT)
    : 4173;

  return defineConfig({
    plugins: [react()],
    server: { port },
    preview: { port: previewPort, host: true },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};
