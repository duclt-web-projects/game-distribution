<template>
  <div class="catalog-games-container">
    <HomeCatalogListItem v-for="item in catalog" :key="item.id" :title="item" :games="games" />
    <div>
      <div class="button-container">
        <a href="/games" class="xg-button" target="_self" title="">Games catalog</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { games } from "@/data/games";
import { catalog } from "@/data/catalog";
</script>

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
