<script setup>
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

const props = defineProps({
  intent: {
    type: String,
    validator: (val) =>
      [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'light',
      ].includes(val),
    default: 'secondary',
  },
});

const badgeClass = computed(() => {
  return cva('px-2 py-1 rounded', {
    variants: {
      intent: {
        primary: 'bg-blue-100 text-blue-600',
        secondary: 'bg-gray-100 text-gray-600',
        success: 'bg-green-100 text-green-600',
        danger: 'bg-red-100 text-red-600',
        warning: 'bg-yellow-100 text-yellow-600',
        info: 'bg-cyan-100 text-cyan-600',
        dark: 'bg-gray-200 text-gray-600',
      },
    },
  })({
    intent: props.intent,
  });
});
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>
