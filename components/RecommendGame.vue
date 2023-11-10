<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import { IGame } from '@/types/game';
import { HeartIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  sort: {
    type: String,
    default: '',
  },
});

const { data: recommendedGames } = await useHttp<IGame[]>(
  `games?limit=15&sort=${props.sort}`,
);
</script>
<template>
  <div v-if="recommendedGames && recommendedGames.length">
    <h2 class="flex items-center text-[24px] font-medium mb-4">
      <HeartIcon class="w-8 h-8 mr-4" />Recommended games
    </h2>
    <div class="games grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      <GameCard
        v-for="game in recommendedGames"
        :key="game.id"
        :game="game"
        class="col-span-1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
