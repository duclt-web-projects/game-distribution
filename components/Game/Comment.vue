<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  comment: Object,
});

const { BACKEND_URL } = useUrlConfig();
</script>

<template>
  <div v-if="comment" class="flex">
    <div class="user w-10 h-10 mr-4">
      <img
        v-if="comment.user && comment.user.avatar"
        class="rounded-full shadow object-contain"
        :src="BACKEND_URL + comment.user.avatar"
        alt=""
      />
      <UserCircleIcon v-else class="w-10 h-10 fill-gray-400" />
    </div>
    <div class="comment grow">
      <p class="font-medium">{{ comment.user?.name }}</p>
      <GameRatingStar :rating="comment.rating" />
      <p class="text-xs text-gray-400 mb-3">
        {{ convertStringToDate(comment.updated_at) }}
      </p>
      <p class="p-4 bg-gray-200 w-full rounded text-[14px]">
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
