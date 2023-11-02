<script setup lang="ts">
import { IGame } from '@/types/game';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

const props = defineProps({
  games: Array as PropType<IGame[]>,
  show: Number,
  breakpoints: Object,
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const game = ref({
  name: 'Eating Simulation',
  thumbnail:
    'https://avatars.mds.yandex.net/get-games/1892995/2a00000185f2767a81b77b2f2f48f620a4bf/pjpg480x270',
});
</script>

<template>
  <Carousel
    :items-to-show="show"
    class="mr-3"
    snap-align="start"
    :breakpoints="breakpoints"
  >
    <Slide :index="1">
      <NuxtLink to="" class="cursor-pointer">
        <GameCardV2 :game="game" :can-remove="isEdit" />
      </NuxtLink>
    </Slide>
    <Slide :index="2">
      <NuxtLink to="" class="">
        <GameCardV2 :game="game" :can-remove="isEdit" />
      </NuxtLink>
    </Slide>
    <Slide :index="3">
      <NuxtLink to="" class="">
        <GameCardV2 :game="game" :can-remove="isEdit" />
      </NuxtLink>
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
