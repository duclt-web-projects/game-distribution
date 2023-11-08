<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import MainV2Layout from '@/layouts/MainV2Layout.vue';
import { IGame } from '@/types/game';
import { HeartIcon } from '@heroicons/vue/24/solid';
import 'vue3-carousel/dist/carousel.css';

const { slug } = useRoute().params;

const { data: gamesByCategory } = await useHttp<IGame[]>(
  `games/category/${slug}`,
);
</script>

<template>
  <MainV2Layout>
    <HomeBanner />
    <section class="content mt-[36px]">
      <div class="container flex gap-6 relative px-4">
        <SidebarCategory :current-category="slug + ''" />
        <div class="content__main grow px-4">
          <HomeYourGame />
          <div>
            <h2 class="flex items-center text-[24px] font-medium mb-4">
              <HeartIcon class="w-5 h-5 mr-4" />Recommended games
            </h2>
            <div
              class="games grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
            >
              <GameCardV2
                v-for="game in gamesByCategory"
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
