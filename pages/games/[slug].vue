<script setup>
import { useHttp } from '@/composables/useHttp';
import { useUrlConfig } from '@/composables/useUrlConfig';
import MainLayout from '@/layouts/MainLayout.vue';

const { slug } = useRoute().params;
const { API_URL, BACKEND_URL } = useUrlConfig();

const searchText = ref('');
const suggestionSearchGames = ref([]);

const { data: game } = await useHttp(() => `${API_URL}/game/${slug}`);

watch(searchText, async () => {
  if (searchText.value) {
    const { data } = await useHttp(`games`, {
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
  bodyAttrs: {
    class: 'games',
  },
});
</script>

<template>
  <MainLayout>
    <Head>
      <Title>Publish {{ game.name }} on your website - XGame Studio</Title>
    </Head>
    <section class="pt-20">
      <div class="wrapper">
        <div v-if="!game">Loading ...</div>
        <div v-else class="content">
          <div class="columns">
            <div class="column" style="flex: 1 1 0%"></div>
            <div class="column game-title" style="flex: 3 1 0%">
              <div class="game-title">
                <h1 class="custom-heading">{{ game.name }}</h1>
              </div>
            </div>
            <div class="column relative" style="flex: 3 1 0%">
              <SearchBox v-model="searchText" :debounce-delay="500" />
              <div
                class="suggest shadow-xl absolute w-full z-100"
                :class="suggestionSearchGames.length ? 'show' : 'hidden'"
              >
                <GameCard
                  v-for="item in suggestionSearchGames"
                  :key="item.id"
                  :item="item"
                  :show-grid="false"
                />
              </div>
            </div>
          </div>
          <div class="game-container">
            <GameOverlay
              :width="`${game.width}px`"
              :height="`${game.height}px`"
            />
            <iframe
              id="iframe"
              class="iframe-close"
              name="iframe"
              :src="`${BACKEND_URL}/${game.source_link}`"
              :width="game.width"
              :height="game.height"
              scrolling="no"
            ></iframe>
          </div>
          <div class="columns">
            <div class="column">
              <GameDescription :game="game" />
            </div>
            <div class="column">
              <GameInfo :game="game" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<style lang="scss" scoped>
.wrapper {
  width: auto;
}

.columns {
  flex-direction: row;

  .column {
    margin: 1.25rem;
    position: relative;
    align-items: center;

    .game-title {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
    }

    &:nth-child(2) {
      justify-content: center;
    }

    &:nth-child(3) {
      :deep(form) {
        width: 100%;
      }
    }
  }
}

.tools-container {
  form {
    flex: 1;
    margin-left: 0.9375rem;
    position: relative;

    svg {
      fill: #512e85;
      left: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-55%);
    }

    input {
      box-sizing: border-box;
      font-weight: 300;
      padding-left: 40px;
    }
  }
}

.game-container {
  border-radius: 2px;
  margin: 1.25rem 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .aspect-ratio {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  iframe {
    max-width: 100%;
    object-fit: contain;
  }
}

@media (min-width: 640px) {
  .tools-container {
    padding: 0 0 1.364rem;

    form {
      margin-left: 0.6818rem;
      max-width: 100%;
    }
  }
}

@media (min-width: 1025px) {
  .columns {
    display: flex;

    .column {
      flex: 1;
      margin: 1.364rem;

      &:last-of-type {
        margin: 1.364rem;
        max-width: 350px;
      }
    }
  }

  .game-container {
    margin: 1.364rem 0;
  }
}

h3 {
  font-family: 'Squada One', cursive;
  text-transform: uppercase;
  color: #44a5ab;
  font-size: 24px;
}
</style>
