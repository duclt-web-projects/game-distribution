<script setup lang="ts">
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { SunIcon } from '@heroicons/vue/24/solid';

const showMbSearch = ref(false);
const showSuggestionGame = ref(false);
</script>

<template>
  <header class="header shadow">
    <div class="container">
      <div class="flex items-center px-4 py-2 sm:px-0">
        <NuxtLink to="/" class="w-[142px] mr-8 header__logo">
          <img src="/images/logos/logo.png" alt="" />
        </NuxtLink>
        <div class="p-4 grow relative">
          <div class="header__search relative w-full max-w-[680px]">
            <input
              type="text"
              placeholder="Search for..."
              class="w-full leading-5 py-2 px-6 rounded-[50px] outline-none border-none text-gray-400 text-[14px] bg-[#F2F1FA]"
            />
            <MagnifyingGlassIcon
              class="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 right-6 text-gray-400"
            />
          </div>
          <div class="suggestion-game absolute bg-white">
            <div>Game 1</div>
            <div>Game 1</div>
            <div>Game 1</div>
            <div>Game 1</div>
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
      <input
        type="text"
        placeholder="Search for..."
        class="w-full leading-5 py-3 px-6 rounded-[50px] outline-none border-none text-gray-400 bg-[#F2F1FA]"
      />
      <XMarkIcon
        class="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 right-7 text-gray-400"
      />
    </div>
    <div class="overlay" @click="showMbSearch = false"></div>
    <div class="suggestion-game absolute bg-white">
      <div>Game 1</div>
      <div>Game 1</div>
      <div>Game 1</div>
      <div>Game 1</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  .suggestion-game {
    width: calc(100% - 32px);
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
  display: none;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  border: 1px solid #ccc;
  border-radius: 8px;

  > div {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }

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
</style>
