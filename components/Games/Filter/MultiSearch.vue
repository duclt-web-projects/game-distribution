<template>
  <GamesFilterRefinementList title="Categories" :data="categories"/>
  <GamesFilterRefinementList title="MOBILE READY" :data="mobileReady"/>
  <GamesFilterRefinementList title="COMPANIES" :data="companies"/>
  <GamesFilterRefinementList title="GAME SUB TYPE" :data="gameTypes"/>
  <GamesFilterRefinementList title="LANGUAGES" :data="languages"/>
</template>

<script setup>
import { categories, mobileReady, companies, gameTypes, languages } from "@/data/filters";
</script>

<style lang="scss" scoped></style>
