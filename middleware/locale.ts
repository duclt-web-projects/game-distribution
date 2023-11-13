export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp();
  const lang = useCookie('lang').value ?? 'en';
  $i18n.setLocale(lang);
});
