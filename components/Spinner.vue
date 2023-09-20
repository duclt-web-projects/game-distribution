<template>
  <div class="spinner"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
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
