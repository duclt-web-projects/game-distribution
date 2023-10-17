<template>
  <div class="spinner"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.spinner {
  min-width: 1rem;
  min-height: 1rem;
  border-width: 2px;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
