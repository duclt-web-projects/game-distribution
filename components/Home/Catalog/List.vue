<script setup>
import { useHttp } from '@/composables/useHttp';

const props = defineProps({
  title: String,
  type: String,
});

const { data: games } = await useHttp(
  () => `/games/featured-list?type=${props.type}&limit=20`,
);
</script>

<template>
  <div class="games-container-wrapper">
    <h3 class="custom-heading">{{ title }}</h3>
    <div class="games-container">
      <template v-if="games">
        <GameCard v-for="item in games" :key="item.id" :item="item" />
      </template>
      <Loading v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  border-bottom: 0;
  border-top: 1px solid #dedede;
  color: #44a5ab;
  font-size: 1.5rem;
  margin: 1.25rem 0;
  padding: 0.4rem 0.2rem;
  text-shadow: 0 0 0 transparent;

  &:first-of-type {
    margin-top: 0;
  }
}

.games-container-wrapper {
  padding: 1.25rem 1.25rem 0;

  &:first-of-type {
    padding-top: 0;
  }
}

.games-container {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  margin: -0.9375rem -0.9375rem 0 0;

  .game.card {
    display: block;
    flex: 1;
    max-width: inherit;
  }

  :deep(.loading) {
    margin: 32px auto;
  }
}

@media (min-width: 640px) {
  .catalog-games-container {
    h3 {
      margin: 1.364rem 0;
    }

    & > div {
      padding: 1.364rem 1.364rem 0;
    }

    .games-container {
      margin: -0.6818rem;
    }
  }
}

@media (min-width: 1175px) {
  .catalog-games-container {
    .games-container {
      .game:nth-child(n + 13) {
        display: none;
      }
    }
  }
}

@media (min-width: 1439px) {
  .catalog-games-container {
    .games-container {
      .game:nth-child(n + 13) {
        display: block;
      }
    }
  }
}

@media (min-width: 1750px) {
  .catalog-games-container {
    .games-container {
      .game:nth-child(n + 10) {
        display: none;
      }
    }
  }
}
</style>
