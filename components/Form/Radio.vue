<script setup lang="ts">
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

const handleChange = ($event) => {
  emit("update:modelValue", $event.target.value);
};
</script>

<template>
  <div class="inline-flex items-center">
    <label class="relative flex cursor-pointer items-center rounded-full p-3" :for="props.id" data-ripple-dark="true">
      <input
        name="type"
        type="radio"
        :id="props.id"
        :checked="modelValue === value"
        @change="handleChange"
        :value="value"
        class="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-500 checked:border-gray-500 checked:before:bg-gray-500 hover:before:opacity-10"
      />
      <span
        class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-gray-500 opacity-0 transition-opacity peer-checked:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
          <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
        </svg>
      </span>
    </label>
    <label class="mt-px cursor-pointer select-none font-light text-gray-700" :for="props.id"> {{ props.value }} </label>
  </div>
</template>
