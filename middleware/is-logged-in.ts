import { ROUTE_NAMES } from "@/constants";
import { useAuthStore } from "@/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("logged in");
  if (process.server) return;
  console.log("logged clent");
  const authStore = useAuthStore();
  const protectedRoutes = [ROUTE_NAMES.USER_GAME, ROUTE_NAMES.USER_GAME_CREATE, ROUTE_NAMES.USER_GAME_EDIT];
  const redirectRoutes = [ROUTE_NAMES.LOGIN, ROUTE_NAMES.REGISTER];

  if (protectedRoutes.includes(to.fullPath) && !authStore.isLoggedIn) {
    return navigateTo(ROUTE_NAMES.LOGIN);
  }

  if (redirectRoutes.includes(to.fullPath) && authStore.isLoggedIn) {
    return navigateTo(ROUTE_NAMES.USER_GAME, { replace: true });
  }
});
