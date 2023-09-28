import { RESPONSE_STATUS, ROUTE_NAMES, TOKEN_STATUS } from "@/constants";
import { useAuthStore } from "@/stores/useAuthStore";
import { IUser } from "@/types/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("auth client");

  const authStore = useAuthStore();
  const token = useToken();
  console.log(token.value);

  if (!token.value) {
    return navigateTo(ROUTE_NAMES.LOGIN);
  }

  const { data, error } = await useHttp<IUser>("auth/profile");

  if (error.value) {
    if (error.value.status === TOKEN_STATUS.NOT_REFRESH || error.value.status === TOKEN_STATUS.UN_AUTHORIZATION) {
    } else if (error.value.status === TOKEN_STATUS.EXPIRED) {
      const response = await authStore.refresh();

      if (response.status === RESPONSE_STATUS.FAILED) {
        return navigateTo(ROUTE_NAMES.LOGIN);
      }
    }
  }

  authStore.setUser(data.value);
});
