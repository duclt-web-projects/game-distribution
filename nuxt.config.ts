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
  modules: ["@pinia/nuxt", "@element-plus/nuxt", "@ant-design-vue/nuxt"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? "https://kimlestudio.xyz/api",
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL ?? "https://kimlestudio.xyz",
    },
  },
  spaLoadingTemplate: true,
});
