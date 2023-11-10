<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';

const props = defineProps({
  align: {
    type: String,
    validator: (value) =>
      [
        'bottom-left',
        'bottom-right',
        'top-left',
        'top-right',
        'center',
      ].includes(value),
    default: 'bottom-left',
  },
  width: {
    type: String,
    default: '10rem',
  },
  trigger: String,
});
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div class="flex justify-center items-center">
      <MenuButton>
        <slot name="button" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        :class="{
          'right-0 origin-top-right': props.align === 'bottom-left',
          'left-0 origin-top-left': props.align === 'bottom-right',
          'right-0 bottom-5 origin-bottom-right': props.align === 'top-left',
          'left-0 origin-bottom-left': props.align === 'top-right',
          'left-1/4 top-[48px]': props.align === 'center',
        }"
        :style="{
          width: props.width,
        }"
        class="dropdown-menu absolute z-50 mt-2 divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div
          class="absolute w-4 h-3 inline-block overflow-hidden"
          :class="{
            'right-5 top-[-12px]': props.align === 'bottom-left',
            'left-0 origin-top-left': props.align === 'bottom-right',
            'right-0 bottom-5 origin-bottom-right': props.align === 'top-left',
            'left-0 origin-bottom-left': props.align === 'top-right',
            'left-1/2 top-[-12px]': props.align === 'center',
          }"
        >
          <div
            class="h-3 w-3 origin-bottom-left rotate-45 transform border border-[#f0f2f5] bg-white"
          ></div>
        </div>
        <slot name="items" />
      </MenuItems>
    </transition>
  </Menu>
</template>
