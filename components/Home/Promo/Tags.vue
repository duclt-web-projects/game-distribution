<template>
  <div class="promo-tags">
    <div><small>Top Tags</small></div>
    <NuxtLink v-for="(tag, index) in tags" :key="index" :to="'/games?tag=' + tag" class="pill" :title="tag">
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { tags } from "@/data/promos";
</script>

<style lang="scss" scoped>
.promo-tags {
  small {
    font-size: 22px;
    text-transform: uppercase;
  }
}
</style>
