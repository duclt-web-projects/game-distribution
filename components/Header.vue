<template>
  <nav>
    <div class="wrapper">
      <div class="menu-icon" @click="onOpenMenuMobile">
        <IconMenuBurger v-show="!isShowMenuMobile" class="rotate" />
        <IconTime v-show="isShowMenuMobile" class="rotate" />
      </div>
      <div class="mobile-navigation slide-right" v-show="isShowMenuMobile">
        <NuxtLink href="/games" class=""> Games </NuxtLink>
        <NuxtLink href="/solutions/white-label" class=""> White Label Solution </NuxtLink>
        <NuxtLink href="/about" class=""> About </NuxtLink>
        <NuxtLink href="/publishers" class=""> Publishers </NuxtLink>
        <NuxtLink href="/developers" class=""> Developers </NuxtLink>
        <NuxtLink href="/sdk" class=""> SDK </NuxtLink>
        <NuxtLink href="https://gamedistribution.com/contact"> Contact Us </NuxtLink>
        <NuxtLink href="https://faq.gamedistribution.com"> FAQ </NuxtLink>
        <NuxtLink href="https://developer.gamedistribution.com/register/publisher/" target="_blank"> Join us </NuxtLink>
        <NuxtLink href="https://reports.gamedistribution.com/" target="_blank"> Publisher Login </NuxtLink>
        <NuxtLink href="https://developer.gamedistribution.com/" target="_blank"> Developer Login </NuxtLink>
      </div>
      <div class="mask" v-show="isShowMenuMobile"></div>
      <NuxtLink
        href="/"
        aria-current="page"
        class="logo nuxt-link-exact-active nuxt-link-active"
        title="GameDistribution"
      >
        <img src="/images/logos/logo-mark-white.svg" alt="logo" class="logo-mark" />
        <img src="/images/logos/logo-white.svg" alt="logo" class="logo-full" />
      </NuxtLink>
      <div class="desktop-navigation">
        <NuxtLink to="/games" class="gd-button"> Games </NuxtLink>
        <NuxtLink to="/solutions/white-label" class="gd-button"> Products for Publishers </NuxtLink>
        <NuxtLink to="/about" class="gd-button"> About </NuxtLink>
        <NuxtLink to="/publishers" class="gd-button"> Publishers </NuxtLink>
        <NuxtLink to="/developers" class="gd-button gd-button--has-dropdown">
          Developers
          <ul class="gd-button_dropdown">
            <li><NuxtLink to="/sdk" class=""> SDK </NuxtLink></li>
          </ul>
        </NuxtLink>
        <a target="_blank" class="gd-button gd-button--has-dropdown">
          Support
          <ul class="gd-button_dropdown">
            <li><NuxtLink to="/contact" class=""> Contact Us </NuxtLink></li>
            <li><NuxtLink to="https://faq.gamedistribution.com"> FAQ </NuxtLink></li>
          </ul>
        </a>
        <NuxtLink to="https://developer.gamedistribution.com/register/publisher/" class="gd-button"> Join us </NuxtLink>
        <a to="https://developer.gamedistribution.com/" target="_blank" class="gd-button gd-button--has-dropdown">
          Login
          <ul class="gd-button_dropdown">
            <li>
              <NuxtLink to="https://developer.gamedistribution.com/" target="_blank">Developer login</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://reports.gamedistribution.com/" target="_blank">Publisher login</NuxtLink>
            </li>
          </ul>
        </a>
        <NuxtLink to="/rss-builder" class="gd-button rss-feed-link"> RSS </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import IconMenuBurger from "@/assets/icon/MenuBurger.vue";
import IconTime from "@/assets/icon/Time.vue";

const isShowMenuMobile = ref(false);

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
      fill: #b7f9ff;
      transform: rotate(0deg);
      transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }

  .logo {
    height: 46px;
    margin: auto;

    img {
      display: none;
      height: auto;
      max-width: 216px;
    }
    .logo-mark {
      display: block;
      margin-top: 4px;
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
      font-family: "Squada One", cursive;
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
@media (min-width: 640px) {
  nav {
    font-size: 18px;

    .logo {
      .logo-mark {
        display: none;
      }
      .logo-full {
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
      svg {
        display: none;
      }
    }

    .logo {
      margin: initial;
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
        font-family: "Squada One", cursive;
        font-size: 0.864em;
        padding: 0.273em 0.818em;
        text-transform: capitalize;

        &:hover {
          background: #ff7f03;
          border-bottom-color: #ad131a;
          color: #fff;
        }

        &:active {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.13);
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
      a:active:not(.gd-button--has-dropdown) {
        background: #44a5ab;
        border-bottom-color: #175d7a;
      }

      a.profile.active,
      a.profile:active {
        background: #ffa64f;
        border-bottom-color: #e7262f;
      }
    }

    .mobile-navigation {
      /* display: none; */
    }
  }
}
@media (min-width: 1366px) {
  nav {
    font-size: 22px;
  }
}
</style>
