<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import { useSidebar } from "@/composables/useSidebar";

const { isOpen } = useSidebar();
</script>

<template>
  <a-layout-header style="background: #fff; padding: 0" class="header">
    <div class="flex justify-between">
      <div class="header__left px-5">
        <menu-unfold-outlined v-if="isOpen" class="trigger" @click="() => (isOpen = !isOpen)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (isOpen = !isOpen)" />
      </div>
      <div class="header__right">
        <div class="header__user mr-5">
          <a-dropdown>
            <a class="ant-dropdown-link flex items-center" @click.prevent>
              <a-avatar :size="32">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <span class="ml-2">Admin</span>
              <DownOutlined style="font-size: 8px;" class="ml-2"/>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">User Profile</a>
                </a-menu-item>
                <a-divider style="margin: 0;" />
                <a-menu-item>
                  <a href="javascript:;">Logout</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;

  .trigger {
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    background-color: #f5f5f5;
  }
}
</style>
