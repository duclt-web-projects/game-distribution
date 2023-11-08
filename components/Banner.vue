<script setup lang="ts">
import { IGame } from '@/types/game';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

const { BACKEND_URL } = useUrlConfig();

const { data: bannerGames } = await useHttp<IGame[]>('games/banner-list');
</script>
<template>
  <section class="banner mt-6">
    <div class="container">
      <carousel
        v-if="bannerGames && bannerGames.length"
        :items-to-show="1"
        :autoplay="5000"
        :wrap-around="true"
      >
        <slide v-for="game in bannerGames" :key="game.id" :index="game.id">
          <img
            :src="BACKEND_URL + game.thumbnail"
            alt=""
            class="h-[310px] w-full object-cover"
          />
        </slide>
        <template #addons>
          <pagination />
        </template>
      </carousel>
    </div>
  </section>
</template>

<style lang="scss" scoped>
:deep(.carousel__pagination) {
  position: relative;
  margin-top: -30px;
  z-index: 10;

  .carousel__pagination-button::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    margin: 0 4px;
  }

  .carousel__pagination-button--active::after {
    background-color: #287cff;
  }
}
</style>
