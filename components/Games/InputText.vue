<template>
  <form class="form" @submit.prevent="">
    <div class="input-group">
      <MagnifyingGlassIcon class="w-5 h-5" />
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
import { useDebounce } from '@/composables/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

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
