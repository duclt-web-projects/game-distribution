<script setup lang="ts">
import { IconBell, IconMenuBar, IconSearch, IconUserCircle } from "@/assets/icon";
import { useSidebar } from "@/composables/useSidebar";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { ROUTE_NAMES } from "../../constants/commons";

const userStore = useUserStore();

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();

const logout = async () => {
  await userStore.logout();
  navigateTo(ROUTE_NAMES.LOGIN);
};
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-gray-700">
    <div class="flex items-center">
      <button class="btn-menu text-gray-500 focus:outline-none lg:hidden mr-5" @click="isOpen = true">
        <IconMenuBar />
      </button>
    </div>

    <div class="flex items-center">
      <button class="btn-bell flex mx-4 text-gray-600 focus:outline-none">
        <IconBell />
      </button>

      <div class="relative flex">
        <ClientOnly>
          <span class="items-center pr-5 text-gray-700 hidden md:flex">{{ userStore.name }}</span>
        </ClientOnly>
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <IconUserCircle class="object-cover w-full h-full fill-gray-700" />
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
          <div
            v-show="dropdownOpen"
            class="absolute top-8 right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl border"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-600 hover:text-white">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-600 hover:text-white">Products</a>
            <button
              class="w-full block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-600 hover:text-white"
              @click="logout"
            >
              Log out
            </button>
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

.btn-bell,
.btn-menu {
  width: 24px;
  height: 24px;
}
</style>
