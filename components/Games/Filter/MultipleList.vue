<template>
  <GamesFilterMultipleItem title="Categories" :data="categories"/>
  <GamesFilterMultipleItem title="MOBILE READY" :data="mobileReady"/>
  <GamesFilterMultipleItem title="COMPANIES" :data="companies"/>
  <GamesFilterMultipleItem title="GAME SUB TYPE" :data="gameTypes"/>
  <GamesFilterMultipleItem title="LANGUAGES" :data="languages"/>
</template>

<script setup>
import { categories, mobileReady, companies, gameTypes, languages } from "@/data/filters";
</script>

<style lang="scss" scoped></style>
