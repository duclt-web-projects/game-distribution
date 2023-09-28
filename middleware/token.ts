import { useToken } from "../composables/useToken";
import { ROUTE_NAMES } from "../constants/routes";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("token client");
  const router = useRouter();
  // router.push("/login");

  return navigateTo(ROUTE_NAMES.LOGIN, { replace: true });
  const tokenStorage = localStorage.getItem("access_token");

  const token = useToken();
  token.value = tokenStorage!;
});
