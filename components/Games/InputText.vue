<template>
  <form class="form" @submit.prevent="">
    <div class="input-group">
      <IconSearch />
      <input
        type="search"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        placeholder="Search games..."
        class="search-input-field xg-input"
        :value="searchQuery"
        @input="debouncedSearch"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import IconSearch from '@/assets/icon/Search.vue';
import { useDebounce } from '@/composables/useDebounce';

const { modelValue, debounceDelay = 300 } = defineProps({
  modelValue: String,
  debounceDelay: {
    type: Number,
    default: 300,
  },
});
const emit = defineEmits(['update:modelValue']);

const searchQuery = ref(modelValue);

const debouncedSearch = useDebounce((event) => {
  searchQuery.value = event.target.value;
  emit('update:modelValue', searchQuery.value);
}, debounceDelay);
</script>

<style lang="scss" scoped>
form {
  position: relative;

  input {
    box-sizing: border-box;
    font-weight: 300;
    padding-left: 40px;
  }

  svg {
    color: #512e85;
    left: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
  }
}
</style>
