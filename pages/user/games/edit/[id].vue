<script setup lang="ts">
import UserLayout from "@/layouts/UserLayout.vue";
import { API_ENDPOINT } from "~/constants";

useHead({
  title: "Edit Game - XGame Studio",
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
  // middleware: "auth",
});

const { id } = useRoute().params;

const { data: game } = await useFetch(() => `${API_ENDPOINT}/games/${id}`);
</script>

<template>
  <UserLayout>
    <Loading v-if="!game"/>
    <UserForm v-else :game="game"/>
  </UserLayout>
</template>

<style scoped></style>
