<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue';
definePageMeta({
  middleware: ['auth-admin'],
});
</script>

<template>
  <AdminLayout></AdminLayout>
</template>
