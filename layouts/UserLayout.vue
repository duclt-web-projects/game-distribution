<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
  HomeIcon,
  PencilSquareIcon,
  PuzzlePieceIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { UserCircleIcon, UserIcon } from '@heroicons/vue/24/solid';
import { ROUTE_NAMES } from '@/constants';

useHead({
  bodyAttrs: {
    style: 'overflow: hidden',
  },
});

const menus = [
  {
    path: '/user',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    name: 'Games',
    icon: PuzzlePieceIcon,
    child: [
      {
        name: 'List',
        path: ROUTE_NAMES.USER_GAME,
      },
    ],
  },
  {
    path: ROUTE_NAMES.USER_PROFILE,
    name: 'Profile',
    icon: UserIcon,
  },
];
const userStore = useUserStore();
const { BACKEND_URL } = useUrlConfig();

const logout = async () => {
  await userStore.logout();
  navigateTo('/login');
};

onMounted(() => {
  document.body.className = '';
});
</script>

<template>
  <div class="flex">
    <dashboard-sidebar :nav-list="menus" />
    <div class="w-full h-screen bg-gray-200 overflow-y-auto overflow-x-hidden">
      <dashboard-header>
        <Menu as="div" class="relative mr-3">
          <MenuButton class="flex items-center">
            <img
              v-if="userStore.user && userStore.user.avatar"
              class="w-8 h-8 rounded-full"
              :src="BACKEND_URL + userStore.user.avatar"
              alt="avatar"
            />
            <UserCircleIcon v-else class="w-7 h-7" />
            <p class="ml-2">{{ userStore.user?.name }}</p>
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    :to="ROUTE_NAMES.USER_PROFILE"
                    :class="[
                      active ? 'bg-gray-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <PencilSquareIcon
                      :class="['mr-2 h-5 w-5', !active && 'stroke-gray-600']"
                      aria-hidden="true"
                    />
                    Profile
                  </NuxtLink>
                </MenuItem>
              </div>
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="logout"
                  >
                    <TrashIcon
                      :class="['mr-2 h-5 w-5', !active && 'stroke-gray-600']"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </dashboard-header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
