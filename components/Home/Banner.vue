<script setup lang="ts">
import { Carousel, Pagination, Slide } from 'vue3-carousel';
</script>
<template>
  <section class="banner mt-6">
    <div class="container">
      <carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
        <slide :index="1">
          <img
            src="/images/banner/banner1.png"
            alt=""
            class="h-[310px] object-cover"
          />
        </slide>
        <slide :index="2">
          <img
            src="/images/banner/banner2.png"
            alt=""
            class="h-[310px] object-cover"
          />
        </slide>
        <slide :index="3">
          <img
            src="/images/banner/banner3.png"
            alt=""
            class="h-[310px] object-cover"
          />
        </slide>
        <template #addons>
          <pagination />
        </template>
      </carousel>
    </div>
  </section>
</template>

<style lang="scss" scoped>
:deep(.carousel__pagination) {
  position: relative;
  margin-top: -30px;
  z-index: 10;

  .carousel__pagination-button::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    margin: 0 4px;
  }

  .carousel__pagination-button--active::after {
    background-color: #fb8030;
  }
}
</style>
