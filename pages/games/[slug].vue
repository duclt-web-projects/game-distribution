<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import { useUrlConfig } from '@/composables/useUrlConfig';
import MainLayout from '@/layouts/MainLayout.vue';
import { useUserStore } from '@/stores/useUserStore';
import { IComment, IGame, IGameDetail, IGameLocal } from '@/types/game';
import {
  Bars3Icon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  StarIcon as StarOutlineIcon,
} from '@heroicons/vue/24/outline';
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ShareIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/solid';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

const { slug } = useRoute().params;
const { API_URL, BACKEND_URL } = useUrlConfig();

const { data: game } = await useHttp<IGameDetail>(
  () => `${API_URL}/game/${slug}`,
);

if (!game.value) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Game Not Found',
  });
}

definePageMeta({
  middleware: ['locale'],
});

const { $toast } = useNuxtApp();
const userStore = useUserStore();
const commentText = ref('');
const commentError = ref('');
const rating = ref(5);
const fetchComment = ref(false);
const modalActive = ref(false);
const gameHeight = ref('656px');
const isFullscreen = ref(false);

const { data: gamesSameCategory } = await useHttp<IGame[]>(`games`, {
  query: {
    categories: game.value.categories.map((cate) => cate.id).toString(),
    limit: 5,
  },
});

const { data: gamesSameTag } = await useHttp<IGame[]>(`games`, {
  query: {
    tags: game.value.tags.map((cate) => cate.id).toString(),
    limit: 5,
  },
});

const { data: gamesHot } = await useHttp<IGame[]>(`games/hot-list`);

const addComment = async () => {
  commentError.value = '';
  if (commentText.value === '') {
    commentError.value = 'Please enter comment.';
    return;
  }

  if (game.value) {
    const { data, error } = await useHttp(`game/${game.value.id}/comment`, {
      method: 'POST',
      body: {
        comment: commentText.value,
        rating: rating.value,
      },
    });

    if (error.value) {
      $toast.error(error.value.message);
    }

    if (data.value) {
      fetchComment.value = !fetchComment.value;
      commentText.value = '';
      $toast.success('Add comment successfully.');
    }
  }
};

const changeStarRate = (rate) => {
  rating.value = rate;
};

onMounted(() => {
  (navigator as any).keyboard.lock();

  if (process.client && game.value) {
    const yourGamesLocal = localStorage.getItem('your-games');
    let yourGames: IGameLocal[] = [];

    if (yourGamesLocal) {
      yourGames = JSON.parse(yourGamesLocal);
    }

    const isExist = yourGames.find((item) => item.id === game.value?.id);

    if (!isExist) {
      yourGames.push({
        id: game.value.id,
        name: game.value.name,
        slug: game.value.slug,
        thumbnail: game.value.thumbnail,
      });

      localStorage.setItem('your-games', JSON.stringify(yourGames));
    }
  }
});

const handleFullscreen = () => {
  if (process.client) {
    if (!isFullscreen.value) {
      if (
        document.fullscreenEnabled ||
        (document as any).webkitFullscreenEnabled ||
        (document as any).mozFullScreenEnabled ||
        (document as any).msFullscreenEnabled
      ) {
        const iframe = document.querySelector('#game-full') as any;

        if (!iframe) return;
        // Do fullscreen
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
        gameHeight.value = '100%';
        isFullscreen.value = true;
      } else {
        gameHeight.value = '656px';
        isFullscreen.value = false;
      }
    } else {
      document.exitFullscreen();
      gameHeight.value = '656px';
      isFullscreen.value = false;
    }
  }
};

const { data: comments } = await useHttp<IComment[]>(
  `game/${game.value.id}/comments`,
  {
    server: false,
    watch: [fetchComment],
  },
);

await useHttp<IGame[]>(`game/${game.value.id}/play-times`, {
  server: false,
});

useHead({
  meta: [
    {
      name: 'description',
      content:
        'Games Catalog of XGame Studio. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.',
    },
    { name: 'ogTitle', content: 'Games Catalog - XGame Studio' },
    {
      name: 'ogDescription',
      content:
        'Games Catalog of XGame Studio. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.',
    },
  ],
});
</script>

