import { useAdminStore } from "@/stores/useAdminStore";

export default defineNuxtPlugin(async () => {
  const userStore = useAdminStore();

  if (!userStore.isLoggedIn) {
    await userStore.getProfile();
  }
});
