<script setup>
const props = defineProps({
  title: String,
  games: Array,
});
</script>

<template>
  <div class="games-container-wrapper">
    <h3>{{ title }}</h3>
    <div class="games-container">
      <GameCard v-for="item in games" :key="item.id" :item="item" />
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

  .game {
    flex: 1;
  }

  .game.card {
    display: block;
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
