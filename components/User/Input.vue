<script setup lang="ts"></script>

<template>
  <div class="form-input">
    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Game Name</label>
    <input class="w-full mt-2 border-gray-200 rounded-md pl-5 pr-5" type="text" />
  </div>
</template>

<style scoped lang="scss">
.form-input {
  input {
    height: 40px;
    background-color: #fff;
    border: 1px solid #dadada;
    outline: none;

    &:focus {
      border: 1px solid#d1d5db;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.188);
    }
  }
}
</style>
