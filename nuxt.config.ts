// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["@/assets/scss/app.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  plugins: ["@/plugins/axios.ts"],
  nitro: {
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:8000/api",
        changeOrigin: true,
      },
    },
  },
});
