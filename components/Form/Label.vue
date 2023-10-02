<script setup lang="ts">
const props = defineProps({
  for: String,
  required: Boolean,
});
</script>
<template>
  <label class="mb-2 inline-block text-sm font-semibold" :for="props.for">
    <slot /><span class="text-red-600" v-if="props.required"> *</span>
  </label>
</template>
