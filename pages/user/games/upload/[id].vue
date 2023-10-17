<script setup lang="ts">
import { IconUploadZip } from '@/assets/icon';
import { useHttp } from '@/composables/useHttp';
import { useUrlConfig } from '@/composables/useUrlConfig';
import { userGameUploadPageBreadcrumbs } from '@/config/breadcrumbs';
import UserLayout from '@/layouts/UserLayout.vue';
import { IGame } from '@/types/game';
import { ROUTE_NAMES } from '../../../../constants/routes';

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

const gameData = reactive({
  gameFile: '',
});
const errors = ref({
  gameFile: '',
});

const onUploadGameFile = (event) => {
  gameData.gameFile = event.target.files[0];
};

const validate = () => {
  errors.value = {
    gameFile: '',
  };

  if (!gameData.gameFile) {
    errors.value.gameFile = 'GameFile is required.';
  }

  if (errors.value.gameFile) return false;

  return true;
};

const handleAddNewGame = async () => {
  if (!validate()) return;

  const formData = new FormData();

  formData.append('gameFile', gameData.gameFile);

  const { data, error } = await useHttp(`/game/upload-game/${id}`, {
    method: 'POST',
    body: formData,
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Add game file successfully!!!');

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
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
          <FormLabel for="gameFile" :required="true"> Game File </FormLabel>

          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50"
          >
            <div class="flex flex-col items-center justify-center pt-4 pb-6">
              <IconUploadZip class="fill-gray-400 w-10 h-10 mb-2" />
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Click to upload
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
            v-if="errors.gameFile"
            id="game-error"
            class="mt-1 text-sm text-gray-500"
          >
            {{ errors.gameFile }}
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
