<script setup type="ts">
import { IconAngleLeft, IconAngleRight } from '@/assets/icon';

const props = defineProps({
  currentPage: Number,
  totalPage: Number,
});

const { currentPage, totalPage } = toRefs(props);
const emit = defineEmits(["changePage"]);

const pages = computed(() => {
  const range = [];
  for (let i = 1; i <= totalPage.value; i++) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    });
  }
  return range;
});

const isFirstPage = computed(() => {
  return currentPage.value === 1;
});

const isLastPage = computed(() => {
  return currentPage.value === totalPage.value;
});

const isPageActive = (page) => {
  return currentPage.value === page;
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px h-8 text-sm">
      <li>
        <a
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
          :class="isFirstPage ? 'disabled' : 'hover:bg-gray-100 hover:text-gray-700 '"
          @click="emit('changePage', 1)"
        >
          <span class="sr-only">Previous</span>
          <IconAngleLeft class="fill-gray-500" />
        </a>
      </li>
      <li v-for="page in pages" :key="page.name" @click="emit('changePage', page.name)">
        <a
          role="button"
          class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300"
          :class="
            isPageActive(page.name)
              ? 'text-white border border-gray-300 bg-emerald-600'
              : 'text-gray-800 bg-white hover:text-gray-700 hover:bg-gray-200'
          "
          >{{ page.name }}</a
        >
      </li>
      <li>
        <a
          role="button"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"
          :class="isLastPage ? 'disabled' : 'hover:bg-gray-100 hover:text-gray-700 '"
        >
          <span class="sr-only">Next</span>
          <IconAngleRight class="fill-gray-500" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
