<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/outline';

defineProps({
  rating: {
    type: Number,
    default: 5,
  },
});
</script>
<template>
  <div class="flex mb-2">
    <template v-for="index in 5" :key="index">
      <StarIcon
        class="w-4 h-4 stroke-yellow-400 stroke-2"
        :class="index <= rating ? 'fill-yellow-400' : ''"
      />
    </template>
  </div>
</template>

<style scoped></style>
