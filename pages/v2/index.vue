<script setup lang="ts">
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/vue/24/outline';
import { HeartIcon, RocketLaunchIcon, SunIcon } from '@heroicons/vue/24/solid';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const game = ref({
  name: 'Eating Simulation',
  thumbnail:
    'https://avatars.mds.yandex.net/get-games/1892995/2a00000185f2767a81b77b2f2f48f620a4bf/pjpg480x270',
});
</script>

<template>
  <header class="shadow">
    <div class="container">
      <div class="flex items-center py-4">
        <NuxtLink to="/" class="w-[142px] mr-8">
          <img src="/images/logos/logo.png" alt="" />
        </NuxtLink>
        <div class="p-4 grow">
          <div class="relative w-full max-w-[680px]">
            <input
              type="text"
              placeholder="Search for..."
              class="w-full leading-5 py-3 px-6 rounded-[50px] outline-none border-none text-gray-400 bg-[#F2F1FA]"
            />
            <MagnifyingGlassIcon
              class="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 right-6 text-gray-400"
            />
          </div>
        </div>
        <div class="flex justify-end items-center">
          <button>
            <SunIcon class="w-8 h-8 mr-4 text-main-color" />
          </button>
          <NuxtLink
            class="flex items-center p-4 bg-main-color h-5 box-content rounded-[76px] text-white"
          >
            <UserCircleIcon class="w-6 h-6 mr-2" />
            <span class="uppercase whitespace-nowrap">Sign In</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <section class="banner mt-6">
    <div class="container">
      <carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
        <slide :index="1">
          <img
            src="/images/banner/banner1.png"
            alt=""
            class="h-[310px] object-cover"
          />
        </slide>
        <slide :index="2">
          <img
            src="/images/banner/banner2.png"
            alt=""
            class="h-[310px] object-cover"
          />
        </slide>
        <slide :index="3">
          <img
            src="/images/banner/banner3.png"
            alt=""
            class="h-[310px] object-cover"
          />
        </slide>

        <template #addons>
          <pagination />
        </template>
      </carousel>
    </div>
  </section>
  <section class="content mt-[36px]">
    <div class="container flex gap-6 relative">
      <div class="content__sidebar sticky top-0 overflow-y-auto">
        <h2 class="text-[14px] font-medium px-4 mb-3">CATEGORY</h2>
        <input
          type="text"
          class="w-full h-8 rounded-[20px] bg-[#D9D9D9] px-4 text-[14px]"
        />
        <div class="my-3">
          <NuxtLink>
            <CategoryItem
              :icon="RocketLaunchIcon"
              label="New"
              :count="302"
              :is-active="true"
            />
          </NuxtLink>

          <NuxtLink v-for="index in 20" :key="index">
            <CategoryItem :icon="HeartIcon" label="Popular" />
          </NuxtLink>
        </div>
      </div>
      <div class="content__main grow">
        <div class="mb-7">
          <h2 class="flex items-center text-[24px] font-medium mb-4">
            <HeartIcon class="w-5 h-5 mr-4" />Popular
          </h2>
          <carousel :items-to-show="2.5" class="mr-3">
            <slide :index="1">
              <NuxtLink to="" class="mx-2 cursor-pointer">
                <Game :game="game" />
              </NuxtLink>
            </slide>
            <slide :index="2">
              <NuxtLink to="" class="mx-2">
                <Game :game="game" />
              </NuxtLink>
            </slide>
            <slide :index="3">
              <NuxtLink to="" class="mx-2">
                <Game :game="game" />
              </NuxtLink>
            </slide>

            <template #addons>
              <navigation />
            </template>
          </carousel>
        </div>
        <div class="mb-7">
          <h2 class="flex items-center text-[24px] font-medium">
            <HeartIcon class="w-5 h-5 mr-4" />Your games
          </h2>
          <carousel
            snap-align="start"
            :items-to-show="9.5"
            class="mr-3 your-game"
          >
            <slide :index="1">
              <NuxtLink to="" class="mx-2 cursor-pointer">
                <Game :game="game" />
              </NuxtLink>
            </slide>
            <slide :index="2">
              <NuxtLink to="" class="mx-2">
                <Game :game="game" />
              </NuxtLink>
            </slide>
            <slide :index="3">
              <NuxtLink to="" class="mx-2">
                <Game :game="game" />
              </NuxtLink>
            </slide>

            <template #addons>
              <navigation />
            </template>
          </carousel>
        </div>
        <div>
          <h2 class="flex items-center text-[24px] font-medium mb-4">
            <HeartIcon class="w-5 h-5 mr-4" />Recommended games
          </h2>
          <div class="games">
            <Game v-for="index in 15" :key="index" :game="game" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer>
    <div class="container pt-9 pb-6">
      <div class="flex justify-between items-end">
        <NuxtLink>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            width="176"
            height="86"
          />
        </NuxtLink>
        <div class="flex social gap-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <hr class="h-px my-4 bg-[#d9d9d9] border-0" />
      <div class="flex justify-center gap-4">
        <NuxtLink class="text-[#375FC6]"> User Agreement </NuxtLink>
        <NuxtLink class="text-[#375FC6]"> Privacy policy </NuxtLink>
        <NuxtLink class="text-[#375FC6]"> Technical assistance </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
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
    background-color: #fb8030;
  }
}

.content {
  &__sidebar {
    min-width: 172px;
    max-width: 172px;
  }

  &__main {
    :deep(.carousel__slide) {
      &:first-child {
        a {
          margin-left: 0;
        }
      }

      &:last-child {
        a {
          margin-right: 0;
        }
      }
    }

    :deep(.carousel) {
      &:hover {
        .carousel__next,
        .carousel__prev {
          display: flex;
        }
      }
    }

    :deep(.carousel__next),
    :deep(.carousel__prev) {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      color: #222;
      background-color: #fff;
      filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.25));
      display: none;
    }

    :deep(.carousel__next) {
      right: -32px;
    }

    :deep(.carousel__prev) {
      left: -24px;
    }

    :deep(.carousel__next--disabled),
    :deep(.carousel__prev--disabled) {
      opacity: 1;
      color: #ccc;
    }
  }

  .your-game {
    :deep(.carousel__viewport) {
      padding: 16px 0;
    }
  }
}

.games {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0 -8px;

  :deep(.game) {
    width: calc(100% / 5 - 16px);
    margin: 8px;
    box-sizing: border-box;
  }
}

footer {
  background-color: #fb8030;

  .social {
    div {
      width: 32px;
      height: 32px;
      background-color: #d9d9d9;
    }
  }
}
</style>
