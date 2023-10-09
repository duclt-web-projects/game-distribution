<script lang="ts" setup>
import { ArrowDown, Document, Fold, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";

const isCollapse = ref(false);
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#343c49"
        default-active="2"
        text-color="#fff"
        class="sidebar"
        :collapse="isCollapse"
      >
        <el-menu-item index="2" class="logo">
          <div class="logo-container">
            <img v-if="isCollapse" src="images/logos/favicon.png" alt="" style="height: 24px" />
            <img v-else src="images/logos/logo-white.png" alt="" />
          </div>
        </el-menu-item>

        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
      <el-container>
        <el-header class="header">
          <div class="flex">
            <div class="toggle-sidebar" @click="isCollapse = !isCollapse">
              <el-icon size="24px"><Fold /></el-icon>
            </div>
            <div class="flex-grow"></div>
            <el-dropdown>
              <div class="el-dropdown-link">
                <el-avatar
                  class="mr-3"
                  :size="32"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <el-icon class="el-icon--right" color="#fff">
                  <arrow-down />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-divider) {
  margin: 0;
}

.sidebar {
  height: 100vh;
  overflow-y: auto;
  border-right: none;

  /* width */
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

  .logo {
    padding: 0 !important;
    height: 70px;

    &-container {
      height: 70px;
      width: 240px;
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #343c49;
      border-bottom: 1px solid #999;

      img {
        height: 100%;
        width: auto;
      }
    }
  }
}

.header {
  padding: 0;
  height: 70px;
  background-color: #64c5b1;
  color: #fff;

  .toggle-sidebar {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #56a797;
    }
  }
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  padding: 0 32px;
  outline: none;
}
</style>
