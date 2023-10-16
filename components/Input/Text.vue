<script setup>
const emit = defineEmits(['update:input']);

const props = defineProps({
  id: String,
  input: Object,
  label: String,
  placeholder: String,
  inputType: {
    type: String,
    default: 'text',
  },
  autoFocus: Boolean,
  error: String,
});
const { id, input, label, placeholder, inputType, autoFocus, error } =
  toRefs(props);

onMounted(() => {
  if (autoFocus.value) {
    document.getElementById(`input-${placeholder.value}`).focus();
  }
});

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit('update:input', val),
});
</script>

<template>
  <div class="form-input">
    <label
      for="country"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <div class="flex">
      <input
        :id="`input-${id}`"
        v-model="inputComputed"
        class="w-full mt-2 border-gray-200 pl-5 pr-5"
        :type="inputType"
        :placeholder="placeholder ? placeholder + ' *' : ''"
        autocomplete="off"
      />
      <slot />
    </div>
    <span v-if="error" class="error"> {{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.form-input {
  input {
    width: 100%;
    height: 60px;
    background: transparent;
    padding-left: 18px;
    border: 1px solid #fff;
    box-sizing: border-box;
    font-size: 1rem;
    font-family: Roboto, 'Open Sans';
  }
}
</style>
