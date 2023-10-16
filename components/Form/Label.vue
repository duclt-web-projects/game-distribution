<script setup lang="ts">
const props = defineProps({
  for: String,
  required: Boolean,
});
</script>
<template>
  <label class="mb-1 inline-block text-sm font-semibold" :for="props.for">
    <slot /><span v-if="props.required" class="text-red-600"> *</span>
  </label>
</template>
