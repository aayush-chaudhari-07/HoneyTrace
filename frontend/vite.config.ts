import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  envDir: path.resolve(__dirname, ".."),
  // CRITICAL: Force production JSX transform during build.
  // If NODE_ENV=development leaks in from the root .env, Vite emits
  // jsxDEV() which the Nitro SSR runtime doesn't have, causing a 500 crash.
  define:
    command === "build"
      ? { "process.env.NODE_ENV": JSON.stringify("production") }
      : {},
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel",
    }),
    // Note: @vitejs/plugin-react is intentionally removed.
    // tanstackStart() already includes the React JSX transform.
    // Adding react() on top creates dual JSX runtime registration which
    // causes "jsxDEV is not a function" in the Nitro SSR bundle.
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    port: 5173,
    host: true,
  },
}));

