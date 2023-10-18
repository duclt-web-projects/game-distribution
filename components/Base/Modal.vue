<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';

defineEmits(['close-modal']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
  title: String,
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-70 h-screen top-0 left-0 flex justify-center z-50"
        @click.self="$emit('close-modal')"
      >
        <Transition name="modal-inner">
          <div
            class="relative mt-32 self-start bg-white rounded shadow max-w-screen-md min-w-[400px]"
          >
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-4 border-b rounded-t"
            >
              <h3 class="text-xl font-semibold text-gray-900">
                {{ title }}
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                @click="$emit('close-modal')"
              >
                <XMarkIcon class="w-6 h-6" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 space-y-4">
              <slot name="body" />
            </div>
            <!-- Modal footer -->
            <div
              class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b"
            >
              <slot name="footer" />
            </div>
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
