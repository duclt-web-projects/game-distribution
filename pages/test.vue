<script setup lang="ts"></script>
<template>
  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <BaseDropdown align="left">
      <template #button> Open menu </template>
      <template #items>
        <BaseDropdownItem href="#">Edit</BaseDropdownItem>
        <BaseDropdownItem href="#">Duplicate</BaseDropdownItem>
      </template>
    </BaseDropdown>
  </div>
</template>
