<script setup>
import { BACKEND_ENDPOINT } from "@/constants";

const props = defineProps({
  item: Object,
});
</script>

<template>
  <NuxtLink :to="`/games/${item.slug}`" :title="item.name" class="promo-list-item">
    <div class="promo-image">
      <div class="image is-4by3">
        <img :src="BACKEND_ENDPOINT + item.thumbnail" :alt="item.name" />
      </div>
    </div>
    <div class="promo-info">
      <h4>
        {{ item.name }}
      </h4>
      <small> By XGame</small>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/promo-list-item.scss";
</style>
