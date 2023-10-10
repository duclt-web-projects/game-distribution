<script setup lang="ts">
import { adminMenus } from "@/config/admin-menu";

onMounted(() => {
  document.body.className = "";
});
</script>

<template>
  <a-layout>
    <dashboard-sidebar :menu-data="adminMenus" />
    <a-layout class="body">
      <dashboard-header />
      <a-layout-content class="m-5">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.body {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
