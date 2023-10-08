import { ROUTE_NAMES } from "@/constants";
import { useAdminStore } from "@/stores/useAdminStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAdminStore();

  const redirectRoute = [ROUTE_NAMES.ADMIN_LOGIN, ROUTE_NAMES.ADMIN_LOGOUT];

  if (!auth.isLoggedIn) {
    return navigateTo(ROUTE_NAMES.ADMIN_LOGIN, { replace: true });
  } else if (redirectRoute.includes(to.fullPath)) {
    return navigateTo(ROUTE_NAMES.ADMIN_GAME, { replace: true });
  }
});
