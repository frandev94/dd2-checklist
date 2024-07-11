import react from "@astrojs/react";
import { defineConfig } from "astro/config";
// import { loadEnv } from 'vite'

// const { MY_ENV_VALUE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
});
