<script setup lang="ts">
import UserLayout from "@/layouts/UserLayout.vue";
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <UserLayout>
    <UserForm />
  </UserLayout>
</template>

<style scoped></style>
