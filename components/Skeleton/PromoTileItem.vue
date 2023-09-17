<template>
  <div class="promo-tile-item">
    <div :class="[isFeatured ? 'promo-featured' : 'promo-normal', isPurple ? 'is-purple' : 'is-orange']">
      <div class="promo-info">
        <h3 v-if="isFeatured" class="skeleton"></h3>
        <h4 v-else class="skeleton"></h4>
        <small>By <span class="skeleton"></span></small>
        <IconPromoFeature v-if="isFeatured" />
      </div>
      <div class="promo-image">
        <Loading />
      </div>
    </div>
  </div>
</template>

<script setup>
import IconPromoFeature from "@/assets/icon/PromoFeature.vue";

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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/promo-tile-item.scss";

.promo-tile-item {
  .promo-featured {
    .promo-info {
      h3 {
        height: 44px;
      }

      h4 {
        display: block;
        height: 26px;
      }

      small {
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          height: 16px;
          width: 100px;
          margin-left: 8px;
        }
      }
    }

    .promo-image {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 0;
    }
  }

  .promo-normal {
    .promo-info {
      h4 {
        display: block;
        height: 26px;
      }

      small {
        display: flex;
        align-items: center;

        span {
          display: inline-block;
          height: 16px;
          width: 100px;
          margin-left: 8px;
        }
      }
    }

    .promo-image {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 0;
    }
  }
}
</style>
