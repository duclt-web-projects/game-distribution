<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid';

const isEdit = ref(false);
</script>

<template>
  <div class="mb-7">
    <div class="flex justify-between">
      <Heading :icon="HeartIcon" title="Your games" />
      <button class="text-[#00B2FF]" @click="isEdit = !isEdit">
        {{ isEdit ? 'Done' : 'Edit' }}
      </button>
    </div>
    <GamesCarousel
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
</template>

<style scoped lang="scss"></style>
