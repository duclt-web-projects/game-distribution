<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid';
import 'vue3-carousel/dist/carousel.css';
import MainV2Layout from '~/layouts/MainV2Layout.vue';
import { IGame } from '../../types/game';

const { data: popularGames } = await useHttp<IGame[]>('games/hot-list');
const { data: recommendedGames } = await useHttp<IGame[]>('games?limit=10');
</script>

<template>
  <MainV2Layout>
    <HomeBanner />
    <section class="content mt-[36px]">
      <div class="container flex gap-6 relative px-4 md:px-0">
        <SidebarCategory />
        <div class="content__main grow px-4">
          <div class="mb-7">
            <Heading :icon="HeartIcon" title="Popular" />
            <GamesCarousel
              v-if="popularGames"
              :games="popularGames"
              :show="1"
              :breakpoints="{
                480: {
                  itemsToShow: 1.2,
                },
                640: {
                  itemsToShow: 1.5,
                },
                768: {
                  itemsToShow: 2.5,
                },
              }"
            />
          </div>
          <HomeYourGame />
          <div>
            <h2 class="flex items-center text-[24px] font-medium mb-4">
              <HeartIcon class="w-5 h-5 mr-4" />Recommended games
            </h2>
            <div
              class="games grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
            >
              <GameCardV2
                v-for="game in recommendedGames"
                :key="game.id"
                :game="game"
                class="col-span-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainV2Layout>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1024px) {
  .content {
    .container {
      flex-wrap: wrap;
    }
  }
}

@media screen and (max-width: 640px) {
  .content {
    .container {
      padding: 0 16px;
    }
  }
}
</style>
