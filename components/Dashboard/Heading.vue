<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<template>
  <h2 class="text-xl font-semibold text-gray-700 capitalize mb-5">
    {{ title }}
  </h2>
</template>

<style scoped lang="scss">
h2 {
  position: relative;
  width: 100%;
  overflow: hidden;

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    background-color: #cbd5e1;
    bottom: 0;
  }
}
</style>
