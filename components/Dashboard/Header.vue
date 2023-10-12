<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Bars3Icon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";

const { isCollapse } = useSidebar();
</script>

<template>
  <header class="sticky top-0 h-16 flex justify-between items-center p-4 shadow bg-white z-10">
    <Bars3Icon class="h-6 w-6 stroke-gray-600 lg:cursor-pointer" @click="isCollapse = !isCollapse" />
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
                <PencilSquareIcon :class="['mr-2 h-5 w-5', !active && 'stroke-gray-600']" aria-hidden="true" />
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
              >
                <TrashIcon :class="['mr-2 h-5 w-5', !active && 'stroke-gray-600']" aria-hidden="true" />
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>

<style scoped></style>
