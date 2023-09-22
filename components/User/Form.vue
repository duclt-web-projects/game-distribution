<script setup lang="ts">
import { IconPlush } from "@/assets/icon";
import { useAxios } from "@/composables/useAxios";
import { ROUTE_NAMES } from '../../constants/commons';

const props = defineProps({
  game: {
    type: Object,
    default: null,
  },
});

const $axios = useAxios();

const name = ref("");
const description = ref("");
const gameWidth = ref(0);
const gameHeight = ref(0);
const thumbnail = ref("");
const gameFile = ref("");
const isCreating = ref(false);
const errors = ref({
  name: "",
  description: "",
  thumbnail: "",
  gameFile: "",
  width: "",
  height: "",
});

onMounted(() => {
  if (props.game) {
    name.value = props.game.name;
    gameWidth.value = props.game.width;
    gameHeight.value = props.game.height;
    description.value = props.game.description;
  }
});

const onUploadThumbnail = (event) => {
  thumbnail.value = event.target.files[0];
};

const onUploadGameFile = (event) => {
  gameFile.value = event.target.files[0];
};

const handleAddNewGame = async () => {
  if (!validate()) return;
  isCreating.value = true;

  let data = new FormData();

  if (!props.game) {
    data.append("thumbnail", thumbnail.value);
    data.append("gameFile", gameFile.value);
  }
  data.append("name", name.value);
  data.append("description", description.value);
  data.append("width", gameWidth.value + "");
  data.append("height", gameHeight.value + "");

  const response = props.game
    ? await $axios.post(`/games/edit/${props.game.id}`, data)
    : await $axios.post("/games/store", data);

  isCreating.value = false;

  if (response) {
    navigateTo(ROUTE_NAMES.USER_GAME);
  }
};

const validate = () => {
  errors.value = {
    name: "",
    description: "",
    thumbnail: "",
    gameFile: "",
    width: "",
    height: "",
  };

  if (!name.value) {
    errors.value.name = "Name is required.";
  }

  if (!gameWidth.value) {
    errors.value.width = "Width is required.";
  }

  if (!gameHeight.value) {
    errors.value.height = "Height is required.";
  }

  if (!props.game) {
    if (!thumbnail.value) {
      errors.value.thumbnail = "Thumbnail is required.";
    }

    if (!gameFile.value) {
      errors.value.gameFile = "Game file is required.";
    }
  }

  if (errors.value.name || errors.value.width || errors.value.height || errors.value.thumbnail || errors.value.gameFile)
    return false;

  return true;
};
</script>

<template>
  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <h2 class="text-lg font-semibold text-gray-700 capitalize">Add new game</h2>

      <form @submit.prevent="handleAddNewGame">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <InputText label="Game name" id="name" v-model:input="name" inputType="text" :error="errors.name" />

          <div class="mb-3">
            <span for="message" class="block text-sm font-medium leading-6 text-gray-900">Thumbnail</span>
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input
                type="file"
                class="block mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:h-10 file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600"
                @change="onUploadThumbnail($event)"
              />
            </label>
            <span v-if="errors.thumbnail" class="error"> {{ errors.thumbnail }}</span>
          </div>

          <InputText label="Width" id="width" v-model:input="gameWidth" inputType="text" :error="errors.width">
            <span
              class="h-10 mt-2 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-300 border border-r-0 border-gray-300"
            >
              px
            </span>
          </InputText>

          <InputText label="Height" id="height" v-model:input="gameHeight" inputType="text" :error="errors.height">
            <span
              class="h-10 mt-2 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-300 border border-r-0 border-gray-300"
            >
              px
            </span>
          </InputText>

          <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 border border-gray-300"
              placeholder="Write your thoughts here..."
              v-model="description"
            ></textarea>
          </div>

          <div class="">
            <span for="message" class="block mb-2 text-sm font-medium text-gray-900">Game file</span>

            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" @change="onUploadGameFile($event)" />
            </label>
            <span v-if="errors.gameFile" class="error"> {{ errors.gameFile }}</span>
          </div>
        </div>
        <button
          class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white bg-emerald-600 border border-emerald-700 hover:bg-emerald-700"
        >
          <div class="mr-1">
            <Spinner v-if="isCreating" />
            <IconPlush v-else class="mr-1 fill-white" />
          </div>
          Add game
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-family: "Roboto", sans-serif;
}

input,
select {
  height: 40px;
  background-color: #fff;
  border: 1px solid #dadada;
}

:deep(.multiselect-tags-search) {
  height: 0;
  border: none;
}

:deep(.form-input) {
  input {
    height: 40px;
    background-color: #fff;
    border: 1px solid #dadada;
    outline: none;

    &:focus {
      border: 1px solid #d1d5db;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.188);
    }
  }
}

textarea {
  &:focus {
    border: 1px solid #d1d5db;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.188);
  }
}

:deep(.spinner) {
  width: 20px;
  height: 20px;
  border-width: 2px;
}
</style>
