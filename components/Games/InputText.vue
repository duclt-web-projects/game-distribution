<template>
  <form class="form">
    <div class="input-group">
      <IconSearch />
      <input type="search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false"
        placeholder="Search games..." class="search-input-field" />
    </div>
  </form>
</template>

<script setup>
import IconSearch from "@/assets/icon/Search.vue"
</script>

<style lang="scss" scoped>
form {
  position: relative;

  input {
    box-sizing: border-box;
    font-weight: 300;
    padding-left: 40px;
  }

  svg {
    color: #512e85;
    left: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
  }
}
</style>