// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['@/assets/scss/app.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-vue3-google-signin',
    'vue3-carousel-nuxt',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? 'https://kimlestudio.xyz/api',
      backendUrl:
        process.env.NUXT_PUBLIC_BACKEND_URL ?? 'https://kimlestudio.xyz',
      facebookClientId: process.env.NUXT_PUBLIC_FACEBOOK_CLIENT_ID ?? '',
    },
  },
  spaLoadingTemplate: true,
  googleSignIn: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
  },
  carousel: {
    prefix: 'nuxt',
  },
  i18n: {
    vueI18n: './config/i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      redirectOn: 'root', // recommended
    },
  },
});
