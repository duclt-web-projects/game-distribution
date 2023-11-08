<script setup lang="ts">
import { IGame } from '@/types/game';
import { HeartIcon } from '@heroicons/vue/24/solid';
import 'vue3-carousel/dist/carousel.css';
import MainV2Layout from '~/layouts/MainV2Layout.vue';

const { data: popularGames } = await useHttp<IGame[]>('games/hot-list');
const { data: recommendedGames } = await useHttp<IGame[]>('games?limit=10');
</script>

<template>
  <MainV2Layout>
    <HomeBanner />
    <section class="content mt-[36px]">
      <div class="container flex gap-6 relative px-4">
        <SidebarCategory />
        <div class="content__main grow px-4">
          <div v-if="popularGames" class="mb-7">
            <Heading :icon="HeartIcon" title="Popular" />
            <GamesCarousel
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
          <HomeRecommendGame />
          <HomeRecommendGame sort="-is_hot" />
          <HomeRecommendGame sort="-published_at" />
          <HomeRecommendGame sort="-created_at" />
        </div>
      </div>
    </section>
  </MainV2Layout>
</template>

<style scoped lang="scss">
.content__main {
  margin-bottom: 80px;
}
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
