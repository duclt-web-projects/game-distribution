<script setup lang="ts">
import { useUrlConfig } from '@/composables/useUrlConfig';

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  image: {
    type: String,
    default: '',
  },
});

const { BACKEND_URL } = useUrlConfig();

const isPlay = ref(false);
</script>

<template>
  <div
    v-show="!isPlay"
    id="game-overlay"
    :style="{
      width: width,
      height: height,
    }"
  >
    <div class="h-100 d-flex align-items-center">
      <div class="mh-100 w-100 overflow-auto p-2">
        <div
          class="container p-0 rounded overflow-hidden"
          style="
            max-width: 320px;
            box-shadow:
              rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
              rgba(0, 0, 0, 0.12) 0px 2px 1px -1px,
              rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
          "
        >
          <div style="background-color: rgb(48, 48, 48)">
            <div class="fullscreen-container">
              <div id="fullscreen-abstract" class="fullscreen-abstract"></div>
              <div
                id="fullscreen-slot-top"
                class="fullscreen-top"
                style="display: none"
              ></div>
              <div class="fullscreen-center">
                <div
                  id="fullscreen-slot-left"
                  class="fullscreen-left"
                  style="display: none"
                ></div>
                <div id="fullscreen-game" class="fullscreen-game">
                  <div class="fullscreen-game-metadata">
                    <div class="fullscreen-game-thumbnail-play">
                      <div class="fullscreen-game-thumbnail">
                        <img
                          :src="
                            image
                              ? `${BACKEND_URL}${image}`
                              : '/images/no-image-dashboard.jpg'
                          "
                          alt=""
                        />
                      </div>
                      <div class="fullscreen-game-play">
                        <button
                          id="fullscreen-button"
                          style="display: block; text-transform: uppercase"
                          @click="isPlay = true"
                        >
                          {{ $t('play') }}
                        </button>
                        <div class="pluto-loader" style="display: none">
                          Loading...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="fullscreen-slot-right"
                  class="fullscreen-right"
                  style="display: none"
                ></div>
              </div>
              <div
                id="fullscreen-slot-bottom"
                class="fullscreen-bottom"
                style="display: none"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#game-overlay {
  z-index: 10;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%);
}
.fullscreen-container {
  display: flex;
  flex-direction: column;
  font-family: Helvetica, Arial, sans-serif;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) 0 0/300%
    300%;
  animation: pluto-gradient 60s ease 0s infinite normal none running;
}
.fullscreen-abstract,
.fullscreen-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.fullscreen-top {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.fullscreen-center {
  display: flex;
  flex-grow: 1;
  position: relative;
  flex-basis: 100%;
  overflow: hidden;
}
.fullscreen-bottom {
  width: 100%;
}
.fullscreen-bottom,
.fullscreen-left {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.fullscreen-game {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  flex-basis: 100%;
}
.fullscreen-right {
  align-items: center;
}
.fullscreen-game-metadata,
.fullscreen-right {
  display: flex;
  position: relative;
  justify-content: center;
}
.fullscreen-game-metadata {
  flex-direction: column;
  flex-grow: 1;
}
.fullscreen-game-consent {
  display: flex;
  justify-content: center;
  margin: 0 5em;
}
.fullscreen-game-consent > p {
  text-align: justify;
  font-size: 12px;
  font-family: Arial;
  font-weight: 400;
  max-width: 300px;
}
.fullscreen-game-consent > p > a {
  color: #fff;
}
.fullscreen-game-thumbnail-play {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fullscreen-game-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 14px;
  color: #fff;
}
.fullscreen-game-thumbnail {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  margin: 4px;
  width: 150px;
  height: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
}
.fullscreen-game-play {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 6px;
}
.fullscreen-game-description {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 4px;
  text-align: justify;
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
}
.fullscreen-game-title > p {
  max-width: 300px;
  padding: 8px 24px;
  text-transform: uppercase;
  text-align: center;
  box-sizing: border-box;
}
.fullscreen-game-description > p {
  max-width: 300px;
  overflow: auto;
  max-height: 200px;
}
.fullscreen-game-thumbnail > div {
  width: 150px;
  height: 150px;
  border-radius: 4px;
  background-position: 50%;
  background-size: cover;
  box-shadow: 0 1px 2px transparent;
  border: 2px solid hsla(0, 0%, 100%, 0.9);
}
.fullscreen-game-play > button {
  padding: 8px;
  border-radius: 6px;
  border: 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 1px 2px transparent;
  width: 150px;
  background-color: hsla(0, 0%, 100%, 0.9);
}
.pluto-loader,
.pluto-loader:after {
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
}
.pluto-loader {
  box-sizing: content-box;
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border: 1.1em solid hsla(0, 0%, 100%, 0.2);
  border-left-color: #fff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s linear infinite;
  animation: load8 1.1s linear infinite;
  display: none;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@media screen and (max-height: 600px) {
  .fullscreen-game-description {
    display: none;
  }
  .fullscreen-game-thumbnail > div {
    max-width: 150px;
    max-height: 150px;
  }
}
@media screen and (min-width: 600px) {
  .fullscreen-center > .fullscreen-left,
  .fullscreen-center > .fullscreen-right {
    display: flex;
  }
  .fullscreen-game-consent > p,
  .fullscreen-game-description > p,
  .fullscreen-game-title > p {
    max-width: 600px;
  }
}
@media screen and (min-height: 600px) {
  .fullscreen-container > .fullscreen-bottom,
  .fullscreen-container > .fullscreen-top {
    display: flex;
  }
}
@keyframes pluto-gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  to {
    background-position: 0 50%;
  }
}
</style>
