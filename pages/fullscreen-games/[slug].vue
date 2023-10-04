<script setup>
import { useUrlConfig } from "@/composables/useUrlConfig";

const { slug } = useRoute().params;
const { API_URL, BACKEND_URL } = useUrlConfig();

const { data: game } = await useFetch(() => `${API_URL}/game/${slug}`);

const changeSize = () => {
  try {
    const iframe = document.querySelector("#iframe");
    const iframeCanvas = iframe.contentWindow.document.querySelector("#unity-canvas");
    if (iframeCanvas) {
      console.log(iframeCanvas);
      var style = document.createElement("style");
      style.textContent = `
      body {
        width: 100%;
        height: 100%;
      }
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
      `;
      iframe.contentDocument.head.appendChild(style);
    }
  } catch (error) {
    console.log(error);
  }
};

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
});
</script>

<template>
  <iframe
    class="iframe-close"
    name="iframe"
    id="iframe"
    :src="`//localhost:8000/${game.source_link}`"
    scrolling="no"
    allowfullscreen
    frameborder="0"
    seamless="seamless"
  ></iframe>
  <button @click="changeSize">Reset</button>
</template>

<style lang="scss" scoped>
html,
body {
  padding: 0;
}

iframe {
  width: 100vw;
  height: 100vh;
}

:deep(canvas) {
  width: 100%;
  height: 100%;
}
</style>
