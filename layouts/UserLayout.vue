<script setup lang="ts">
import { HomeIcon, PuzzlePieceIcon } from "@heroicons/vue/24/outline";

const menus = [
  {
    path: "/user",
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "Games",
    icon: PuzzlePieceIcon,
    child: [
      {
        name: "List",
        path: "/user/games",
      },
      {
        name: "Add new game",
        path: "/user/games/add",
      },
    ],
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

<style scoped lang="scss"></style>
