<script setup>
import { useHttp } from '@/composables/useHttp';

const { data: categories } = await useHttp('/categories', {
  server: false,
});

const emit = defineEmits(['select-category']);

const handleSelectCategory = (val) => {
  emit('select-category', val);
};
</script>

<template>
  <GamesFilterRefinementList
    title="Categories"
    :data="categories"
    @select-category="handleSelectCategory"
  />
</template>

<style lang="scss" scoped></style>
