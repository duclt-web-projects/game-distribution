<script setup>
const props = defineProps({
  id: String,
  modelValue: [String, Number, Array, Boolean],
  required: Boolean,
  invalid: Boolean,
  ariaDescribedBy: String,
  value: Boolean,
  label: String,
});

const emit = defineEmits(['update:modelValue']);

const field = inject('field', props);

const handleChange = ($event) => {
  emit('update:modelValue', $event.target.value);
};
</script>

<template>
  <div class="inline-flex items-center">
    <div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
      <input
        :id="field.id"
        type="checkbox"
        :aria-describedby="field.ariaDescribedBy"
        :checked="props.value"
        class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-gray-100 transition-colors duration-300 checked:bg-emerald-500 peer-checked:border-emerald-500 peer-checked:before:bg-emerald-500"
        @change="handleChange"
      />
      <label
        :for="props.id"
        class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-emerald-500 peer-checked:before:bg-emerald-500"
      >
        <div
          class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
          data-ripple-dark="true"
        ></div>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
