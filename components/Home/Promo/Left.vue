<script setup>
import { API_ENDPOINT } from "@/config/constants";

const { data: promo } = useLazyFetch(`${API_ENDPOINT}/games/promo-feature`);

</script>

<template>
  <div v-if="!promo">Loading ...</div>
  <div v-else class="promo-left">
    <HomePromoTileItem :item="promo.hotGame" />

    <div class="promo-columns">
      <HomePromoTileItem
        v-for="item in promo.featureGame"
        :key="item.id"
        :item="promo.hotGame"
        :isFeatured="false"
        :isPurple="item.id % 2 === 1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo-left {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;

  .promo-columns {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 640px) {
  .promo-left {
    .promo-columns {
      flex-direction: row;
    }
  }
}
</style>
