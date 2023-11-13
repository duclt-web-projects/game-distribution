<script setup lang="ts">
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '../stores/useUserStore';
import { IGame } from '../types/game';

const { locale, setLocale } = useI18n();

const userStore = useUserStore();
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
    <div class="top-header">
      <div class="container">
        <div class="flex justify-end items-center">
          <button
            :class="{
              'font-bold': locale === 'en',
            }"
            @click="setLocale('en')"
          >
            English
          </button>
          <span class="line"></span>
          <button
            :class="{
              'font-bold': locale === 'vi',
            }"
            @click="setLocale('vi')"
          >
            Tiếng Việt
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="flex items-center px-4 py-2 sm:px-0">
        <NuxtLink to="/" class="w-[142px] mr-8 header__logo">
          <img src="/images/logos/logo-v2.png" alt="" />
        </NuxtLink>
        <div class="p-4 grow relative">
          <div class="header__search relative max-w-[680px]">
            <SearchBox v-model="searchText" :debounce-delay="500" />
            <div
              v-if="suggestionSearchGames.length"
              class="suggestion-game absolute bg-white rounded-none"
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
        <div class="flex justify-end items-center gap-4">
          <button class="hidden search-btn-mb" @click="showMbSearch = true">
            <MagnifyingGlassIcon class="w-6 h-6 right-6 text-gray-400" />
          </button>
          <button>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_40_813)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.228 12.8786H26.6C27.3714 12.8786 28 13.3826 28 14C28 14.6188 27.3728 15.1186 26.6 15.1186H25.228C24.4538 15.1186 23.828 14.6174 23.828 14C23.828 13.3812 24.4538 12.8786 25.228 12.8786ZM11.0496 6.87973C11.9852 6.49388 12.9879 6.29686 14 6.3C18.2686 6.3 21.7 9.7286 21.7 14C21.7 18.2714 18.27 21.7 14 21.7C9.7286 21.7 6.3 18.2714 6.3 14C6.29686 12.9879 6.49388 11.9852 6.87973 11.0496C7.26557 10.114 7.83263 9.26391 8.54827 8.54827C9.26391 7.83263 10.114 7.26557 11.0496 6.87973ZM2.8 12.8786C3.5714 12.8786 4.2 13.3826 4.2 14C4.2 14.6174 3.5714 15.1186 2.8 15.1186H1.4C0.6258 15.1186 0 14.6174 0 14C0 13.3812 0.6258 12.8786 1.4 12.8786H2.8ZM15.1186 2.8C15.1186 3.5742 14.6174 4.2 14 4.2C13.3812 4.2 12.8786 3.5742 12.8786 2.8V1.4C12.8786 0.6258 13.3812 0 14 0C14.6174 0 15.1186 0.6258 15.1186 1.4V2.8ZM12.8786 25.2C12.8786 24.4258 13.3812 23.8 14 23.8C14.6174 23.8 15.1186 24.4258 15.1186 25.2V26.6C15.1186 27.3742 14.6174 28 14 28C13.3812 28 12.8786 27.3742 12.8786 26.6V25.2ZM24.5098 3.4902C24.9466 3.927 24.8584 4.725 24.311 5.2724L23.3324 6.251C22.7864 6.7984 21.987 6.888 21.5502 6.4512C21.1134 6.0144 21.2016 5.2164 21.749 4.669L22.729 3.6904C23.2736 3.143 24.073 3.0534 24.5098 3.4902ZM3.6876 22.7276L4.6676 21.7462C5.2122 21.2016 6.0116 21.1092 6.4484 21.5474C6.8852 21.9856 6.797 22.7836 6.2496 23.331L5.2696 24.3096C4.725 24.857 3.9256 24.9438 3.4888 24.507C3.052 24.0702 3.1402 23.275 3.6876 22.7276ZM3.4888 3.4888C3.9256 3.052 4.725 3.1416 5.271 3.689L6.2496 4.669C6.7956 5.215 6.8838 6.0144 6.447 6.4512C6.0102 6.888 5.2136 6.7984 4.6662 6.251L3.6862 5.2724C3.1416 4.725 3.052 3.9256 3.4888 3.4888ZM22.7276 24.311L21.7476 23.3324C21.2002 22.785 21.1092 21.987 21.5474 21.5502C21.9856 21.1134 22.7836 21.203 23.331 21.7504L24.3096 22.729C24.857 23.275 24.9452 24.0744 24.5084 24.5112C24.0716 24.9452 23.275 24.8584 22.7276 24.311Z"
                  fill="url(#paint0_linear_40_813)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_40_813"
                  x1="1.14754"
                  y1="3.5"
                  x2="30.1242"
                  y2="6.34204"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#11C8F9" />
                  <stop offset="1" stop-color="#287CFF" />
                </linearGradient>
                <clipPath id="clip0_40_813">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <NuxtLink
            to="/login"
            class="login-btn flex items-center px-4 py-3 h-5 box-content rounded-[76px] gap-2 text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 11C0 10.3 0 9.6 0 8.9C0.03 8.807 0.073 8.716 0.088 8.621C0.718 4.454 3.662 1.237 7.744 0.263C8.159 0.163 8.581 0.087 9 0C9.667 0 10.333 0 11 0C11.11 0.031 11.218 0.072 11.33 0.09C15.457 0.781 18.195 3.118 19.55 7.065C19.764 7.688 19.853 8.354 20 9C20 9.667 20 10.333 20 11C19.963 11.161 19.92 11.321 19.891 11.483C19.179 15.43 16.934 18.099 13.174 19.471C12.478 19.725 11.726 19.828 11 20C10.333 20 9.667 20 9 20C8.872 19.968 8.745 19.924 8.615 19.907C4.663 19.364 1.407 16.504 0.368 12.648C0.222 12.105 0.122 11.55 0 11ZM16.855 15.33C19.166 12.71 19.895 7.234 15.902 3.566C12.165 0.133 6.423 0.572 3.198 4.512C0.661 7.612 0.638 13.451 3.166 15.306C3.214 15.217 3.262 15.13 3.31 15.043C4.34 13.155 5.929 12.078 8.07 11.954C9.48 11.872 10.899 11.951 12.314 11.983C12.624 11.99 12.94 12.077 13.239 12.172C14.882 12.695 16.046 13.781 16.855 15.33Z"
                fill="white"
              />
              <path
                d="M10 3.74585C12.063 3.74485 13.766 5.42585 13.78 7.47585C13.795 9.57184 12.073 11.2938 9.97301 11.2828C7.91601 11.2718 6.20901 9.56584 6.21701 7.52884C6.22501 5.44585 7.92501 3.74585 10 3.74585Z"
                fill="white"
              />
            </svg>

            <span class="whitespace-nowrap">
              {{ userStore.user?.name ?? $t('login') }}
            </span>
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
      <SearchBox v-model="searchText" :debounce-delay="500" class="grow" />
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
  .top-header {
    background-color: #f4f4f4;
    padding: 8px 0;

    button {
      line-height: 20px;
      font-size: 14px;
    }

    .line {
      display: block;
      width: 1px;
      height: 20px;
      background-color: #666666;
      margin: 0 4px;
    }
  }

  .suggestion-game {
    width: 100%;
    top: 48px;
  }

  .login-btn {
    background: linear-gradient(96deg, #11c8f9 4.85%, #287cff 100%);
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
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;

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
  border: 1px solid #f2f2f2;

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
