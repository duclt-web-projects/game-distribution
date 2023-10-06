<script setup>
import { useUrlConfig } from "@/composables/useUrlConfig";

const props = defineProps({
  item: Object,
  showGrid: {
    type: Boolean,
    default: true,
  },
});

const { BACKEND_URL } = useUrlConfig();
</script>

<template>
  <NuxtLink :to="`/games/${item.slug}`" :title="item.name" class="game" :class="showGrid ? 'card' : 'list'">
    <div class="thumbnail thumbnail--loaded">
      <div class="spinner"></div>
      <img src="/images/icon-html5.svg" class="type" />
      <span class="image is-4by3"><img :src="BACKEND_URL + item.thumbnail" :alt="item.name" /></span>
    </div>
    <div class="content">
      <span class="title">{{ item.name }}</span>
      <span class="company"> By XGame</span>
      <span class="description">...</span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.game {
  border-radius: 1px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  -webkit-text-decoration: none;
  text-decoration: none;
  will-change: transform;

  span {
    display: block;
  }

  .content {
    flex: 1;
  }

  .title {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #512e85;
    display: -webkit-box;
    font-family: "Squada One", cursive;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 1em;
    overflow: hidden;
    -webkit-text-decoration: none;
    text-decoration: none;
    text-overflow: ellipsis;
    text-shadow: none;
    text-transform: uppercase;
  }

  .company,
  .description {
    font-size: 0.8rem;
    line-height: 1.1rem;
  }

  .company {
    color: #512e85;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .description {
    color: #5c5b63;
    display: none;
  }

  .thumbnail {
    flex: 1;
    position: relative;

    .spinner {
      z-index: 0;
    }

    img.type {
      z-index: 20;
    }

    .image {
      background-color: #fff;
      opacity: 0;
      z-index: 10;

      img {
        border-radius: 1px;
        object-fit: cover;
      }
    }
  }

  .thumbnail.thumbnail--loaded {
    .loader {
      display: none;
    }

    .image {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }

  &:hover {
    background-color: #512e85;

    .company,
    .company > a,
    .description,
    .title {
      color: #fff;
    }
  }

  &:active {
    .title {
      color: #ff8c1c;
    }

    .company,
    .company > a,
    .description {
      color: #fff;
    }
  }
}

.game.card {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  margin: 0.9375rem 0.9375rem 0 0;
  min-width: 170px;
  transition: box-shadow 0.2s cubic-bezier(0.25, 0.75, 0.5, 1.25), transform 0.2s cubic-bezier(0.25, 0.75, 0.5, 1.25);

  .content {
    display: flex;
    flex-direction: column;
    height: 5.8rem;
    padding: 0.9375rem;
  }

  .title {
    flex: 1;
  }

  .company {
    margin-top: auto;

    & > a {
      color: #ff3a56;

      &:hover {
        color: #ff8c1c;
      }

      &:active {
        color: #44a5ab;
      }
    }
  }

  .type {
    border-radius: 1px;
    bottom: 0;
    height: 30px;
    left: 0;
    margin: 0.9375rem;
    position: absolute;
    width: 30px;
    z-index: 1;
  }

  .exclusive {
    height: 50% !important;
    left: auto;
    margin: 0 auto !important;
    right: 0 !important;
    width: 50% !important;
  }

  &:hover {
    background-color: #512e85;
  }

  &:active {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.13);
    transform: translateY(-5px);
  }
}

.game.list {
  display: flex;
  flex-flow: row wrap;
  padding: 0.625rem;
  width: 100%;

  .content {
    margin-left: 2.5rem;
  }

  .title {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin-top: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .company {
    & > a {
      color: #44a5ab;

      &:hover {
        color: #fff;
      }

      &:active {
        color: #ff8c1c;
      }
    }
  }

  .description {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .thumbnail {
    max-width: 5rem;
  }

  .type {
    display: none;
  }

  &:nth-child(2n) {
    background-color: #f8f8f8;

    &:hover {
      background-color: #512e85;
    }
  }

  &:hover {
    background-color: #512e85;
  }
}

@media (min-width: 640px) {
  .game.card {
    margin: 0.6818rem;
    max-width: 170px;

    .content {
      padding: 0.6818rem;
    }

    .type {
      margin: 0.6818rem;
    }
  }

  .game.list {
    padding: 0.4545rem;

    .content {
      margin-left: 2.728rem;
    }
  }
}
</style>