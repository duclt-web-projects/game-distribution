<template>
  <div class="spinner animate-spin"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.spinner {
  min-width: 1rem;
  min-height: 1rem;
  border-width: 4px;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation-duration: 0.75s;
}
</style>
