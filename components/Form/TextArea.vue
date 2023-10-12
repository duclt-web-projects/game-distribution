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
  <textarea
    :id="field.id"
    :aria-describedby="field.ariaDescribedBy"
    :value="props.modelValue"
    @input="($event) => emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="[
      'block p-2.5 w-full min-h-[200px] text-sm text-gray-900 border border-gray-300 focus:border focus:border-blue-400',
      field.invalid ? 'border-red-400' : 'border-gray-200',
      typeSize ? 'rounded-l' : 'rounded',
    ]"
  />
</template>
