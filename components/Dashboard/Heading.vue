<script setup lang="ts">
import { IBreadcrumb } from '@/types/common';

defineProps({
  title: String,
  breadcrumbs: {
    type: Array<IBreadcrumb>,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div class="bg-white p-4 mb-5 shadow flex items-center">
    <h2 class="text-xl font-semibold text-gray-700 capitalize">
      {{ title }}
    </h2>
    <BaseBreadcrumb :breadcrumbs="breadcrumbs" />
  </div>
</template>

<style scoped lang="scss">
h2 {
  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: 2px;
    height: 100%;
    background-color: #9ca3af;
    margin-left: 1.25rem;
  }
}
</style>
