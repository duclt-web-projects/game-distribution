<script setup lang="ts">
const props = defineProps({
  icon: [Object, Function],
  label: String,
  count: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div :class="['category__item', props.isActive && 'category__item--active']">
    <component :is="props.icon" :class="['h-4 w-4']" />
    <span class="text-[14px] mx-2">{{ props.label }}</span>
    <span
      v-show="props.count > 0"
      class="bg-main-color text-[12px] leading-[16px] py-[2px] px-1 rounded-[8px]"
      >{{ props.count }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.category__item {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 4px;
  color: #666666;
  transition: all 0.2s;
  height: 20px;
  box-sizing: content-box;

  &:hover {
    background-color: rgba(102, 102, 102, 0.15);
    color: #222222;
  }

  &:active {
    background-color: #fb8030;
    color: #fff;
  }
}

.category__item--active,
.category__item--active:hover {
  background-color: #fb8030;
  color: #fff;
}
</style>
