import { ROUTE_NAMES } from '@/constants';
import { useUserStore } from '@/stores/useUserStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useUserStore();

  const redirectRoute = [ROUTE_NAMES.LOGIN, ROUTE_NAMES.LOGOUT];

  if (!auth.isLoggedIn) {
    return navigateTo(ROUTE_NAMES.LOGIN, { replace: true });
  } else if (redirectRoute.includes(to.fullPath)) {
    return navigateTo(ROUTE_NAMES.USER_GAME, { replace: true });
  }
});
