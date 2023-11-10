<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { useYourGamesStore } from '../stores/useYourGamesStore';

const isEdit = ref(false);
const yourGamesStore = useYourGamesStore();

const { yourGames } = storeToRefs(yourGamesStore);
yourGames.value = yourGamesStore.getGames();
</script>

<template>
  <ClientOnly>
    <div class="mb-7">
      <div class="flex justify-between">
        <Heading :icon="HeartIcon" title="Your games" />
        <button class="text-[#00B2FF]" @click="isEdit = !isEdit">
          {{ isEdit ? 'Done' : 'Edit' }}
        </button>
      </div>
      <GamesCarousel
        :games="yourGames"
        :is-edit="isEdit"
        :show="3"
        :breakpoints="{
          480: {
            itemsToShow: 3.5,
          },
          640: {
            itemsToShow: 4.5,
          },
          768: {
            itemsToShow: 6.5,
          },
          1024: {
            itemsToShow: 7.5,
          },
          1220: {
            itemsToShow: 9.5,
          },
        }"
      />
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss"></style>
