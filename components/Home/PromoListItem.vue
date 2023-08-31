<template>
  <div class="promo-list-item">
    <div class="promo-image">
      <div class="image is-4by3">
        <img src="https://img.gamedistribution.com/1d9e7e2883e144d293c0894e230b5441-512x384.jpg" alt="Mob Control" />
      </div>
    </div>
    <div class="promo-info">
      <h4>
        <a href="/games/mob-control" class="" title="Mob Control">Mob Control</a>
      </h4>
      <small>
        By
        <a href="/games?company=VOODOO" class="" title="VOODOO">VOODOO</a></small>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.promo-list-item {
  background-color: hsla(0, 0%, 88%, 0.3);
  cursor: pointer;
  display: flex;
  margin: 0 0 10px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: linear-gradient(90deg, #3d1b5d, #5c3997);
    transform: translateX(10px);

    a {
      color: #ff3a56;
    }

    .promo-info {
      small {
        a {
          color: #fc8f28;
        }
      }
    }
  }

  &:active {
    background: linear-gradient(90deg, #1b3786, #24b3c0);

    a {
      color: #24f6fd;
    }
  }

  &:nth-child(odd) {
    background-color: hsla(0, 0%, 88%, 0.3);
  }

  &>div {
    flex: 1;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  .promo-image {
    max-width: 94px;
    position: relative;

    &>div {
      overflow: hidden;
    }
  }

  .promo-info {
    line-height: 100%;
    padding-left: 20px;
    transition: 0.1s ease-in-out;

    h4 {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: block;
      display: -webkit-box;
      font-size: 22px;
      letter-spacing: 2px;
      overflow: hidden;
      padding: 0;
      text-overflow: ellipsis;
      text-shadow: none;
    }

    small {
      display: inline-block;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 500;
      max-width: 135px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
      width: auto;

      a {
        color: #000;
      }
    }
  }
}
</style>