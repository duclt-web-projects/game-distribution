<script setup>
import IconSearch from "@/assets/icon/Search.vue";
import IconArrowUpRightFromSquare from "@/assets/icon/ArrowUpRightFromSquare.vue";
import { API_ENDPOINT, BACKEND_ENDPOINT } from "@/config/constants";
import MainLayout from "~/layouts/MainLayout.vue";

const { slug } = useRoute().params;

useHead({
  title: `Publish ${slug} on your website - XGame Studio`,
  meta: [
    {
      name: "description",
      content:
        "Games Catalog of XGame Studio. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.",
    },
    { name: "ogTitle", content: "Games Catalog - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "Games Catalog of XGame Studio. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.",
    },
  ],
  bodyAttrs: {
    class: "games",
  },
});

const { data: game } = await useFetch(() => `${API_ENDPOINT}/games/${slug}`);
</script>

<template>
  <MainLayout>
    <section>
      <div class="wrapper">
        <div v-if="!game">Loading ...</div>
        <div v-else class="content">
          <div class="columns">
            <div class="column" style="flex: 1 1 0%"></div>
            <div class="column" style="flex: 3 1 0%">
              <div class="game-title">
                <h1>{{ game.name }}</h1>
              </div>
            </div>
            <div class="column" style="flex: 3 1 0%">
              <div class="tools-container">
                <div class="ais-index">
                  <form class="search-box__form">
                    <div class="input-group">
                      <IconSearch />
                      <input
                        type="search"
                        autocorrect="off"
                        autocapitalize="off"
                        autocomplete="off"
                        spellcheck="false"
                        placeholder="Search games..."
                        class="search-input-field"
                      />
                    </div>
                  </form>
                  <div
                    id="container"
                    style="background-color: rgb(255, 255, 255); overflow: auto; max-height: 500px; display: none"
                  >
                    <div class="games-container list-view-table"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="game-container" style="max-height: 1000px">
            <iframe
              class="iframe-close"
              name="iframe"
              id="iframe"
              :src="`${BACKEND_ENDPOINT}/${game.source_link}`"
              :width="game.width"
              :height="game.height"
            ></iframe>
          </div>
          <div class="columns">
            <div class="column">
              <div class="description-area">
                <p>
                  <i class="fa fa-exclamation-triangle" style="font-weight: bold">
                    IMPORTANT NOTIFICATION WHILE EMBEDDING GAMES</i
                  >
                </p>
                <p>
                  Ads should be requested from the game's page url to avoid loss of ads performance. To make this happen
                  please adjust your game frame request url as follows: gd_sdk_referrer_url should be added to the
                  request url . To do that please modify your request url as:
                </p>
                <p style="font-weight: bold">
                  CORRECT USAGE
                  <i class="fa fa-check"></i>
                </p>
                <p>
                  If your page url is
                  <i style="font-weight: bold">https://www.example.com/games</i>
                  then your request url should be as follows:
                  <i style="font-weight: bold">?gd_sdk_referrer_url=https://www.example.com/games/{game-path}</i>
                </p>
                <p>You can check example url below to see how we are using in this page.</p>
                <p style="font-weight: bold">
                  WRONG USAGE
                  <i class="fa fa-ban"></i>
                </p>
                <p><i style="font-weight: bold"> </i></p>
              </div>
              <div class="input-container input-location">
                <label class="label company">Example URL</label>
                <input type="text" readonly="readonly" />
                <a href="" target="_blank" class="xg-button">
                  Open
                  <i class="fa fa-external-link"></i
                ></a>
              </div>
              <div class="input-container input-embed">
                <label class="label">Embed</label>
                <input type="text" id="clipboard-content" readonly="readonly" />
                <span class="xg-button">
                  Copy
                  <i class="fa fa-copy"></i
                ></span>
              </div>
              <div class="input-container input-location">
                <a href="" target="_blank" class="xg-button" style="width: 100%">
                  Open Game In New Tab
                  <IconArrowUpRightFromSquare />
                </a>
              </div>
            </div>
            <div class="column">
              <GameDescription />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<style lang="scss" scoped>
.wrapper {
  width: auto;
}

.columns {
  flex-direction: row;

  .column {
    margin: 1.25rem;
    position: relative;

    .game-title {
      display: flex;
      justify-content: center;
    }
  }
}

