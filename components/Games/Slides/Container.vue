<script setup>
import { collections } from '@/config/collections';
</script>

<template>
  <GamesSlidesItem
    v-for="collection in collections"
    :key="collection.name"
    :logo="collection.logo"
    :bg-image="collection.bgImage"
    :type="collection.type"
  />
</template>

<style lang="scss" scoped></style>
