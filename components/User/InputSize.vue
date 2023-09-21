<script setup>
const emit = defineEmits(["update:input"]);

const props = defineProps(["id", "input", "label", "placeholder", "inputType", "max", "autoFocus", "error"]);
const { id, input, label, placeholder, inputType, autoFocus, error } = toRefs(props);

onMounted(() => {
  if (autoFocus.value) {
    document.getElementById(`input-${placeholder.value}`).focus();
  }
});

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
</script>

<template>
  <div class="form-input">
    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="flex">
      <input
        class="w-full mt-2 border-gray-200 rounded-md pl-5 pr-5"
        type="text"
        :id="`input-${id}`"
        :placeholder="placeholder ? placeholder + ' *' : ''"
        :type="inputType"
        v-model="inputComputed"
        autocomplete="off"
      />
      <span
        class="h-10 mt-2 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md"
      >
        px
      </span>
    </div>
    <span v-if="error" class="error"> {{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.form__input {
  margin-bottom: 16px;

  input {
    width: 100%;
    color: #fff;
    padding: 20px 16px;
    height: 60px;
    background: transparent;
    padding-left: 18px;
    border-radius: 8px;
    border: 1px solid #fff;
    font-size: 1rem;
    font-family: Roboto, "Open Sans";
  }

  .error {
    display: inline-block;
    margin-top: 8px;
    color: #ca2f37;
    font-size: 12px;
  }
}
</style>
