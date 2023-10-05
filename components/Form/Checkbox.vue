<script setup lang="ts">
import { inject } from "vue";

const props = defineProps({
  id: String,
  modelValue: [String, Number, Array, Boolean],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  typeSize: Boolean,
  value: String,
  label: String,
});

const emit = defineEmits(["update:modelValue"]);

const field = inject("field", props);

const handleChange = (event) => {
  let isChecked = event.target.checked;
  if (props.modelValue instanceof Array) {
    let newValue = [...props.modelValue];
    if (isChecked) {
      newValue.push(props.value);
    } else {
      newValue.splice(newValue.indexOf(props.value), 1);
    }
    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", isChecked ? props.value : "");
  }
};
</script>

<template>
  <div class="inline-flex items-center">
    <label class="relative flex cursor-pointer items-center rounded-full p-3" :for="props.id" data-ripple-dark="true">
      <input
        type="checkbox"
        class="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-blue-gray-200 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:bg-gray-500 checked:before:bg-gray-500 hover:before:opacity-10"
        :id="field.id"
        :aria-describedby="field.ariaDescribedBy"
        :value="props.value"
        @change="handleChange"
      />
      <span
        class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
    <label class="mt-px cursor-pointer select-none font-light text-gray-700" :for="props.id">
      {{ props.label }}
    </label>
  </div>
</template>
