<script setup lang="ts">
import { IGame } from '@/types/game';
import { HeartIcon } from '@heroicons/vue/24/solid';
import 'vue3-carousel/dist/carousel.css';
import MainLayout from '~/layouts/MainLayout.vue';

useHead({
  title: 'Games for Websites and Messengers - XGame Studio',
  meta: [
    {
      name: 'description',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
    {
      name: 'ogTitle',
      content: 'Games for Websites and Messengers - XGame Studio',
    },
    {
      name: 'ogDescription',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
  ],
});

const { data: popularGames } = await useHttp<IGame[]>('games/hot-list');
</script>

<template>
  <MainLayout>
    <Banner />
    <section class="content mt-[36px]">
      <div class="container flex gap-6 relative px-4">
        <SidebarCategory />
        <div class="content__main grow px-4">
          <div v-if="popularGames && popularGames.length" class="mb-7">
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
          <YourGame />
          <RecommendGame />
          <RecommendGame sort="-is_hot" />
          <RecommendGame sort="-published_at" />
          <RecommendGame sort="-created_at" />
        </div>
      </div>
    </section>
  </MainLayout>
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
