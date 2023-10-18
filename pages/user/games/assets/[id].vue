<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import { useUrlConfig } from '@/composables/useUrlConfig';
import { userGameAssetsPageBreadcrumbs } from '@/config/breadcrumbs';
import { ROUTE_NAMES } from '@/constants/routes';
import UserLayout from '@/layouts/UserLayout.vue';
import { IGame } from '@/types/game';

useHead({
  title: 'Edit Game - XGame Studio',
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
  thumbnail: '',
  images: [],
});
const errors = ref({
  thumbnail: '',
});
const urlPreview = ref('/images/no-image.png');

onMounted(() => {
  if (game.value) {
    gameData.thumbnail = game.value.thumbnail;
  }
});

const onUploadThumbnail = (event) => {
  gameData.thumbnail = event.target.files[0];
  urlPreview.value = URL.createObjectURL(event.target.files[0]);
};

const validate = () => {
  errors.value = {
    thumbnail: '',
  };

  if (!gameData.thumbnail) {
    errors.value.thumbnail = 'Thumbnail is required.';
  }

  if (errors.value.thumbnail) return false;

  return true;
};

const handleAddNewGame = async () => {
  if (!validate()) return;

  const formData = new FormData();

  formData.append('thumbnail', gameData.thumbnail);

  const { data, error } = await useHttp(`/game/upload-thumbnail/${id}`, {
    method: 'POST',
    body: formData,
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Add assets successfully!!!');

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
    }, 1000);
  }
};
</script>

<template>
  <UserLayout>
    <DashboardHeading
      title="Upload assets"
      :breadcrumbs="userGameAssetsPageBreadcrumbs"
    />
    <user-game :is-loading="!game">
      <form @submit.prevent="handleAddNewGame">
        <div class="px-4 py-5 sm:p-6">
          <FormField
            class="mb-3"
            label="Thumbnail"
            required
            :error="errors.thumbnail"
          >
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input
                type="file"
                class="block mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:h-10 file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600"
                @change="onUploadThumbnail($event)"
              />
            </label>
            <div
              class="preview-image h-64 w-full border-1 border-gray-200 border mt-4"
            >
              <img
                class="object-contain w-full h-full"
                :src="urlPreview"
                alt=""
              />
            </div>
          </FormField>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <base-button intent="success" type="submit"> Save </base-button>
        </div>
      </form>
    </user-game>
  </UserLayout>
</template>

<style scoped></style>
