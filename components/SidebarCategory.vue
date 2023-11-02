<script setup lang="ts">
import { HeartIcon, RocketLaunchIcon } from '@heroicons/vue/24/solid';
</script>
<template>
  <div class="sidebar lg:sticky top-0 overflow-y-auto">
    <h2 class="text-[14px] font-medium px-4 mb-3">CATEGORY</h2>
    <input
      type="text"
      class="w-full h-8 rounded-[20px] bg-[#D9D9D9] px-4 text-[14px]"
    />
    <div class="my-3 categories">
      <NuxtLink>
        <SidebarCategoryItem
          :icon="RocketLaunchIcon"
          label="New"
          :count="302"
          :is-active="true"
        />
      </NuxtLink>
      <NuxtLink v-for="index in 20" :key="index">
        <SidebarCategoryItem :icon="HeartIcon" label="Popular" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  min-width: 172px;
  max-width: 172px;
}

@media screen and (max-width: 1024px) {
  .sidebar {
    width: 100%;
    max-width: unset;

    input {
      display: none;
    }

    .categories {
      display: flex;

      :deep(.category__item) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
