<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps(["itemChild"]);
const route = useRoute();

const emit = defineEmits(["setMatch"]);
onMounted(() => {
  if( route.fullPath === props.itemChild.path ) {
    emit('setMatch', true);
  }
})
</script>

<template>
  <RouterLink
    :to="itemChild.path"
    class="pl-11 flex items-center py-3 hover:bg-gray-700 text-gray-400 hover:text-white"
    :activeClass="'bg-gray-700'"
  >
    <span>{{ itemChild.name }}</span>
  </RouterLink>
</template>
