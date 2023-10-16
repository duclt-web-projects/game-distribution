<script setup lang="ts">
import { ChevronDoubleRightIcon, HomeIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-teal-600"
        >
          <HomeIcon class="mr-2 mb-0.5" />
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <ChevronDoubleRightIcon class="w-4 h-4 text-gray-400 font-bold" />
          <a
            href="#"
            class="ml-1 text-sm font-medium text-gray-400 hover:text-teal-600 md:ml-2"
            >Projects</a
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <ChevronDoubleRightIcon class="w-4 h-4 text-gray-400 font-bold" />
          <span
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
            >Flowbite</span
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped></style>
