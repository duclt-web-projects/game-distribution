export default defineNuxtRouteMiddleware((to, from) => {
  // if (PROTECTED_ROUTES.includes(to.path) && !userStore.id) {
  //   return navigateTo(ROUTE_NAMES.LOGIN);
  // } else if ((to.path === ROUTE_NAMES.LOGIN || to.path === ROUTE_NAMES.REGISTER) && userStore.id) {
  //   return navigateTo(ROUTE_NAMES.USER_GAME);
  // }
});
