<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import MainLayout from '@/layouts/MainLayout.vue';
import { ICategory, IGame } from '@/types/game';
import { HeartIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  error: Object,
});

const { data: popularGames } = await useHttp<IGame[]>('games/hot-list');
const { data: categories } = await useHttp<ICategory[]>('/categories');

useHead({
  title: 'XGame Studio',
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
</script>

<template>
  <MainLayout>
    <div class="container">
      <div class="error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="565"
          height="596"
          viewBox="0 0 565 596"
          fill="none"
          class="svg-1"
        >
          <path
            d="M127.339 26.0001C170.839 37.5001 195.839 18.5001 212.839 0H564.84V529.5C564.84 529.5 397.639 678.74 273.84 529.5C202.5 443.5 192.5 468.5 141.84 456C52.6649 433.997 56.4613 345.386 98.3396 306C140.34 266.5 80.3396 225 61.3396 217C30.3396 203.947 3.77763 175.881 0.339477 131.5C-5.1608 60.5001 56.9944 7.40312 127.339 26.0001Z"
            fill="#77B3F4"
          />
        </svg>
        <svg
          width="318"
          height="227"
          viewBox="0 0 318 227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="svg-2"
        >
          <path
            d="M117 0.915294C53 -7.58471 5 45.9153 0 45.9153V225.915L314.5 227C325 201.667 311.365 177.132 274.5 167.915C206.5 150.915 220.713 97.4645 209.5 74.4153C200.5 55.9153 181 9.41529 117 0.915294Z"
            fill="#5AB7EF"
            fill-opacity="0.6"
          />
        </svg>

        <div class="error__body">
          <img src="/images/banner/error.png" alt="" class="error__banner" />
          <p class="error__heading">404</p>
          <p class="error__heading">Not Found</p>
          <p class="error__description">
            You are accessing a page that does not exist or has been
            deleted/replaced in the XGame Studio system. Don't worry, go back to
            the home page, support the previous page or send a support request
            to Xgame Studio
          </p>
          <div class="flex gap-6 mt-10">
            <NuxtLink to="/" class="error__btn error__btn-home">Home</NuxtLink>
            <NuxtLink to="/" class="error__btn error__btn-back">Back</NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="popularGames" class="content mt-[36px]">
        <Heading :icon="HeartIcon" title="Popular" />
        <GamesCarousel
          :games="popularGames"
          :show="2.5"
          :breakpoints="{
            480: {
              itemsToShow: 3.5,
            },
            768: {
              itemsToShow: 5.5,
            },
          }"
        />
      </div>
      <div v-if="categories" class="categories">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/category/${category.slug}`"
        >
          <SidebarCategoryItem :icon="category.icon" :label="category.name" />
        </NuxtLink>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 712px;
  position: relative;
  background: linear-gradient(100deg, #8bdbf2 0%, #a6c2f8 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 40px;

  .svg-1 {
    position: absolute;
    top: 0;
    right: 0px;
  }

  .svg-2 {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__body {
    width: 100%;
    height: 520px;
    margin: 0 24px;
    background-color: #fff;
    z-index: 10;
    padding: 72px;
    position: relative;
  }

  &__banner {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__heading {
    color: #2d3261;
    font-size: 48px;
    font-weight: 700;
    line-height: 48px;
  }

  &__description {
    font-size: 14px;
    font-weight: 400;
    max-width: 400px;
    color: #222222;
    margin-top: 40px;
  }

  &__btn {
    width: 100px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: relative;
  }

  &__btn-home {
    color: #fff;
    background: linear-gradient(96deg, #11c8f9 4.85%, #287cff 100%);
  }

  &__btn-back {
    border: 1px solid #3080ff;
    color: #2682fe;
  }
}

.categories {
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 8px;
}

:deep(.category__item) {
  background-color: #f0f2f5;
}
</style>
