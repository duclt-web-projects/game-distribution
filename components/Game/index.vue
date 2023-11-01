<script setup lang="ts">
const props = defineProps({
  game: Object,
});

const { BACKEND_URL } = useUrlConfig();
</script>
<template>
  <div v-if="game" class="game">
    <div class="game__image relative">
      <span class="game__tag">Promotion</span>
      <img :src="game.thumbnail" :alt="game.name" />
    </div>
    <div class="game__info">
      <p>{{ game.name }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game {
  cursor: pointer;

  &__tag {
    position: absolute;
    left: -4px;
    top: -4px;
    background-color: #2cffd9;
    padding: 2px;
    border-top-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border: 2px solid #fff;
    font-size: 12px;
    padding: 4px 8px;
    line-height: 15px;
  }

  &__image {
    margin-bottom: 8px;
    transition: all 0.2s;
    min-height: 96px;
    display: flex;

    img {
      border-radius: 12px;
      min-height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    p {
      font-size: 14px;
      text-align: left;
      line-height: 20px;
    }
  }

  &:hover {
    .game__image {
      transform: translateY(-8px);
    }

    p {
      color: #fb8030;
    }
  }
}
</style>
