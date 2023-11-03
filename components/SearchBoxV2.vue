<script setup lang="ts">
import { useDebounce } from '@/composables/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const { modelValue, debounceDelay } = defineProps({
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

const clearSearch = () => {
  searchQuery.value = '';
  emit('update:modelValue', searchQuery.value);
};
</script>

<template>
  <form @submit.prevent="">
    <div class="input-group relative max-w-[680px]">
      <MagnifyingGlassIcon v-if="!searchQuery" class="w-5 h-5" />
      <XMarkIcon v-else class="w-5 h-5" @click="clearSearch" />
      <input
        type="text"
        placeholder="Search for..."
        class="w-full leading-5 py-2 px-6 rounded-[50px] outline-none border-none text-gray-400 text-[14px] bg-[#F2F1FA]"
        :value="searchQuery"
        @input="debouncedSearch"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  position: relative;

  input {
    box-sizing: border-box;
  }

  svg {
    color: #bcbacd;
    right: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
  }
}
</style>
