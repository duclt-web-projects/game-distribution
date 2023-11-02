<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';

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
  <div v-if="game" class="game">
    <div :class="['game__image relative', canRemove ? '' : 'game__image--up']">
      <span class="game__tag hidden">Promotion</span>
      <img :src="game.thumbnail" :alt="game.name" />
      <div v-if="canRemove" class="remove-btn">
        <XMarkIcon class="w-4 h-4" />
      </div>
    </div>
    <div class="game__info">
      <span>{{ game.name }}</span>
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
      display: -webkit-box;
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
      color: #fb8030;
    }
  }
}

@media screen and (max-width: 640px) {
  .game {
    &__info {
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
