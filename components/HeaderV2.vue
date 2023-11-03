<script setup lang="ts">
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline';
import { SunIcon } from '@heroicons/vue/24/solid';
import { IGame } from '../types/game';

const showMbSearch = ref(false);
const searchText = ref('');
const suggestionSearchGames = ref<IGame[]>([]);

const { BACKEND_URL } = useUrlConfig();

watch(searchText, async () => {
  if (searchText.value) {
    const { data } = await useHttp<IGame[]>(`games`, {
      query: {
        limit: 5,
        name: searchText,
      },
      watch: false,
    });

    if (data.value) {
      suggestionSearchGames.value = data.value;
    }
  } else {
    suggestionSearchGames.value = [];
  }
});
</script>

<template>
  <header class="header shadow">
    <div class="container">
      <div class="flex items-center px-4 py-2 sm:px-0">
        <NuxtLink to="/" class="w-[142px] mr-8 header__logo">
          <img src="/images/logos/logo.png" alt="" />
        </NuxtLink>
        <div class="p-4 grow relative">
          <div class="header__search relative max-w-[680px]">
            <SearchBoxV2 v-model="searchText" :debounce-delay="500" />
            <div
              v-if="suggestionSearchGames.length"
              class="suggestion-game absolute bg-white"
            >
              <NuxtLink
                v-for="game in suggestionSearchGames"
                :key="game.id"
                target="_blank"
                class="flex px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer border-b border-[#f2f2f2]"
              >
                <img
                  :src="BACKEND_URL + game.thumbnail"
                  alt=""
                  class="w-10 h-10 rounded mr-2"
                />
                <p>{{ game.name }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="flex justify-end items-center gap-2">
          <button class="hidden search-btn-mb" @click="showMbSearch = true">
            <MagnifyingGlassIcon class="w-6 h-6 right-6 text-gray-400" />
          </button>
          <button>
            <SunIcon class="w-8 h-8 sm:mr-2 text-main-color" />
          </button>
          <NuxtLink
            class="login-btn flex items-center px-4 py-3 bg-main-color h-5 box-content rounded-[76px] gap-2 text-white"
          >
            <UserCircleIcon class="w-6 h-6" />
            <span class="uppercase whitespace-nowrap">Login</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <div v-if="showMbSearch" class="header__search-mb">
    <div class="search-mb flex items-center px-4 py-6 bg-white relative">
      <button @click="showMbSearch = false">
        <ArrowLeftIcon class="w-6 h-6 mr-4 text-gray-400" />
      </button>
      <SearchBoxV2 v-model="searchText" :debounce-delay="500" class="grow" />
    </div>
    <div class="overlay" @click="showMbSearch = false"></div>
    <div
      v-if="suggestionSearchGames.length"
      class="suggestion-game absolute bg-white"
    >
      <NuxtLink
        v-for="game in suggestionSearchGames"
        :key="game.id"
        target="_blank"
        class="flex px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer border-b border-[#f2f2f2]"
      >
        <img
          :src="BACKEND_URL + game.thumbnail"
          alt=""
          class="w-10 h-10 rounded mr-2"
        />
        <p>{{ game.name }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  .suggestion-game {
    width: 100%;
    top: 48px;
  }
}
@media screen and (max-width: 640px) {
  .header {
    &__logo {
      min-width: 120px;
      margin-right: 0;
    }

    &__search {
      display: none;
    }

    .suggestion-game {
      display: none;
    }

    .search-btn-mb {
      display: block;
    }

    .login-btn {
      padding: 0;
      background-color: #fff;

      svg {
        width: 28px;
        height: 28px;
        color: #666;
        margin-right: 0;
      }
      span {
        display: none;
      }
    }

    &__search-mb {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 100;

      .overlay {
        background-color: #000;
        opacity: 0.5;
        height: 100vh;
        z-index: 100;
      }

      .suggestion-game {
        left: calc(50% + 20px);
        width: calc(100% - 72px);
      }
    }
  }
}
.suggestion-game {
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  border: 1px solid #ccc;

  > a {
    :deep(.game) {
      &:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }
}
</style>
