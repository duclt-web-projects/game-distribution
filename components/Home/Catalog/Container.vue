<script setup>
import { API_ENDPOINT } from "@/constants";
import { catalog } from "@/data/catalog";

const { data: games } = await useFetch(`${API_ENDPOINT}/games`);
</script>

<template>
  <div class="catalog-games-container">
    <HomeCatalogList v-for="item in catalog" :key="item.id" :title="item" :games="games" />
    <div class="button-container">
      <NuxtLink to="/games" class="xg-button" target="_self" title="">Games catalog</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.catalog-games-container {
  padding-bottom: 1.25rem;

  .button-container {
    margin-top: 2rem;
    box-sizing: border-box;
    padding: 1.25rem;
    text-align: center;
    width: 100%;
  }
}

@media (min-width: 640px) {
  .catalog-games-container {
    .button-container {
      padding: 1.364rem;
    }
  }
}
</style>
