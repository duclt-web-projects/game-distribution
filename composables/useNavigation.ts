import { useRouter } from "vue-router";

export function useNavigation() {
  const router = useRouter();

  function navigateTo(url: string, prefix = "games") {
    router.push(`${prefix}/${url}`);
  }
  return { navigateTo };
}
