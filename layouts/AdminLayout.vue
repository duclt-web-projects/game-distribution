<script setup lang="ts">
import { useAdminStore } from '@/stores/useAdminStore';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
  HomeIcon,
  PencilSquareIcon,
  PuzzlePieceIcon,
  TagIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';

const menus = [
  {
    path: '/admin',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    name: 'Games',
    icon: PuzzlePieceIcon,
    child: [
      {
        name: 'Games By User',
        path: '/admin/games',
      },
    ],
  },
  {
    name: 'Category',
    icon: TagIcon,
    path: '/admin/categories',
  },
  {
    name: 'User',
    icon: UserIcon,
    path: '/admin',
  },
];
const adminStore = useAdminStore();

onMounted(() => {
  document.body.className = '';
});

const logout = async () => {
  await adminStore.logout();
  navigateTo('/admin/login');
};
</script>

<template>
  <div class="flex">
    <dashboard-sidebar :nav-list="menus" />
    <div class="w-full h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
      <dashboard-header>
        <Menu as="div" class="relative mr-3">
          <div class="flex items-center">
            <MenuButton>
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt="avatar"
              />
            </MenuButton>
          </div>
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
                  <button
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
                  </button>
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
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
