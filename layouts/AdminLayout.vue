<script setup lang="ts">
import { HomeIcon, PuzzlePieceIcon, TagIcon, UserIcon } from "@heroicons/vue/24/outline";

const menus = [
  {
    path: "/admin",
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "Games",
    icon: PuzzlePieceIcon,
    child: [
      {
        name: "Games By User",
        path: "/admin/games",
      },
    ],
  },
  {
    name: "Category",
    icon: TagIcon,
    path: "/admin/categories",
  },
  {
    name: "User",
    icon: UserIcon,
    path: "/admin",
  },
];

onMounted(() => {
  document.body.className = "";
});
</script>

<template>
  <div class="flex">
    <dashboard-sidebar :navList="menus" />
    <div class="w-full h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
      <dashboard-header />
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
