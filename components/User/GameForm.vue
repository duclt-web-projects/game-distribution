<script setup lang="ts">
import { IconUploadZip } from '@/assets/icon';
import { useHttp } from '@/composables/useHttp';
import { ROUTE_NAMES } from '@/constants/routes';
import { IOptions } from '@/types/common';
import { ICategory } from '@/types/game';

const props = defineProps({
  game: {
    type: Object,
    default: null,
  },
});

const { $toast } = useNuxtApp();

const gameData = reactive({
  name: '',
  category: [],
  description: '',
  width: '',
  height: '',
  thumbnail: '',
  gameFile: '',
});
const isCreating = ref(false);
const errors = ref({
  name: '',
  description: '',
  category: '',
  thumbnail: '',
  gameFile: '',
  width: '',
  height: '',
});
const urlPreview = ref('/images/no-image.png');

const loadCategories = async (query, setOptions) => {
  const { data: categories } = await useHttp<ICategory[]>(
    `categories?name=${query}`,
  );
  const categoryOptions = categories.value?.map((cate) => {
    return {
      value: cate.id,
      label: cate.name,
    };
  });
  setOptions(categoryOptions);
};

onMounted(() => {
  if (props.game) {
    gameData.name = props.game.name;
    gameData.width = props.game.width;
    gameData.height = props.game.height;
    gameData.description = props.game.description;
  }
});

const onUploadThumbnail = (event) => {
  gameData.thumbnail = event.target.files[0];
  urlPreview.value = URL.createObjectURL(event.target.files[0]);
};

const onUploadGameFile = (event) => {
  gameData.gameFile = event.target.files[0];
};

const validate = () => {
  errors.value = {
    name: '',
    description: '',
    category: '',
    thumbnail: '',
    gameFile: '',
    width: '',
    height: '',
  };

  if (!gameData.name) {
    errors.value.name = 'Name is required.';
  }

  if (!gameData.width) {
    errors.value.width = 'Width is required.';
  }

  if (!gameData.height) {
    errors.value.height = 'Height is required.';
  }

  if (!props.game) {
    if (!gameData.thumbnail) {
      errors.value.thumbnail = 'Thumbnail is required.';
    }

    if (!gameData.gameFile) {
      errors.value.gameFile = 'Game file is required.';
    }

    if (!gameData.category.length) {
      errors.value.category = 'Category is required.';
    }
  }

  if (
    errors.value.name ||
    errors.value.width ||
    errors.value.height ||
    errors.value.thumbnail ||
    errors.value.gameFile
  )
    return false;

  return true;
};

const handleAddNewGame = async () => {
  if (!validate()) return;
  isCreating.value = true;

  const formData = new FormData();

  if (!props.game) {
    formData.append('thumbnail', gameData.thumbnail);
    formData.append('gameFile', gameData.gameFile);

    const categoryIds = gameData.category.map((cate: IOptions) => cate.value);
    formData.append('category', JSON.stringify(categoryIds));
  }

  formData.append('name', gameData.name);
  formData.append('description', gameData.description);
  formData.append('width', gameData.width + '');
  formData.append('height', gameData.height + '');

  const { data, error } = props.game
    ? await useHttp(`/game/edit/${props.game.id}`, {
        method: 'POST',
        body: formData,
      })
    : await useHttp('/game/store', { method: 'POST', body: formData });

  isCreating.value = false;

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Add successfully!!!');

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
    }, 500);
  }
};
</script>

<template>
  <Breadcrumb />
  <h2 class="text-xl font-semibold text-gray-700 capitalize mb-5">
    {{ game ? 'Edit game' : 'Add new game' }}
  </h2>
  <form @submit.prevent="handleAddNewGame">
    <div class="shadow rounded overflow-hidden">
      <div class="bg-white px-4 py-5 sm:p-6">
        <div class="grid grid-cols-6 gap-1 md:gap-5">
          <div class="col-span-6 sm:col-span-3">
            <FormField label="Game Name" :error="errors.name" required>
              <FormInput
                v-model="gameData.name"
                placeholder="John Doe"
                type="text"
              />
            </FormField>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <FormField
              label="Category"
              :error="errors.category"
              required
              disable
            >
              <FormCombobox
                v-model="gameData.category"
                placeholder="Search category..."
                multiple
                :load-options="loadCategories"
              />
            </FormField>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <FormField label="Width" :error="errors.width" required>
              <FormInput
                v-model="gameData.width"
                placeholder="John Doe"
                type="text"
                class-name="rounded-l"
              >
                <span
                  class="h-10 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-200 border border-r-0 rounded-r"
                >
                  px
                </span>
              </FormInput>
            </FormField>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <FormField label="Height" :error="errors.height" required>
              <FormInput
                v-model="gameData.height"
                placeholder="John Doe"
                type="text"
                class-name="rounded-l"
              >
                <span
                  class="h-10 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-200 border border-r-0 rounded-r"
                >
                  px
                </span>
              </FormInput>
            </FormField>
          </div>

          <div class="col-span-6">
            <FormField class="col-span-2">
              <FormLabel for="message" :required="false">Description</FormLabel>
              <FormTextArea
                v-model="gameData.description"
                placeholder="John Doe"
                type="text"
              />
            </FormField>
          </div>

          <div class="col-span-6">
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
          <div class="col-span-6">
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
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
h2 {
  font-family: 'Roboto', sans-serif;
}

:deep(.multiselect-tags-search) {
  height: 0;
  border: none;
}

:deep(.spinner) {
  width: 16px;
  height: 16px;
  border-width: 2px;
}
</style>
