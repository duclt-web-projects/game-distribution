<script setup>
import { MenuItem } from '@headlessui/vue';

const props = defineProps({
  as: {
    type: String,
    default: 'a',
  },
  description: String,
});
</script>
<template>
  <MenuItem v-slot="{ active, disabled }">
    <component
      :is="props.as"
      :class="[
        active ? 'bg-gray-100' : '',
        disabled
          ? 'cursor-not-allowed text-gray-500'
          : 'cursor-pointer text-gray-900',
        'group flex w-full flex-col px-3 py-2 text-left text-sm active:bg-gray-200',
      ]"
    >
      <span><slot /></span>
      <span
        v-if="props.description"
        class="mt-0.5 select-none text-xs text-gray-500"
      >
        {{ props.description }}
      </span>
    </component>
  </MenuItem>
</template>
