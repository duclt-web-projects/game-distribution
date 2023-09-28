<script setup lang="ts">
import { useUrlConfig } from "@/composables/useUrlConfig";
import UserLayout from "@/layouts/UserLayout.vue";

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
  middleware: "auth",
});

const { API_URL } = useUrlConfig();
const { id } = useRoute().params;

const { data: game } = await useFetch(() => `${API_URL}/games/${id}`);
</script>

<template>
  <UserLayout>
    <Loading v-if="!game" />
    <UserForm v-else :game="game" />
  </UserLayout>
</template>

<style scoped></style>
