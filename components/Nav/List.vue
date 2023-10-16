<script setup lang="ts">
import NavItem from '@/components/Nav/Item.vue';

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  navList: {
    type: Array<Object>,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <nav class="mt-4">
    <ul class="flex flex-col gap-2 text-white">
      <li v-for="(nav, index) in navList" :key="index">
        <NavItem :nav-item="nav" :is-collapse="isCollapse" />
      </li>
    </ul>
  </nav>
</template>
