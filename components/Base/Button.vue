<script setup>
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

const props = defineProps({
  iconLeft: [Object, Function],
  iconRight: [Object, Function],
  loading: Boolean,
  disabled: Boolean,
  type: {
    type: String,
    default: 'button',
  },
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
    default: 'primary',
  },
});

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center text-sm rounded h-[36px] px-3 py-2 font-normal transition-all',
    {
      variants: {
        intent: {
          primary: 'bg-blue-500 hover:bg-blue-600 text-white',
          secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
          success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          danger: 'bg-red-600 hover:bg-red-700 text-white',
          warning: 'bg-yellow-400 hover:bg-yellow-500 text-white',
          info: 'bg-cyan-600 hover:bg-cyan-700 text-gray-100',
          dark: 'bg-gray-700 hover:bg-gray-800 text-white',
          light: 'bg-gray-100 hover:bg-gray-200 text-gray-600',
        },
        disabled: {
          true: '!bg-gray-100 !text-gray-400 cursor-not-allowed',
        },
      },
    },
  )({
    intent: props.intent,
    disabled: props.disabled,
  });
});
</script>

<template>
  <button :type="props.type" :disabled="props.disabled" :class="buttonClass">
    <Spinner v-if="props.loading" class="absolute" />

    <component
      :is="props.iconLeft"
      :class="['mr-1 h-5 w-5', props.loading && 'invisible']"
    />

    <span :class="[props.loading && 'invisible']">
      <slot />
    </span>

    <component
      :is="props.iconRight"
      v-if="!props.loading"
      :class="['ml-2 h-5 w-5', props.loading && 'invisible']"
    />
  </button>
</template>
