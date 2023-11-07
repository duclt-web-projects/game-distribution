<script setup lang="ts"></script>

<template>
  <div class="game">
    <div class="game__image skeleton"></div>
    <div class="game__info skeleton"></div>
  </div>
</template>

<style lang="scss" scoped>
.game {
  display: flex;
  flex-direction: column;

  &__image {
    flex-grow: 1;
    min-height: 100px;
    margin-bottom: 16px;
    border-radius: 12px;
  }

  &__info {
    height: 20px;
    margin-bottom: 16px;
  }
}
</style>
