import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('access_token')
  const userStore = useUserStore();
  userStore.getUser();
});
