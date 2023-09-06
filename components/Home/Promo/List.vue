<template>
  <HomePromoListItem v-for="item in promosList" :key="item.id" :item="item" />
</template>

<script setup>
import { promosList } from "@/data/promos";
</script>

<style lang="scss" scoped></style>
