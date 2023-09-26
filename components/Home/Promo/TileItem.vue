<script setup>
import IconPromoFeature from "@/assets/icon/PromoFeature.vue";
import { useUrlConfig } from "@/composables/useUrlConfig";

const props = defineProps({
  item: Object,
  isFeatured: {
    type: Boolean,
    default: true,
  },
  isPurple: {
    type: Boolean,
    default: false,
  },
});
const { BACKEND_URL } = useUrlConfig();
</script>

<template>
  <div class="promo-tile-item">
    <div
      :class="[isFeatured ? 'promo-featured' : 'promo-normal', isPurple ? 'is-purple' : 'is-orange']"
      @click.self="navigateTo(item.slug)"
    >
      <div class="promo-info">
        <h3 v-if="isFeatured">
          <NuxtLink :to="`/games/${item.slug}`" :title="item.name">
            {{ item.name }}
          </NuxtLink>
        </h3>
        <h4 v-else>
          <NuxtLink :to="`/games/${item.slug}`" :title="item.name">
            {{ item.name }}
          </NuxtLink>
        </h4>
        <small> By XGame </small>
        <IconPromoFeature v-if="isFeatured" />
      </div>
      <div class="promo-image">
        <NuxtLink :to="`/games/${item.slug}`" class="image" :class="isFeatured ? 'is-2by1' : 'is-4by3'">
          <img :src="BACKEND_URL + item.thumbnail" :alt="item.name" />
        </NuxtLink>
        <div class="pills" style="">
          <NuxtLink href="/games" class="pill transparent" title="casual">casual</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/promo-tile-item.scss";
</style>
