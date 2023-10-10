<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";
import { ref } from "vue";

const props = defineProps({
  menuData: Object,
});
const route = useRoute();

const selectedKeys = ref<string[]>([route.path]);
const openKeys = computed(() => {
  const menu = props.menuData?.find((e) => {
    if (e.child.length) {
      return e.child.find((subMenu) => {
        return subMenu.path === route.path;
      });
    }
  });
  return menu ? [menu.id] : [];
});
const { isOpen } = useSidebar();
</script>

<template>
  <a-layout-sider class="sidebar" :trigger="null" v-model:collapsed="isOpen" collapsible width="240px">
    <div class="logo">
      <img src="/images/logos/logo-white.png" alt="">
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      theme="dark"
      mode="inline"
      class="sidebar-menu"
    >
      <template v-for="menu in props.menuData">
        <a-sub-menu v-if="menu.child.length" :key="menu.id">
          <template #title>
            <span class="flex items-center">
              <CustomIcon :icon="menu.icon" />
              <span>{{ menu.name }}</span>
            </span>
          </template>
          <a-menu-item v-for="subMenu in menu.child" :key="subMenu.path">
            <NuxtLink :to="subMenu.path">{{ subMenu.name }}</NuxtLink>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="'sub-' + menu.id">
          <NuxtLink :to="menu.path">{{ menu.name }}</NuxtLink>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  overflow-y: hidden;

  .logo {
    position: sticky;
    top: 0;
    height: 64px;
    display: flex;
    justify-content: center;
    padding: 16px 0;

    img {
      height: 100%;
      width: auto;
    }
  }

  &-menu {
    height: calc(100% - 64px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #999;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #777;
    }
  }

  :deep(svg) {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
}
</style>
