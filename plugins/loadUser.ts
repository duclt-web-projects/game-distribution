import { useUserStore } from "@/stores/useUserStore";

export default defineNuxtPlugin(async () => {
  const authStore = useUserStore();

  if(!authStore.isLoggedIn) {
    await authStore.getProfile();
  }

});
