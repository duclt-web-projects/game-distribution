import { ref } from 'vue';

const isCollapse = ref(false);

export function useSidebar() {
  return {
    isCollapse,
  };
}
