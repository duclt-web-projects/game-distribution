<script setup lang="ts">
import { IGame, IGameLocal } from '@/types/game';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

const props = defineProps({
  games: {
    type: Array as PropType<IGame[] | IGameLocal[]>,
    default: () => [],
  },
  show: Number,
  breakpoints: Object,
  isEdit: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Carousel :items-to-show="show" snap-align="start" :breakpoints="breakpoints">
    <Slide v-for="game in games" :key="game.id" :index="game.id">
      <GameCard :game="game" :can-remove="isEdit" />
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped lang="scss">
:deep(.carousel__viewport) {
  padding-top: 16px;
}

:deep(.game) {
  img {
    max-height: 220px;
  }
}

:deep(.carousel__slide) {
  margin-right: 16px;
}

:deep(.carousel__next),
:deep(.carousel__prev) {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #222;
  background-color: #fff;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.25));
}

:deep(.carousel__next) {
  right: -32px;
}

:deep(.carousel__prev) {
  left: -32px;
}

:deep(.carousel__next--disabled),
:deep(.carousel__prev--disabled) {
  display: none;
}
</style>
