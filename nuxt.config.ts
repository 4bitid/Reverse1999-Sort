import { fileURLToPath } from "url"
import { dirname } from "path"
import tailwindcss from "@tailwindcss/vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [],

  app: {
    baseURL: "/Reverse1999-Sort/",
  },
  nitro: {
    preset: "github-pages",
  },
})
