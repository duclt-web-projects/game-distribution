<script setup lang="ts">
import NavItem from "@/components/Nav/Item.vue";
import {
  ArrowRightOnRectangleIcon,
  ChartPieIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  HomeIcon,
  PencilSquareIcon,
  TableCellsIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  navList: {
    type: Array,
    default: [],
  },
})
</script>

<template>
  <nav class="mt-4">
    <ul class="flex flex-col gap-2 text-white">
      <li v-for="nav in navList">
        <NavItem :navItem="nav" :isCollapse="isCollapse"/>
      </li>
    </ul>
  </nav>
</template>
