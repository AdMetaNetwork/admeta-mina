import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import path from "node:path";
import ViteTsconfigPaths from 'vite-tsconfig-paths';
import topLevelAwait from 'vite-plugin-top-level-await';
import graphql from 'vite-plugin-graphql';

function generateManifest() {
  const args = process.argv;

  const manifest = args[4] === '--firefox' ? readJsonFile("src/manifest/manifest-firefox.json") : readJsonFile("src/manifest/manifest-chrome.json");

  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
    }),
    ViteTsconfigPaths(),
    topLevelAwait(),
    graphql
  ],
  resolve: {
    alias: {
      // In dev mode, make sure fast refresh works
      "/@react-refresh": path.resolve(
        "node_modules/@vitejs/plugin-react-swc/refresh-runtime.js"
      ),
    },
  },
});
