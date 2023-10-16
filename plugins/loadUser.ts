import { useUserStore } from '@/stores/useUserStore';

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn) {
    await userStore.getProfile();
  }
});