<template>
  <MainLayout>
    <Head v-if="game">
      <Title>Publish {{ game.name }} on your website - XGame Studio</Title>
    </Head>
    <div v-if="game" class="container px-4">
      <div id="game-full">
        <div
          class="flex justify-between items-center py-4"
          :class="isFullscreen ? 'mx-4' : ''"
        >
          <h1
            class="font-semibold text-[24px]"
            :class="isFullscreen ? 'text-white' : ''"
          >
            {{ game.name }}
          </h1>
          <div class="flex items-center">
            <BaseDropdown align="bottom-left" width="360px" class="popup">
              <template #button>
                <Bars3Icon
                  class="w-7 h-7 mr-4"
                  :class="isFullscreen ? 'text-white' : ''"
                />
              </template>
              <template #items>
                <BaseDropdownItem as="div">
                  <div class="flex popup-info">
                    <div class="popup-info__img relative shadow mr-2">
                      <img
                        :src="BACKEND_URL + '/' + game.thumbnail"
                        alt=""
                        class="rounded object-contain"
                      />
                      <span class="rating flex items-center p-1">
                        <StarIcon class="w-3 h-3 mb-0.5 mr-1" /> 4.5
                      </span>
                    </div>
                    <div>
                      <p class="font-semibold whitespace-nowrap">
                        {{ game.name }}
                      </p>
                      <div class="flex items-center popup-info__company">
                        <span>XGame Studio</span>
                        <span class="dot"></span>
                        <span>2,1M+ {{ $t('playing') }}</span>
                      </div>
                    </div>
                  </div>
                </BaseDropdownItem>
                <BaseDropdownItem class="py-3">
                  <div class="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2 9L10.2 7H13C14.1 7 15 7.9 15 9V11.8L13 9.8V9H12.2ZM23 9V7H19C17.9 7 17 7.9 17 9V11C17 12.1 17.9 13 19 13H21V15H18.2L20.2 17H21C22.1 17 23 16.1 23 15V13C23 11.9 22.1 11 21 11H19V9H23ZM22.1 21.5L20.8 22.8L14.4 16.4C14.1 16.7 13.6 17 13 17H9V10.9L7 8.9V17H5V13H3V17H1V9C1 7.9 1.9 7 3 7H5.1L1.1 3L2.4 1.7L22.1 21.5ZM5 9H3V11H5V9ZM13 14.9L11 12.9V15H13V14.9Z"
                        fill="#555"
                      />
                    </svg>
                    {{ $t('disabled_ads') }}
                  </div>
                </BaseDropdownItem>
                <BaseDropdownItem class="py-3">
                  <BaseDropdown align="center">
                    <template #button>
                      <div class="flex items-center w-full">
                        <ShareIcon class="w-6 h-6 mr-2 text-[#444]" />
                        {{ $t('share') }}
                      </div>
                    </template>
                    <template #items>
                      <BaseDropdownItem as="div">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_155_106)">
                            <path
                              d="M18.375 0H5.625C2.5184 0 0 2.5184 0 5.625V18.375C0 21.4816 2.5184 24 5.625 24H18.375C21.4816 24 24 21.4816 24 18.375V5.625C24 2.5184 21.4816 0 18.375 0Z"
                              fill="white"
                            />
                            <path
                              d="M18.375 0H5.625C2.5184 0 0 2.5184 0 5.625V18.375C0 21.4816 2.5184 24 5.625 24H18.375C21.4816 24 24 21.4816 24 18.375V5.625C24 2.5184 21.4816 0 18.375 0Z"
                              fill="#1D9BF0"
                            />
                            <path
                              d="M18.7099 8.56978C18.7202 8.71856 18.7202 8.86734 18.7202 9.01753C18.7202 13.5922 15.2376 18.8683 8.86941 18.8683V18.8655C6.98814 18.8682 5.14585 18.3294 3.5625 17.3135C3.83606 17.3464 4.11094 17.3628 4.38656 17.3634C5.94578 17.3647 7.46014 16.8417 8.68631 15.8785C7.96387 15.8649 7.26376 15.6258 6.68385 15.1947C6.10394 14.7637 5.67323 14.1622 5.45194 13.4743C5.97063 13.5743 6.50537 13.5539 7.01494 13.4147C5.39981 13.0883 4.23778 11.6692 4.23778 10.0211V9.97725C4.71927 10.2454 5.25814 10.394 5.80903 10.4106C4.28784 9.39384 3.81891 7.37006 4.73747 5.78775C5.60665 6.85734 6.69112 7.73213 7.92042 8.35528C9.14972 8.97844 10.4964 9.33602 11.8729 9.40481C11.7356 8.81404 11.7559 8.19758 11.9317 7.6171C12.1074 7.03662 12.4325 6.51245 12.8744 6.09703C14.2688 4.78622 16.4619 4.85344 17.7728 6.24712C18.5481 6.09405 19.2916 5.80982 19.9713 5.40666C19.7128 6.20828 19.172 6.88872 18.4493 7.32141C19.1357 7.24055 19.8059 7.05683 20.4375 6.77644C19.9729 7.47225 19.3878 8.07948 18.7099 8.56978Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_155_106">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Twitter
                      </BaseDropdownItem>
                      <BaseDropdownItem as="div">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_155_111)">
                            <path
                              d="M24 12C24 5.37262 18.6274 0 12 0C5.37262 0 0 5.37253 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6575 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3398 7.875 13.875 8.80003 13.875 9.74906V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9896 24 12Z"
                              fill="#1877F2"
                            />
                            <path
                              d="M16.6711 15.4688L17.2031 12H13.875V9.74906C13.875 8.79994 14.3399 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6575 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C10.7453 23.9514 11.3722 24.0002 12 24C12.6278 24.0002 13.2547 23.9514 13.875 23.8542V15.4688H16.6711Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_155_111">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Facebook
                      </BaseDropdownItem>
                      <BaseDropdownItem as="div">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_155_100)">
                            <path
                              d="M12 0C8.81813 0 5.76375 1.26506 3.51562 3.51469C1.26518 5.76521 0.000623381 8.81734 0 12C0 15.1813 1.26562 18.2357 3.51562 20.4853C5.76375 22.7349 8.81813 24 12 24C15.1819 24 18.2363 22.7349 20.4844 20.4853C22.7344 18.2357 24 15.1813 24 12C24 8.81869 22.7344 5.76431 20.4844 3.51469C18.2363 1.26506 15.1819 0 12 0Z"
                              fill="url(#paint0_linear_155_100)"
                            />
                            <path
                              d="M5.43184 11.8733C8.93059 10.3493 11.2631 9.34444 12.4293 8.859C15.7631 7.47282 16.455 7.23207 16.9068 7.22391C17.0062 7.22232 17.2275 7.24688 17.3718 7.3636C17.4918 7.46203 17.5256 7.59516 17.5425 7.68863C17.5575 7.782 17.5781 7.99482 17.5612 8.16094C17.3812 10.0584 16.5993 14.6631 16.2018 16.7884C16.035 17.6876 15.7031 17.9891 15.3825 18.0186C14.685 18.0827 14.1562 17.5581 13.4812 17.1158C12.4256 16.4233 11.8293 15.9924 10.8037 15.3169C9.61872 14.5361 10.3875 14.1069 11.0625 13.4057C11.2387 13.2221 14.31 10.4293 14.3681 10.176C14.3756 10.1443 14.3831 10.0262 14.3118 9.96394C14.2425 9.9015 14.1393 9.92288 14.0643 9.93975C13.9575 9.96375 12.2718 11.079 9.00184 13.2853C8.52372 13.6142 8.09059 13.7745 7.70059 13.7661C7.27309 13.7569 6.44809 13.5238 5.83497 13.3247C5.08497 13.0804 4.48684 12.9512 4.53934 12.5363C4.56559 12.3203 4.86372 12.0992 5.43184 11.8733Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_155_100"
                              x1="1200"
                              y1="0"
                              x2="1200"
                              y2="2400"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#2AABEE" />
                              <stop offset="1" stop-color="#229ED9" />
                            </linearGradient>
                            <clipPath id="clip0_155_100">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Telegram
                      </BaseDropdownItem>
                      <BaseDropdownItem as="div">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_155_97)">
                            <path
                              d="M0 11.9999C0 16.9135 2.9548 21.1348 7.183 22.9907C7.14925 22.1528 7.177 21.1469 7.39188 20.2352C7.6226 19.2611 8.93593 13.6965 8.93593 13.6965C8.93593 13.6965 8.55259 12.9303 8.55259 11.7979C8.55259 10.0196 9.58328 8.69151 10.8669 8.69151C11.9584 8.69151 12.4858 9.51133 12.4858 10.4931C12.4858 11.5903 11.7859 13.2315 11.426 14.7516C11.1254 16.0245 12.0643 17.0628 13.32 17.0628C15.5937 17.0628 17.125 14.1426 17.125 10.6828C17.125 8.05281 15.3536 6.0843 12.1317 6.0843C8.49156 6.0843 6.22385 8.79885 6.22385 11.831C6.22385 12.8765 6.5321 13.6137 7.01491 14.1846C7.23691 14.4469 7.26775 14.5523 7.18741 14.8534C7.12985 15.0742 6.99766 15.6058 6.94291 15.8164C6.86304 16.1203 6.61676 16.229 6.34207 16.1168C4.66545 15.4323 3.88461 13.5963 3.88461 11.5323C3.88461 8.12359 6.75954 4.0362 12.461 4.0362C17.0426 4.0362 20.058 7.35149 20.058 10.9102C20.058 15.6176 17.4409 19.1343 13.5831 19.1343C12.2876 19.1343 11.0689 18.434 10.6515 17.6386C10.6515 17.6386 9.9548 20.4034 9.80724 20.9373C9.55281 21.8625 9.05481 22.7872 8.59947 23.5079C9.70361 23.8344 10.849 24.0001 12.0004 24C18.627 24 24 18.6274 24 11.9999C24 5.37257 18.627 0 12.0004 0C5.37317 0 0 5.37257 0 11.9999Z"
                              fill="#CB1F27"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_155_97">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Pinterest
                      </BaseDropdownItem>
                      <BaseDropdownItem as="div">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 2H4C2.9 2 2 2.9 2 4V15.5H4V4H16V2ZM19 6H8C6.9 6 6 6.9 6 8V19.5C6 20.6 6.9 21.5 8 21.5H19C20.1 21.5 21 20.6 21 19.5V8C21 6.9 20.1 6 19 6ZM19 19.5H8V8H19V19.5Z"
                            fill="black"
                          />
                        </svg>
                        Copy link
                      </BaseDropdownItem>
                    </template>
                  </BaseDropdown>
                </BaseDropdownItem>
                <BaseDropdownItem class="py-3">
                  <div class="flex items-center">
                    <StarOutlineIcon class="w-6 h-6 text-[#444]" />
                    {{ $t('rate_game') }}
                  </div>
                </BaseDropdownItem>
                <BaseDropdownItem class="py-3">
                  <div class="flex items-center">
                    <EnvelopeIcon class="w-6 h-6 text-[#444]" />
                    {{ $t('report') }}
                  </div>
                </BaseDropdownItem>
                <BaseDropdownItem class="py-3">
                  <div class="flex items-center" @click="modalActive = true">
                    <QuestionMarkCircleIcon class="w-6 h-6 text-[#444]" />
                    {{ $t('how_to_play') }}
                  </div>
                </BaseDropdownItem>
              </template>
            </BaseDropdown>
            <ArrowsPointingOutIcon
              v-if="!isFullscreen"
              class="w-5 h-5"
              :class="isFullscreen ? 'text-white' : ''"
              @click="handleFullscreen"
            />
            <ArrowsPointingInIcon
              v-else
              class="w-5 h-5"
              :class="isFullscreen ? 'text-white' : ''"
              @click="handleFullscreen"
            />
          </div>
        </div>
        <div
          class="game-screen"
          :style="{
            height: gameHeight,
          }"
        >
          <GameOverlay />
          <iframe
            id="iframe"
            class="iframe-close"
            name="iframe"
            :src="`${BACKEND_URL}/${game.source_link}`"
            :width="'100%'"
            :height="'100%'"
            scrolling="no"
          ></iframe>
        </div>
      </div>
      <div class="grid grid-cols-3 my-10 gap-10">
        <div class="col-span-3 lg:col-span-2">
          <div class="comments mb-5">
            <h3 class="text-[24px] mb-4 font-medium">
              {{ $t('rating_review') }}
            </h3>
            <div class="grid grid-cols-4 gap-5">
              <div class="col-span-4 md:col-span-1">
                <p class="text-[20px] text-center mb-4">{{ $t('average') }}</p>
                <p class="text-[48px] text-center mb-4 font-medium">4,5</p>
                <div class="flex items-center justify-center">
                  <StarIcon class="w-6 h-6 fill-[#F7A824]" />
                  <StarIcon class="w-6 h-6 fill-[#F7A824]" />
                  <StarIcon class="w-6 h-6 fill-[#F7A824]" />
                  <StarIcon class="w-6 h-6 fill-[#F7A824]" />
                  <StarOutlineIcon class="w-6 h-6 stroke-[#F7A824]" />
                </div>
              </div>

              <div class="col-span-4 md:col-span-3">
                <div class="flex items-center justify-end mb-2">
                  <div class="flex items-center mr-2 min-w-[60px]">
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                  </div>
                  <div class="grow">
                    <div class="w-full h-1 bg-[#D9D9D9] rounded-full">
                      <div class="bg-[#F7A824] w-[90%] h-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end mb-2">
                  <div class="flex items-center mr-2 min-w-[60px]">
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                  </div>
                  <div class="grow">
                    <div class="w-full h-1 bg-[#D9D9D9] rounded-full">
                      <div class="bg-[#F7A824] w-[80%] h-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end mb-2">
                  <div class="flex items-center mr-2 min-w-[60px]">
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                  </div>
                  <div class="grow">
                    <div class="w-full h-1 bg-[#D9D9D9] rounded-full">
                      <div class="bg-[#F7A824] w-[80%] h-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end mb-2">
                  <div class="flex items-center mr-2 min-w-[60px]">
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                  </div>
                  <div class="grow">
                    <div class="w-full h-1 bg-[#D9D9D9] rounded-full">
                      <div class="bg-[#F7A824] w-[80%] h-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end mb-2">
                  <div class="flex items-center mr-2 min-w-[60px]">
                    <StarIcon class="w-3 h-3 fill-[#F7A824]" />
                  </div>
                  <div class="grow">
                    <div class="w-full h-1 bg-[#D9D9D9] rounded-full">
                      <div class="bg-[#F7A824] w-[10%] h-1 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end text-[#90919D]">
                  336N {{ $t('ratings') }}
                </div>
              </div>
            </div>
          </div>
          <div class="tap-rate">
            <span>{{ $t('tap_to_rate') }}:</span>
            <StarIcon
              v-for="index in 5"
              :key="index"
              class="w-8 h-8 stroke-[#F7A824] hover:fill-[#F7A824]"
              :class="rating >= index ? 'fill-[#F7A824]' : 'fill-white'"
              @click="changeStarRate(index)"
              @mouseover="changeStarRate(index)"
            />
          </div>
          <template v-if="comments">
            <div
              class="flex justify-between mb-4 border-b border-b-gray-200 pb-2"
            >
              <h3>{{ comments.length }} {{ $t('comments') }}</h3>
              <div class="flex items-center">
                <span class="text-[14px] mr-2">{{ $t('sort_by') }}</span>
                <select id="sort" name="" class="text-[14px] py-1 px-2 rounded">
                  <option value="1">{{ $t('default') }}</option>
                  <option value="1">{{ $t('latest') }}</option>
                  <option value="1">{{ $t('oldest') }}</option>
                </select>
              </div>
            </div>
            <div
              v-if="userStore.isLoggedIn && userStore.user"
              class="flex mb-4 border-b border-[#D9D9D9] pb-4"
            >
              <div class="user w-10 h-10 mr-4">
                <img
                  v-if="userStore.user && userStore.user.avatar"
                  class="rounded-full shadow object-contain"
                  :src="BACKEND_URL + userStore.user.avatar"
                  alt=""
                />
                <UserCircleIcon v-else class="w-10 h-10 fill-gray-400" />
              </div>
              <div class="grow">
                <form @submit.prevent="addComment">
                  <p class="font-medium mb-1">{{ userStore.user.name }}</p>
                  <FormTextArea
                    v-model="commentText"
                    placeholder="Enter your rating"
                    type="text"
                    class="min-h-[152px]"
                  />
                  <span v-if="commentError" class="text-xs text-red-500">
                    {{ commentError }}
                  </span>
                  <div class="flex justify-end mt-2">
                    <button
                      type="submit"
                      class="text-white bg-[#EB8B3A] py-1 px-4 rounded text-[14px]"
                    >
                      {{ $t('send') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div v-else>
              <div class="border p-4 rounded mb-10">
                <p class="font-medium text-center text-[14px] mb-2">
                  {{ $t('login_to_comment') }}
                </p>
                <div class="flex justify-center items-center gap-4">
                  <NuxtLink to="/login" class="comment__btn comment__btn-login">
                    {{ $t('login') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/register"
                    class="comment__btn comment__btn-register"
                  >
                    {{ $t('register') }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            <GameComment
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
            />
          </template>
          <div class="suggest-game suggest-game--hot mt-10">
            <h3>{{ $t('games_hot') }}</h3>
            <div class="suggest-game__list">
              <GameCard v-for="item in gamesHot" :key="item.id" :game="item" />
            </div>
          </div>
        </div>
        <div class="col-span-3 lg:col-span-1">
          <div class="suggest-game">
            <h3>{{ $t('similar_games') }}</h3>
            <div class="suggest-game__list">
              <GameCard
                v-for="item in gamesSameCategory"
                :key="item.id"
                :game="item"
              />
            </div>
          </div>
          <div class="suggest-game">
            <h3>{{ $t('related_games') }}</h3>
            <div class="suggest-game__list">
              <GameCard
                v-for="item in gamesSameTag"
                :key="item.id"
                :game="item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
  <ClientOnly>
    <base-modal
      v-if="game"
      :modal-active="modalActive"
      width="798px"
      teleport=".game-screen"
      @close-modal="modalActive = false"
    >
      <template #header>
        <div class="flex detail">
          <div class="flex popup-info">
            <div class="popup-info__img relative shadow mr-2">
              <img
                :src="`${BACKEND_URL}/${game.thumbnail}`"
                alt=""
                class="rounded object-contain"
              />
              <span class="rating flex items-center p-1">
                <StarIcon class="w-3 h-3 mb-0.5 mr-1" /> 4.5
              </span>
            </div>
            <div>
              <p class="font-semibold whitespace-nowrap">{{ game.name }}</p>
              <div class="flex items-center popup-info__company">
                <span>XGame Studio</span>
                <span class="dot"></span>
                <span>2,1M+ {{ $t('playing') }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #body>
        <Carousel
          :items-to-show="2.5"
          snap-align="start"
          :breakpoints="{
            768: {
              itemsToShow: 3.5,
            },
          }"
        >
          <Slide :index="1">
            <img :src="BACKEND_URL + '/' + game.thumbnail" alt="" />
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        <h3 class="text-2xl font-medium">{{ $t('introduction_to_game') }}</h3>
        <div v-html="game.description"></div>
        <h3 class="text-2xl font-medium">{{ $t('how_to_play') }}</h3>
        <p class="text-[14px]"></p>
        <h3 class="text-2xl font-medium">{{ $t('game_information') }}</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-1">
            <div>{{ $t('game_information') }}</div>
            <div class="font-light">0+</div>
          </div>
          <div class="col-span-1">
            <div>{{ $t('communication') }}</div>
            <div class="font-light"></div>
          </div>
          <div class="col-span-1">
            <div>{{ $t('authorization_support') }}</div>
            <div class="font-light">{{ $t('yes') }}</div>
          </div>
          <div class="col-span-1">
            <div>{{ $t('language') }}</div>
            <div class="font-light">English, Russisan</div>
          </div>
          <div class="col-span-1">
            <div>{{ $t('screen_orientation') }}</div>
            <div class="font-light"></div>
          </div>
          <div class="col-span-1">
            <div>{{ $t('release_date') }}</div>
            <div class="font-light">
              {{ convertStringToDate(game.published_at) }}
            </div>
          </div>
          <div class="col-span-1">
            <div>{{ $t('save_to_cloud') }}</div>
            <div class="font-light">{{ $t('yes') }}</div>
          </div>
        </div>
      </template>

      <template #footer> </template>
    </base-modal>
  </ClientOnly>
</template>

<style scoped lang="scss">
.container {
  margin: 16px auto;
}

.popup {
  :deep(> .dropdown-menu) {
    border-radius: 12px;
  }

  :deep(.dropdown-item) {
    padding: 16px;
    padding-bottom: 0;
    border: none;

    > div {
      padding-bottom: 16px;
      border-bottom: 1px solid #d9d9d9;
    }

    .dropdown-item {
      padding: 8px 16px;
      > div {
        padding: 0;
        border-bottom: none;
      }
    }

    svg {
      margin-right: 8px;
    }
  }
}

.popup-info {
  &__img {
    width: 80px;
    height: 80px;
    margin-right: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__company {
    span {
      font-size: 12px;
      color: #90919d;
    }

    .dot {
      width: 4px;
      height: 4px;
      background-color: #90919d;
      border-radius: 50%;
      margin: 0 4px;
    }
  }
}

.rating {
  display: flex;
  position: absolute;
  bottom: 4px;
  left: 4px;
  height: 18px;
  background-color: #0000007a;
  font-size: 11px;
  border-radius: 4px;
  color: #fff;
}

#game-full {
  min-height: 656px;
}

.game-screen {
  position: relative;
  width: 100%;
  height: 656px;
  background: #fff0f0;

  :deep(.modal-wrapper) {
    margin: 36px auto;
    overflow: hidden;
  }

  :deep(.modal-body) {
    max-height: 438px;
    overflow-y: auto;
  }
}

.comment__btn {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.comment__btn-login {
  background: linear-gradient(96deg, #11c8f9 4.85%, #287cff 100%);
  color: #fff;
}

.comment__btn-register {
  border: 1px solid #3080ff;
  color: #3080ff;
}

:deep(.carousel__slide) {
  margin-right: 16px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
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
}

:deep(.carousel__next) {
  right: -16px;
}

:deep(.carousel__prev) {
  left: -16px;
}

:deep(.carousel__next--disabled),
:deep(.carousel__prev--disabled) {
  display: none;
}

:deep(.carousel__viewport) {
  margin: 0 16px;
}

.suggest-game {
  border-radius: 12px;
  border-radius: 12px;
  margin-bottom: 40px;

  h3 {
    background-color: #2196f3;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: #fff;
    padding: 8px 16px;
    font-size: 18px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #2196f3;
    padding: 12px;
    padding-left: -8px;
    padding-right: -8px;

    :deep(.game) {
      width: calc(100% / 3 - 16px);
      margin: 8px;
    }
  }
}

.suggest-game--hot {
  h3 {
    width: 360px;
  }
  .suggest-game__list {
    :deep(.game) {
      width: calc(100% / 5 - 16px);
    }
  }
}

.tap-rate {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 16px;

  span {
    font-size: 24px;
    margin-right: 8px;
  }
}

@media screen and (max-width: 1024px) {
  .suggest-game {
    &__list {
      :deep(.game) {
        width: calc(100% / 5 - 16px);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .suggest-game {
    &__list {
      :deep(.game) {
        width: calc(100% / 4 - 16px);
      }
    }
  }

  .suggest-game--hot {
    .suggest-game__list {
      :deep(.game) {
        width: calc(100% / 4 - 16px);
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .suggest-game {
    &__list {
      :deep(.game) {
        width: calc(100% / 3 - 16px);
      }
    }
  }

  .suggest-game--hot {
    .suggest-game__list {
      :deep(.game) {
        width: calc(100% / 3 - 16px);
      }
    }
  }
}
</style>
