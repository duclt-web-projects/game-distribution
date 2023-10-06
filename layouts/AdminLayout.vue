<script setup lang="ts">
onMounted(() => {
  document.body.className = "";
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-200 font-roboto">
    <AdminSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
