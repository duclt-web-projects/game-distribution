<script setup></script>

<template>
  <div class="promo-list-item">
    <div class="promo-image skeleton">
      <div class="image"></div>
    </div>
    <div class="promo-info">
      <h4 class="skeleton"></h4>
      <small class="skeleton"></small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/promo-list-item.scss';

.promo-list-item {
  .promo-image {
    max-width: 94px;
    height: 70px;
  }

  .promo-info {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  h4 {
    height: 24px;
  }

  small {
    height: 22px;
    width: 50%;
    margin-top: 8px;
  }
}
</style>
