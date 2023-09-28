import { useAuthStore } from "@/stores/useAuthStore";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  if(!authStore.isLoggedIn) {
    await authStore.getProfile();
  }

});
