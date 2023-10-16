<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';

const route = useRoute();
const { isCollapse } = useSidebar();
const props = defineProps({
  navList: {
    type: Array,
    default() {
      return [];
    },
  },
});

const asideRef = ref<HTMLElement | null>(null);
const asideMaskRef = ref<HTMLDivElement | null>(null);

watch(isCollapse, () => {
  toggleAside();
});

const toggleAside = () => {
  const asideClassList = asideRef.value?.classList;
  const asideMaskClassList = asideMaskRef.value?.classList;

  asideClassList?.toggle('-translate-x-full');
  asideClassList?.toggle('lg:w-[80px]');

  if (asideMaskClassList?.contains('invisible')) {
    asideMaskClassList?.remove('invisible', 'opacity-0');
    asideMaskClassList?.add('visible', 'opacity-50');
  } else {
    asideMaskClassList?.add('invisible', 'opacity-0');
    asideMaskClassList?.remove('visible', 'opacity-50');
  }
};

watch(route, () => {
  const asideClassList = asideRef.value?.classList;
  const asideMaskClassList = asideMaskRef.value?.classList;
  if (asideMaskClassList?.contains('visible')) {
    asideMaskClassList?.add('invisible', 'opacity-0');
    asideMaskClassList?.remove('visible', 'opacity-50');
    asideClassList?.toggle('-translate-x-full');
  }
});
</script>

<template>
  <aside
    ref="asideRef"
    class="z-20 fixed top-0 left-0 bg-gray-800 w-[250px] h-screen overflow-y-auto pb-4 -translate-x-full transition-all duration-500 ease-in-out lg:static lg:translate-x-0 lg:shrink-0 lg:shadow-2xl lg:shadow-gray6-600"
  >
    <div
      class="sticky top-0 bg-gray-800 h-16 flex justify-center items-center shadow-md"
    >
      <RouterLink to="/" class="text-white text-2xl font-medium h-full p-4">
        <img
          class="h-full object-contain"
          src="/images/logos/logo-white.png"
          alt=""
        />
      </RouterLink>
    </div>
    <NavList :is-collapse="isCollapse" :nav-list="navList" />
  </aside>
  <div
    ref="asideMaskRef"
    class="bg-black h-screen w-screen fixed top-0 left-0 z-10 opacity-0 invisible transition-all duration-500 lg:hidden"
    @click="toggleAside"
  ></div>
</template>

<style scoped></style>
