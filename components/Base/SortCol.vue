<script setup lang="ts">
import { IconCaretDown, IconCaretUp } from '@/assets/icon';

const props = defineProps({
  label: String,
  sort: String,
});

const $emit = defineEmits(['change-sort']);

const onChangeSort = (val) => {
  $emit('change-sort', val);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <span>{{ label }}</span>
    <span>
      <IconCaretUp
        class="w-[10px] h-[10px] mb-[-2px] fill-gray-600"
        :class="sort === 'name' ? 'fill-emerald-500' : ''"
        @click="onChangeSort('name')"
      />
      <IconCaretDown
        class="w-[10px] h-[10px] mt-[-2px] fill-gray-600"
        :class="sort === '-name' ? 'fill-emerald-500' : ''"
        @click="onChangeSort('-name')"
      />
    </span>
  </div>
</template>

<style scoped></style>
