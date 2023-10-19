<script setup type="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

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

const handleChangePage = (page) => {
  if(page > 0 && page <= totalPage.value) {
    emit('changePage', page)
  }
}
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px h-8 text-sm">
      <li @click="handleChangePage(currentPage - 1)">
        <a
          disabled="disabled"
          class="flex items-center justify-center w-8 h-8 ml-0 leading-tight text-gray-500 rounded"
          :class="
            isFirstPage
              ? 'text-gray-300 disabled cursor-not-allowed'
              : 'bg-white hover:bg-gray-200 hover:text-gray-700 cursor-pointer'
          "
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </a>
      </li>
      <li
        v-for="page in pages"
        :key="page.name"
        @click="handleChangePage(page.name)"
      >
        <a
          role="button"
          class="flex items-center justify-center w-8 h-8 leading-tight rounded mx-1"
          :class="
            isPageActive(page.name)
              ? 'text-emerald-700 border border-emerald-700 font-semibold'
              : 'text-gray-800 bg-white hover:text-gray-700 hover:bg-gray-200'
          "
          >{{ page.name }}</a
        >
      </li>
      <li>
        <a
          role="button"
          class="flex items-center justify-center w-8 h-8 leading-tight text-gray-600 rounded"
          :class="
            isLastPage
              ? 'text-gray-300 disabled cursor-not-allowed'
              : 'bg-white hover:bg-gray-200 hover:text-gray-700 cursor-pointer'
          "
          @click="handleChangePage(currentPage + 1)"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="w-4 h-4" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
