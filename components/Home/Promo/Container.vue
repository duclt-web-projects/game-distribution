<script setup>
import { API_ENDPOINT } from "@/config/constants";
import { tags } from "@/data/promos";

const { data: promo } = await useLazyFetch(`${API_ENDPOINT}/games/promo-feature`);
const { data: promoList } = await useFetch(`${API_ENDPOINT}/games/promo-list`);
</script>

<template>
  <div class="promo-container">
    <div class="promo-left">
      <HomePromoTileItem v-if="promo && promo.hotGame" :item="promo.hotGame" />
      <SkeletonPromoTileItem v-else />

      <div class="promo-columns">
        <template v-if="promo && promo.featureGame">
          <HomePromoTileItem
            v-for="item in promo.featureGame"
            :key="item.id"
            :item="item"
            :isFeatured="false"
            :isPurple="item.id % 2 === 1"
          />
        </template>
        <template v-else>
          <SkeletonPromoTileItem :isFeatured="false" />
          <SkeletonPromoTileItem :isFeatured="false" :isPurple="true" />
          <SkeletonPromoTileItem :isFeatured="false" />
        </template>
      </div>
    </div>
    <div class="promo-right">
      <template v-if="promoList">
        <HomePromoListItem v-for="item in promoList" :key="item.id" :item="item" />
      </template>
      <template v-else>
        <SkeletonPromoListItem />
      </template>

      <div class="promo-tags">
        <div><small>Top Tags</small></div>
        <NuxtLink v-for="(tag, index) in tags" :key="index" :to="'/games?tag=' + tag" class="pill" :title="tag">
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .promo-left,
  .promo-right {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
  }

  .promo-columns {
    display: flex;
    flex-direction: column;
  }
}
@media (min-width: 640px) {
  .promo-container {
    .promo-columns {
      flex-direction: row;
    }
  }
}

@media (min-width: 1025px) {
  .promo-container {
    flex-direction: row;

    .promo-left {
      padding-right: 0;
      width: calc(100% * 2 / 3);
    }
    .promo-right {
      padding-right: 0;
      width: calc(100% / 3);
    }
  }
}
</style>
