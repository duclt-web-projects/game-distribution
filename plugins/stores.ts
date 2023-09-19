import { useUserStore } from "@/store/user";

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      userStore: useUserStore(),
    },
  };
});
