<script setup>
const emit = defineEmits(["update:input"]);

const props = defineProps(["input", "placeholder", "inputType", "max", "autoFocus", "error"]);
const { input, placeholder, inputType, autoFocus, error } = toRefs(props);

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
  <div class="form__input">
    <input
      :id="`input-${placeholder}`"
      :placeholder="placeholder + ' *'"
      :type="inputType"
      v-model="inputComputed"
      autocomplete="off"
    />
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
