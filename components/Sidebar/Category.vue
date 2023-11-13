<script setup lang="ts">
import { ICategory } from '@/types/game';

const props = defineProps({
  currentCategory: String,
});

const { data: categories } = await useHttp<ICategory[]>('/categories');
const searchCategories = ref<ICategory[]>([]);
const searchCategoryText = ref('');
const height = ref('calc(100vh - 24px)');

if (categories.value) {
  searchCategories.value = categories.value;
}

watch(searchCategoryText, () => {
  const filter = categories.value?.filter((category) => {
    return category.name
      .toLocaleLowerCase()
      .includes(searchCategoryText.value.toLocaleLowerCase());
  });
  if (filter) {
    searchCategories.value = filter;
  }
});

const handleScroll = () => {
  if (document.body.offsetWidth <= 1024) return;

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    height.value = 'calc(100vh - 224px)';
  } else {
    height.value = 'calc(100vh - 24px)';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <div
    class="sidebar relative lg:sticky top-0 overflow-y-auto"
    :style="{ height }"
  >
    <h2 class="text-[14px] font-medium px-4 mb-3 uppercase">
      {{ $t('category') }}
    </h2>
    <div class="my-3 categories">
      <NuxtLink
        v-for="category in searchCategories"
        :key="category.id"
        :to="`/category/${category.slug}`"
      >
        <SidebarCategoryItem
          :icon="category.icon"
          :label="category.name"
          :is-active="currentCategory === category.slug"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  min-width: 172px;
  max-width: 172px;
  max-height: calc(100vh - 24px);
}

@media screen and (max-width: 1024px) {
  .sidebar {
    width: 100%;
    max-width: unset;
    height: unset !important;
    overflow-x: auto;

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

@media screen and (min-width: 1024px) {
  .sidebar {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
