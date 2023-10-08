import { useAdminStore } from "@/stores/useAdminStore";

export default defineNuxtPlugin(async () => {
  const adminStore = useAdminStore();

  if (!adminStore.isLoggedIn) {
    await adminStore.getProfile();
  }
});
