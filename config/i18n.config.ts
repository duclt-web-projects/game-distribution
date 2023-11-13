import en from '@/locales/en.json';
import vi from '@/locales/vi.json';

export default defineI18nConfig(() => ({
  lazy: true,
  langDir: '/locales',
  legacy: false,
  strategy: 'no_prefix',
  locale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
  messages: {
    en,
    vi,
  },
}));
