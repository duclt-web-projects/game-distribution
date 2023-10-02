<script setup lang="ts">
import { inject } from "vue";

const props = defineProps({
  id: String,
  modelValue: [String, Number],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  typeSize: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const field = inject("field", props);
</script>

<template>
  <div class="flex">
    <input
      :id="field.id"
      :aria-describedby="field.ariaDescribedBy"
      :value="props.modelValue"
      @input="($event) => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="field.required"
      :class="[
        'h-10 text-sm placeholder-gray-400 hover:bg-gray-100 border-2 w-full focus:border-gray-400 focus:ring-0 focus:bg-white px-4',
        field.invalid ? 'border-red-500' : 'border-gray-200',
        typeSize ? 'rounded-l' : 'rounded',
      ]"
    />
    <slot />
  </div>
</template>
