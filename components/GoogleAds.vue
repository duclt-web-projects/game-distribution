<template>
  <div class="google-ads">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-7005376515830838"
      data-ad-slot="3887972256"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
onMounted(() => {
  if (typeof window !== 'undefined') {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
});
</script>
