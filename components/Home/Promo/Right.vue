<script setup>
import { API_ENDPOINT } from "@/config/constants";
import { tags } from "@/data/promos";

const { data: promoList } = await useFetch(`${API_ENDPOINT}/games/promo-list`);
</script>

<template>
  <div class="promo-right">
    <HomePromoListItem v-for="item in promoList" :key="item.id" :item="item" />

    <div class="promo-tags">
      <div><small>Top Tags</small></div>
      <NuxtLink v-for="(tag, index) in tags" :key="index" :to="'/games?tag=' + tag" class="pill" :title="tag">
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo-right {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
}
@media (min-width: 1025px) {
  .promo-right {
    width: calc(100% / 3);
  }
}
</style>
