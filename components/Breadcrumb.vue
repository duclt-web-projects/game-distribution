<script setup lang="ts">
import { IconAngleRight, IconHome } from '@/assets/icon';
</script>

<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-teal-600"
        >
          <IconHome class="mr-2 mb-0.5" />
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <IconAngleRight class="w-4 h-4 fill-gray-400 font-bold" />
          <a
            href="#"
            class="ml-1 text-sm font-medium text-gray-400 hover:text-teal-600 md:ml-2"
            >Projects</a
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg
            class="w-3 h-3 text-gray-400 mx-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
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
