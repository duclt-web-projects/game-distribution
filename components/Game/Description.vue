<script setup>
import IconArrowUpRightFromSquare from '@/assets/icon/ArrowUpRightFromSquare.vue';
import { useUrlConfig } from '@/composables/useUrlConfig';

const props = defineProps({
  game: Object,
});

const { BACKEND_URL } = useUrlConfig();
</script>

<template>
  <div class="description-area">{{ game.description }}</div>
  <div class="input-container input-location">
    <a
      :href="`/games-fullscreen/${props.game?.slug}`"
      target="_blank"
      class="xg-button"
      style="width: 100%"
    >
      Open Game In New Tab
      <IconArrowUpRightFromSquare />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.description-area {
  border: 0.5px solid #000;
  border-radius: 3px;
  color: #000;
  font-size: 15px;
  padding: 16px;

  > p {
    margin: auto;
    padding: 5px 10px;
  }
}

.input-container {
  align-items: center;
  border-bottom: 1px solid #dedede;
  display: flex;
  padding: 0 0.9375rem 0.9375rem;

  input {
    display: none;

    &:focus {
      outline: none;
    }
  }

  label {
    display: none;
  }

  .xg-button {
    text-align: center;
    width: 100%;

    svg {
      fill: #fff;
    }
  }
}

.input-container.input-embed {
  display: none;
}

.catalog-games-container {
  padding-bottom: 1.25rem;

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

  > div {
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
      min-width: 150px;
    }
  }

  .button-container {
    box-sizing: border-box;
    padding: 1.25rem;
    text-align: center;
    width: 100%;
  }
}

@media (max-width: 540px) {
  .description-area {
    > p {
      display: none;
    }
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

  .input-container {
    input {
      color: #000;
      display: inline-block;
      flex: 1;
      font-size: 1rem;
      margin: 0 0.6818rem;
      padding: 0.313rem 0.6818rem;
    }

    label {
      display: inline-block;
    }

    .xg-button {
      font-size: 0.75rem;
      height: 35px;
      line-height: 35px;
      padding-bottom: 0;
      padding-top: 0;
      width: auto;
    }
  }

  .input-container.input-location {
    border-bottom: 0;
  }

  .input-container.input-embed {
    display: flex;
  }

  .catalog-games-container {
    h3 {
      margin: 1.364rem 0;
    }

    > div {
      padding: 1.364rem 1.364rem 0;
    }

    .games-container {
      margin: -0.6818rem;
    }

    .button-container {
      padding: 1.364rem;
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

  .input-container {
    border-top: 1px solid #dedede;
    padding: 0.6818rem;
  }
}

@media (min-width: 1490px) and (max-width: 1640px) {
  .catalog-games-container .games-container .game:nth-child(n + 7) {
    display: none;
  }
}

@media (min-width: 1025px) and (max-width: 1146px) {
  .catalog-games-container .games-container .game:nth-child(n + 7) {
    display: none;
  }
}

@media (min-width: 1320px) and (max-width: 1490px) {
  .catalog-games-container .games-container .game:nth-child(n + 6) {
    display: none;
  }
}

@media (min-width: 921px) and (max-width: 1025px) {
  .catalog-games-container .games-container .game:nth-child(n + 6) {
    display: none;
  }
}

@media (min-width: 1147px) and (max-width: 1319px) {
  .catalog-games-container .games-container .game:nth-child(n + 5) {
    display: none;
  }
}
</style>
