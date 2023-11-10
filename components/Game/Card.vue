<script setup lang="ts">
import { StarIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  game: Object,
  canRemove: {
    type: Boolean,
    default: false,
  },
});

const { BACKEND_URL } = useUrlConfig();
</script>
<template>
  <NuxtLink v-if="game" :to="`/games/${game.slug}`" class="game">
    <div :class="['game__image relative', canRemove ? '' : 'game__image--up']">
      <span class="game__tag hidden">Promotion</span>
      <img :src="BACKEND_URL + '/' + game.thumbnail" :alt="game.name" />
      <div v-if="canRemove" class="remove-btn">
        <XMarkIcon class="w-4 h-4" />
      </div>
      <span class="game__rating absolute flex items-center text-white px-1">
        <StarIcon class="w-3 h-3 mr-1 mb-0.5" /> {{ game.rating ?? 5 }}</span
      >
    </div>
    <div class="game__info">
      <span>{{ game.name }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.game {
  width: 100%;
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

  &__rating {
    position: absolute;
    bottom: 8px;
    left: 8px;
    height: 18px;
    background-color: #000000ce;
    font-size: 11px;
    border-radius: 4px;
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
      width: 100%;
      aspect-ratio: 4 / 3;
    }

    .remove-btn {
      position: absolute;
      right: -12px;
      top: -12px;
      z-index: 10;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #f5f5f5;

      svg {
        color: #222;
      }
    }
  }

  &__info {
    span {
      font-size: 14px;
      text-align: left;
      line-height: 20px;
      height: 40px;
      display: -webkit-box;
      font-weight: 500;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    .game__image--up {
      transform: translateY(-8px);
    }

    .game__info span {
      color: #287cff;
    }
  }
}

@media screen and (max-width: 640px) {
  .game {
    &__info {
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
