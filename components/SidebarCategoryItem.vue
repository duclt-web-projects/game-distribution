<script setup lang="ts">
const props = defineProps({
  icon: String,
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
    <span class="w-4 h-4" v-html="props.icon"></span>
    <span class="text-[14px] mx-2 whitespace-nowrap">{{ props.label }}</span>
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
  transition: all 0.2s;
  height: 20px;
  box-sizing: content-box;

  span {
    color: #666;
  }

  :deep(svg) {
    fill: #666;
  }

  &:hover {
    background-color: rgba(102, 102, 102, 0.15);

    span {
      color: #222;
    }

    :deep(svg) {
      fill: #222;
    }
  }

  &:active {
    background-color: #fb8030;

    span {
      color: #fff;
    }

    :deep(svg) {
      fill: #fff;
    }
  }
}

.category__item--active,
.category__item--active:hover {
  background-color: #fb8030;
  color: #fff;
}
</style>
