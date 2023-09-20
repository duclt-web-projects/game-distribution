import { ROUTE_NAMES } from "@/constants";
import { useUserStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (to.path === ROUTE_NAMES.HOME && userStore.id) {
    return navigateTo(ROUTE_NAMES.LOGIN);
  } else if ((to.path === ROUTE_NAMES.LOGIN || to.path === ROUTE_NAMES.REGISTER) && userStore.id) {
    return navigateTo(ROUTE_NAMES.USER);
  }
});
