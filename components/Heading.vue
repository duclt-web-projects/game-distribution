<script setup lang="ts">
const props = defineProps({
  title: String,
  icon: [Object, Function],
  as: {
    type: String,
    default: 'h2',
  },
});
</script>
<template>
  <component :is="as" class="flex items-center text-[24px] font-medium">
    <component :is="icon" class="w-8 h-8 mr-4" />{{ title }}
  </component>
</template>

<style scoped></style>
