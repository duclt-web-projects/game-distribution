<template>
  <div class="loading"></div>
</template>

<style lang="scss" scoped>
.loading {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid;
  border-color: rgba(179, 179, 179, 0.15) rgba(179, 179, 179, 0.25) rgba(179, 179, 179, 0.35) rgba(179, 179, 179, 0.5);
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
