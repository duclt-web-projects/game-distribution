<script setup lang="ts">
import { IBreadcrumb } from '@/types/common';
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  breadcrumbs: {
    type: Array<IBreadcrumb>,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <li :class="{ 'inline-flex items-center': index === 0 }">
          <NuxtLink
            v-if="breadcrumb.path"
            :to="breadcrumb.path"
            class="flex items-center text-sm font-medium text-gray-400 hover:text-teal-600"
          >
            <component
              :is="breadcrumb.icon"
              class="h-4 w-4 mr-2 text-gray-400"
            />
            {{ breadcrumb.name }}
          </NuxtLink>
          <div v-else class="flex items-center">
            <ChevronDoubleRightIcon class="w-4 h-4 text-gray-400 font-bold" />
            <span
              class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
              >{{ breadcrumb.name }}</span
            >
          </div>
        </li>
      </template>
    </ol>
  </nav>
</template>

<style scoped></style>
