<script setup>
import { API_ENDPOINT } from "@/config/constants";

const { data: promoList } = await useFetch(`${API_ENDPOINT}/games/promo-list`);

</script>

<template>
  <HomePromoListItem v-for="item in promoList" :key="item.id" :item="item" />
</template>

<style lang="scss" scoped></style>
