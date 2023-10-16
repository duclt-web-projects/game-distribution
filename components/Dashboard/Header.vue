<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const { isCollapse } = useSidebar();
</script>

<template>
  <header
    class="sticky top-0 h-16 flex justify-between items-center p-4 shadow bg-white z-10"
  >
    <Bars3Icon
      class="h-6 w-6 stroke-gray-600 lg:cursor-pointer"
      @click="isCollapse = !isCollapse"
    />
    <form class="group relative ml-2 mr-auto">
      <MagnifyingGlassIcon
        class="w-5 h-5 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-gray-500"
      />
      <input
        class="focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 border-1 w-36 md:w-96"
        type="text"
        aria-label="Search"
        placeholder="Search"
      />
    </form>
    <slot />
  </header>
</template>

<style scoped></style>
