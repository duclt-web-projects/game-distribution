import { useAuthStore } from "@/stores/useAuthStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  console.log("plugin load user");

  if (!auth.isLoggedIn) {
    console.log("plugin load user store");
    await auth.fetchUser();
  }
});
