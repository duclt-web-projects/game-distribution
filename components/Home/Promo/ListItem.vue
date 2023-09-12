<script setup>
import { BACKEND_ENDPOINT } from "@/config/constants";

const props = defineProps({
  item: Object,
});
const { navigateTo } = useNavigation();

</script>

<template>
  <div class="promo-list-item" @click="navigateTo(item.slug)">
    <div class="promo-image">
      <div class="image is-4by3">
        <img :src="BACKEND_ENDPOINT + item.thumbnail" :alt="item.name" />
      </div>
    </div>
    <div class="promo-info">
      <h4>
        <NuxtLink :to="`/games/${item.slug}`" class="" :title="item.name">{{ item.name }}</NuxtLink>
      </h4>
      <small> By XGame</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo-list-item {
  background-color: hsla(0, 0%, 88%, 0.3);
  cursor: pointer;
  display: flex;
  margin: 0 0 10px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: linear-gradient(90deg, #3d1b5d, #5c3997);
    transform: translateX(10px);

    a {
      color: #ff3a56;
    }

    .promo-info {
      small {
        a {
          color: #fc8f28;
        }
      }
    }
  }

  &:active {
    background: linear-gradient(90deg, #1b3786, #24b3c0);

    a {
      color: #24f6fd;
    }
  }

  &:nth-child(odd) {
    background-color: hsla(0, 0%, 88%, 0.3);
  }

  & > div {
    flex: 1;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  .promo-image {
    max-width: 94px;
    position: relative;

    & > div {
      overflow: hidden;
    }
  }

  .promo-info {
    line-height: 100%;
    padding-left: 20px;
    transition: 0.1s ease-in-out;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    h4 {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: block;
      display: -webkit-box;
      font-size: 22px;
      letter-spacing: 2px;
      overflow: hidden;
      padding: 0;
      text-overflow: ellipsis;
      text-shadow: none;
    }

    small {
      display: inline-block;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 500;
      max-width: 135px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
      width: auto;

      a {
        color: #000;
      }
    }
  }
}
</style>
