<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";
import { ROUTE_NAMES } from "@/constants";
import { ref } from "vue";

const { isOpen } = useSidebar();
const activeClass = ref("bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100");
const inactiveClass = ref("border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100");

const route = useRoute();

</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <NuxtLink to="/" class="flex items-center">
          <img class="image-logo" src="/images/logos/logo-white.png" alt="" />
        </NuxtLink>
      </div>

      <nav class="mt-10">
        <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.path === ROUTE_NAMES.ADMIN_GAME ? activeClass : inactiveClass]"
          :to="ROUTE_NAMES.ADMIN_GAME"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
              fill="currentColor"
            />
            <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
          </svg>

          <span class="mx-4">Games</span>
        </router-link>
        <router-link
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.path === ROUTE_NAMES.ADMIN_CATEGORY ? activeClass : inactiveClass]"
          :to="ROUTE_NAMES.ADMIN_CATEGORY"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
              fill="currentColor"
            />
            <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
          </svg>

          <span class="mx-4">Category</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-logo {
  width: 120px;
}
</style>