.tools-container {
  form {
    flex: 1;
    margin-left: 0.9375rem;
    position: relative;

    svg {
      fill: #512e85;
      left: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-55%);
    }

    input {
      box-sizing: border-box;
      font-weight: 300;
      padding-left: 40px;
    }
  }
}

.game-container {
  border-radius: 2px;
  margin: 1.25rem 0;
  overflow: hidden;
  position: relative;
  width: 100%;

  &::before {
    content: "";
    display: block;
    padding-top: 56.25%;
    width: 100%;
  }

  & > .aspect-ratio {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  iframe {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 100%;
    max-width: 100%;
  }
}

.description-area {
  border: 0.5px solid #000;
  border-radius: 3px;
  color: #000;
  font-size: 15px;

  > p {
    margin: auto;
    padding: 5px 10px;
  }
}

.input-container {
  align-items: center;
  border-bottom: 1px solid #dedede;
  display: flex;
  padding: 0 0.9375rem 0.9375rem;

  input {
    display: none;

    &:focus {
      outline: none;
    }
  }

  label {
    display: none;
  }

  .xg-button {
    text-align: center;
    width: 100%;

    svg {
      fill: #fff;
    }
  }
}

.input-container.input-embed {
  display: none;
}

.catalog-games-container {
  padding-bottom: 1.25rem;

  h3 {
    border-bottom: 0;
    border-top: 1px solid #dedede;
    color: #44a5ab;
    font-size: 1.5rem;
    margin: 1.25rem 0;
    padding: 0.4rem 0.2rem;
    text-shadow: 0 0 0 transparent;

    &:first-of-type {
      margin-top: 0;
    }
  }

  > div {
    padding: 1.25rem 1.25rem 0;

    &:first-of-type {
      padding-top: 0;
    }
  }

  .games-container {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    margin: -0.9375rem -0.9375rem 0 0;

    .game {
      flex: 1;
    }

    .game.card {
      display: block;
      max-width: inherit;
      min-width: 150px;
    }
  }

  .button-container {
    box-sizing: border-box;
    padding: 1.25rem;
    text-align: center;
    width: 100%;
  }
}

@media (max-width: 540px) {
  .description-area {
    > p {
      display: none;
    }
  }
}

@media (min-width: 640px) {
  .tools-container {
    padding: 0 0 1.364rem;

    form {
      margin-left: 0.6818rem;
      max-width: 100%;
    }
  }

  .input-container {
    input {
      color: #000;
      display: inline-block;
      flex: 1;
      font-size: 1rem;
      margin: 0 0.6818rem;
      padding: 0.313rem 0.6818rem;
    }

    label {
      display: inline-block;
    }

    .xg-button {
      font-size: 0.75rem;
      height: 35px;
      line-height: 35px;
      padding-bottom: 0;
      padding-top: 0;
      width: auto;
    }
  }

  .input-container.input-location {
    border-bottom: 0;
  }

  .input-container.input-embed {
    display: flex;
  }

  .catalog-games-container {
    h3 {
      margin: 1.364rem 0;
    }

    > div {
      padding: 1.364rem 1.364rem 0;
    }

    .games-container {
      margin: -0.6818rem;
    }

    .button-container {
      padding: 1.364rem;
    }
  }
}

@media (min-width: 1025px) {
  .columns {
    display: flex;

    .column {
      flex: 1;
      margin: 1.364rem;

      &:last-of-type {
        margin: 1.364rem;
        max-width: 350px;
      }
    }
  }

  .game-container {
    margin: 1.364rem 0;
  }

  .input-container {
    border-top: 1px solid #dedede;
    padding: 0.6818rem;
  }
}

@media (min-width: 1490px) and (max-width: 1640px) {
  .catalog-games-container .games-container .game:nth-child(n + 7) {
    display: none;
  }
}
@media (min-width: 1025px) and (max-width: 1146px) {
  .catalog-games-container .games-container .game:nth-child(n + 7) {
    display: none;
  }
}
@media (min-width: 1320px) and (max-width: 1490px) {
  .catalog-games-container .games-container .game:nth-child(n + 6) {
    display: none;
  }
}
@media (min-width: 921px) and (max-width: 1025px) {
  .catalog-games-container .games-container .game:nth-child(n + 6) {
    display: none;
  }
}
@media (min-width: 1147px) and (max-width: 1319px) {
  .catalog-games-container .games-container .game:nth-child(n + 5) {
    display: none;
  }
}
</style>
