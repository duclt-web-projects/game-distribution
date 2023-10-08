<script setup lang="ts">
import UserLayout from "@/layouts/UserLayout.vue";

useHead({
  title: "Add New Game - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Register - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
});

definePageMeta({
  middleware: "auth-user",
});
</script>

<template>
  <UserLayout>
    <UserGameForm />
  </UserLayout>
</template>

<style scoped></style>
