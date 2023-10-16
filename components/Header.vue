<template>
  <nav>
    <div class="wrapper">
      <div class="menu-icon" @click="onOpenMenuMobile">
        <Bars3Icon v-show="!isShowMenuMobile" class="rotate" />
        <XMarkIcon v-show="isShowMenuMobile" class="rotate" />
      </div>
      <div v-show="isShowMenuMobile" class="mobile-navigation slide-right">
        <nuxt-link
          v-for="header in headersMobile"
          :key="header.id"
          :href="header.path"
        >
          {{ header.name }}
        </nuxt-link>
      </div>
      <div v-show="isShowMenuMobile" class="mask"></div>
      <nuxt-link
        href="/"
        aria-current="page"
        class="logo nuxt-link-exact-active nuxt-link-active"
        title="XGame"
      >
        <img
          src="/images/logos/logo-white.png"
          alt="logo"
          class="logo-icon-white"
        />
        <img src="/images/logos/logo.png" alt="logo" class="logo-icon" />
        <!-- <slot /> -->
      </nuxt-link>
      <div class="desktop-navigation">
        <template v-for="header in headers">
          <div
            v-if="header.children.length"
            :key="header.id"
            class="xg-button--has-dropdown"
          >
            <nuxt-link
              :to="header.path"
              class="xg-button"
              :class="route.path === header.path ? 'active' : ''"
            >
              {{ header.name }}
            </nuxt-link>
            <ul class="xg-button_dropdown">
              <li
                v-for="subHeader in header.children"
                :key="subHeader.id + 'sub'"
              >
                <nuxt-link :to="subHeader.path">
                  {{ subHeader.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div v-else :key="header.id + 'no-child'">
            <nuxt-link
              :to="header.path"
              class="xg-button"
              :class="route.path === header.path ? 'active' : '123'"
            >
              {{ header.name }}
            </nuxt-link>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { headers, headersMobile } from '@/config/header';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid';

const isShowMenuMobile = ref(false);
const route = useRoute();

const onOpenMenuMobile = () => {
  isShowMenuMobile.value = !isShowMenuMobile.value;
};
</script>

<style lang="scss" scoped>
nav {
  position: absolute;
  width: 100%;
  z-index: 2;

  .wrapper {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 4.318em;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1260px;
    padding: 0.556em 0.556em 0.556em 1.111em;
    position: relative;
    width: 100%;
  }

  .mask {
    background-color: rgba(0, 0, 0, 0.7);
    display: block;
    height: calc(100% - 4.167em);
    left: 0;
    position: fixed;
    top: 4.167em;
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 3;
  }

  .menu-icon {
    display: flex;
    align-items: center;

    svg {
      width: 30px;
      height: 30px;
      stroke: #512e85;
      transform: rotate(0deg);
      transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }

  .logo {
    height: 46px;
    margin: auto;
    margin-bottom: 20px;

    :deep(img) {
      height: auto;
      max-width: 120px;
    }
  }

  .desktop-navigation {
    display: none;
  }

  .mobile-navigation {
    height: calc(100% - 4.167em);
    left: 0;
    margin-top: 4.167em;
    padding: 1.111em 0;
    position: fixed;
    top: 0;
    width: 200px;
    z-index: 6;
    box-sizing: border-box;
    will-change: transform;

    a {
      box-sizing: border-box;
      will-change: transform;
      color: #fff;
      display: block;
      font-family: 'Squada One', cursive;
      font-size: 1em;
      font-weight: 500;
      height: 60px;
      line-height: 60px;
      padding: 0 1.111em;
      text-decoration: none;
      transition: transform 0.4s cubic-bezier(0.25, 0.75, 0.5, 1.25);

      &:hover {
        text-decoration: underline;
      }

      &.active,
      &:active {
        color: #ff8c1c;
      }
    }
  }
}

.about nav .menu-icon svg,
.error nav .menu-icon svg,
.home nav .menu-icon svg {
  fill: #b7f9ff;
}

.about nav .desktop-navigation a,
.error nav .desktop-navigation a,
.home nav .desktop-navigation a {
  color: #fff;
}

.home .logo-icon {
  display: none;
}

.games .logo-icon-white {
  display: none;
}

@media (min-width: 640px) {
  nav {
    font-size: 18px;

    .logo {
      &-full {
        display: block;
      }
    }
  }
}

@media (min-width: 1025px) {
  nav {
    .wrapper {
      padding: 0.556em 35px;
    }

    .menu-icon {
      display: none;
    }

    .desktop-navigation {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;

      a {
        background: transparent;
        border-bottom-color: transparent;
        color: #512e85;
        font-family: 'Squada One', cursive;
        font-size: 1.2rem;
        padding: 5px 16px;
        text-transform: capitalize;

        &:hover {
          background: #ff7f03;
          border-bottom-color: #ad131a;
          color: #fff;
        }

        &:active {
          box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.13);
          color: #fff;
          cursor: default;
          transform: translateY(-5px);
        }

        &.profile {
          background-color: #ff8c1c;
          border-bottom-color: #c4161e;
          color: #fff;

          &:hover {
            background: #ff9936;
            border-bottom-color: #db1922;
          }
        }
      }

      a.active,
      a:active:not(.xg-button--has-dropdown) {
        background: #44a5ab;
        border-bottom-color: #175d7a;
      }

      a.profile.active,
      a.profile:active {
        background: #ffa64f;
        border-bottom-color: #e7262f;
      }

      .rss-feed-link {
        fill: #fff;
        margin-bottom: -1px;
      }
    }

    .mobile-navigation {
      display: none;
    }
  }
}

@media (min-width: 1366px) {
  nav {
    font-size: 22px;
  }
}
</style>
