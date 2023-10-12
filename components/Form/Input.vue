<script setup lang="ts">
import { inject } from "vue";

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: "text",
  },
  modelValue: [String, Number],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  className: {
    type: String,
    default: "rounded",
  },
});

const emit = defineEmits(["update:modelValue"]);

const field = inject("field", props);
</script>

<template>
  <div class="flex">
    <input
      :id="field.id"
      :type="props.type"
      :aria-describedby="field.ariaDescribedBy"
      :value="props.modelValue"
      @input="($event) => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'h-10 text-sm placeholder-gray-400 hover:bg-gray-100 border-1 w-full focus:border-blue-400 focus:border-1 focus:ring-0 focus:bg-white px-4',
        className,
        field.invalid ? 'border-red-300' : 'border-gray-200',
      ]"
    />
    <slot />
  </div>
</template>
