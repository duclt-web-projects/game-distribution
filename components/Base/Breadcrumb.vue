<script setup lang="ts">
import { IBreadcrumb } from '@/types/common';

defineProps({
  breadcrumbs: {
    type: Array<IBreadcrumb>,
    default() {
      return [];
    },
  },
});
</script>
<template>
  <nav class="flex ml-10" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <li :class="{ 'inline-flex items-center': index === 0 }">
          <NuxtLink
            v-if="breadcrumb.path"
            :to="breadcrumb.path"
            class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500 rounded hover:bg-gray-100 p-2"
          >
            <component
              :is="breadcrumb.icon"
              class="h-4 w-4 mr-2 text-gray-500"
            />
            {{ breadcrumb.name }}
          </NuxtLink>
          <div v-else class="flex items-center">
            <component
              :is="breadcrumb.icon"
              class="h-4 w-4 mr-2 text-gray-400"
            />
            <span class="text-sm font-medium text-gray-500">{{
              breadcrumb.name
            }}</span>
          </div>
        </li>
        <span v-if="index < breadcrumbs.length - 1" class="text-gray-400 ml-0">
          /
        </span>
      </template>
    </ol>
  </nav>
</template>

<style scoped>
li {
  margin-left: 0 !important;
}

span {
  margin-right: 4px !important;
  margin-left: 4px !important;
}
</style>
