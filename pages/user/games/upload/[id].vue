<script setup lang="ts">
import { IconUploadZip } from '@/assets/icon';
import { useHttp } from '@/composables/useHttp';
import { useUrlConfig } from '@/composables/useUrlConfig';
import { userGameUploadPageBreadcrumbs } from '@/config/breadcrumbs';
import UserLayout from '@/layouts/UserLayout.vue';
import { IGame } from '@/types/game';
import axios from 'axios';

useHead({
  title: 'Upload Game File - XGame Studio',
  meta: [
    {
      name: 'description',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
    { name: 'ogTitle', content: 'Register - XGame Studio' },
    {
      name: 'ogDescription',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
  ],
});

definePageMeta({
  middleware: 'auth-user',
});

const { API_URL } = useUrlConfig();
const { id } = useRoute().params;
const { $toast } = useNuxtApp();

const { data: game } = await useHttp<IGame>(() => `${API_URL}/game/${id}`);

const gameFile = ref();
const gameError = ref('');
const progress = ref(0);

const onUploadGameFile = (event) => {
  gameFile.value = event.target.files[0];
};

const validate = () => {
  gameError.value = '';

  if (!gameFile.value) {
    gameError.value = 'GameFile is required.';
  }

  if (gameError.value) return false;

  return true;
};

const handleAddNewGame = async () => {
  if (!validate()) return;

  const formData = new FormData();
  const token = useCookie('access_token');

  formData.append('gameFile', gameFile.value);

  const { data, status } = await axios.post(
    `${API_URL}/game/upload-game/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          progress.value = percentCompleted;
        }
      },
    },
  );

  if (status !== 200) {
    $toast.error(data.message);
    return;
  }

  if (data.value) {
    $toast.success('Add game file successfully!!!');

    setTimeout(() => {
      // navigateTo(ROUTE_NAMES.USER_GAME);
    }, 500);
  }
};
</script>

<template>
  <UserLayout>
    <DashboardHeading
      title="Upload game file"
      :breadcrumbs="userGameUploadPageBreadcrumbs"
    />
    <user-game :is-loading="!game">
      <form @submit.prevent="handleAddNewGame">
        <div class="px-4 py-5 sm:p-6">
          <div
            v-show="progress > 0"
            class="flex-start flex mt-5 h-4 w-full overflow-hidden rounded bg-gray-200 font-sans text-xs font-medium"
          >
            <div
              class="flex h-full items-baseline justify-center overflow-hidden text-[10px] break-all bg-emerald-500 text-white transition-all"
              :style="`width: ${progress}%`"
            >
              {{ progress }}% Completed
            </div>
          </div>
          <FormLabel for="gameFile" :required="true"> Game File </FormLabel>

          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50"
          >
            <div class="flex flex-col items-center justify-center pt-4 pb-6">
              <IconUploadZip class="fill-gray-400 w-10 h-10 mb-2" />
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ gameFile ? gameFile.name : 'Click to upload' }}
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="onUploadGameFile($event)"
            />
          </label>
          <FormHelperMessage
            v-if="gameError"
            id="game-error"
            class="mt-1 text-sm text-gray-500"
          >
            {{ gameError }}
          </FormHelperMessage>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </user-game>
  </UserLayout>
</template>

<style scoped></style>
