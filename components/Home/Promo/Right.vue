<template>
  <div class="promo-right">
    <HomePromoList />
    <HomePromoTags />
  </div>
</template>

<script setup></script>

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
