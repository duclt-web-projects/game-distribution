<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routes';
import {
  CubeIcon,
  InformationCircleIcon,
  PhotoIcon,
} from '@heroicons/vue/24/solid';

// const props = defineProps({
//   game: {
//     type: Object,
//     default: null,
//   },
// });

const tabs = [
  {
    name: 'Edit',
    icon: InformationCircleIcon,
    path: ROUTE_NAMES.USER_GAME_EDIT,
  },
  {
    name: 'Assets',
    icon: PhotoIcon,
    path: ROUTE_NAMES.USER_GAME_ASSETS,
  },
  {
    name: 'Upload',
    icon: CubeIcon,
    path: ROUTE_NAMES.USER_GAME_UPLOAD,
  },
];

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const { id } = route.params;
</script>

<template>
  <div class="p-4">
    <div class="w-full px-2 sm:px-0 shadow rounded overflow-hidden bg-white">
      <div class="border-b border-gray-200">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500"
        >
          <li v-for="(tab, index) in tabs" :key="index" class="mr-2">
            <NuxtLink
              :to="`${tab.path}/${id}`"
              :class="[
                'inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group',
                route.path === `${tab.path}/${id}`
                  ? 'text-emerald-600 border-emerald-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300',
              ]"
            >
              <component :is="tab.icon" :class="['w-4 h-4 mr-2 ']" />
              {{ tab.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="">
        <div
          v-if="isLoading"
          class="w-full flex justify-center items-center min-h-[500px]"
        >
          <Spinner class="w-10 h-10 border-emerald-600 opacity-50" />
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-family: 'Roboto', sans-serif;
}

:deep(.multiselect-tags-search) {
  height: 0;
  border: none;
}
</style>
