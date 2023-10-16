<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';

defineEmits(['close-modal']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-70 h-screen top-0 left-0 flex justify-center px-8 z-50"
        @click.self="$emit('close-modal')"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 bg-white self-start mt-32 max-w-screen-md min-w-[400px] relative"
          >
            <slot />
            <button
              class="bg-weather-primary py-2 px-6 absolute top-4 right-1"
              @click="$emit('close-modal')"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
