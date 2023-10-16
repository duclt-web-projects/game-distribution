<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <BarsOutlined v-if="props.icon === 'bars-outlined'" />
  <TrophyOutlined v-if="props.icon === 'trophy-outlined'" />
</template>

<style scoped></style>
