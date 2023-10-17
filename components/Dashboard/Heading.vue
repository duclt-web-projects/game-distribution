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
    <nav class="flex ml-10" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <li :class="{ 'inline-flex items-center': index === 0 }">
            <NuxtLink
              v-if="breadcrumb.path"
              :to="breadcrumb.path"
              class="flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600"
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
              <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">{{
                breadcrumb.name
              }}</span>
            </div>
          </li>
        </template>
      </ol>
    </nav>
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
