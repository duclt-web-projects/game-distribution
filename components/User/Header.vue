<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";
import { ref } from "vue";
import { IconBell, IconMenuBar, IconSearch } from "~/assets/icon";

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-gray-700">
    <div class="flex items-center">
      <button class="btn-menu text-gray-500 focus:outline-none lg:hidden mr-5" @click="isOpen = true">
        <IconMenuBar />
      </button>

      <div class="flex items-center">
        <input
          type="text"
          name="price"
          id="price"
          class="block w-full rounded-md border-0 py-2 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 leading-6 outline-none"
          placeholder="Search"
        />
        <button
          type="submit"
          class="btn-search p-2.5 ml-2 text-sm font-medium text-white bg-gray-600 rounded-lg border border-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
        >
          <IconSearch />
        </button>
      </div>
    </div>

    <div class="flex items-center">
      <button class="btn-bell flex mx-4 text-gray-600 focus:outline-none">
        <IconBell />
      </button>

      <div class="relative">
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <img
            class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar"
          />
        </button>

        <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false" />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
            <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
              Log out
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header:after {
  content: none;
}

.btn-bell, .btn-menu {
  width: 24px;
  height: 24px;
}
</style>
