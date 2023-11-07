<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';

defineEmits(['close-modal']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '400px',
  },
  teleport: {
    type: String,
    default: 'body',
  },
});
</script>

<template>
  <Teleport :to="teleport">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        :class="[
          'w-full bg-black bg-opacity-80 top-0 left-0 flex justify-center z-50 overflow-hidden',
          teleport === 'body' ? 'fixed h-screen' : 'absolute h-full',
        ]"
        @click.self="$emit('close-modal')"
      >
        <Transition name="modal-inner">
          <div
            class="relative mt-20 self-start bg-white rounded shadow max-w-screen-md min-w-[400px] modal-wrapper"
            :style="{
              width,
            }"
          >
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-4 border-b rounded-t"
            >
              <slot name="header" />
              <button
                type="button"
                class="text-gray-400 bg-gray-100 rounded-full hover:bg-gray-200 text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                @click="$emit('close-modal')"
              >
                <XMarkIcon class="w-5 h-5" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 space-y-4 modal-body">
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
