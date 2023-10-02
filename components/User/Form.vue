<script setup lang="ts">
import { IconPlush, IconUploadZip } from "@/assets/icon";
import { useHttp } from "@/composables/useHttp";
import { ROUTE_NAMES } from "@/constants/routes";

const props = defineProps({
  game: {
    type: Object,
    default: null,
  },
});

const { $toast } = useNuxtApp();

const name = ref("");
const select = ref([]);
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
const dataSelect = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
];
const urlPreview = ref("/images/no-image.png");

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
  urlPreview.value = URL.createObjectURL(event.target.files[0]);
};

const onUploadGameFile = (event) => {
  gameFile.value = event.target.files[0];
};

const handleAddNewGame = async () => {
  if (!validate()) return;
  isCreating.value = true;

  let formData = new FormData();

  if (!props.game) {
    formData.append("thumbnail", thumbnail.value);
    formData.append("gameFile", gameFile.value);
  }
  formData.append("name", name.value);
  formData.append("description", description.value);
  formData.append("width", gameWidth.value + "");
  formData.append("height", gameHeight.value + "");

  const { data, error } = props.game
    ? await useHttp(`/games/edit/${props.game.id}`, { method: "POST", body: formData })
    : await useHttp("/games/store", { method: "POST", body: formData });
  console.log(data, error);
  data.value, error.value;

  isCreating.value = false;

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success("Add successfully!!!");

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
    }, 500);
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
  <Breadcrumb />
  <h2 class="text-xl font-semibold text-gray-700 capitalize mb-5">Add new game</h2>
  <form @submit.prevent="handleAddNewGame">
    <div class="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
      <div class="md:col-span-3 p-6 bg-white rounded-md shadow-md">
        <FormField label="Game Name" required>
          <FormInput placeholder="John Doe" type="text" :modelValue="name" />
        </FormField>

        <FormField label="Category" required>
          <FormCombobox placeholder="Search user..." v-model="select" multiple :options="dataSelect" />
        </FormField>

        <div class="grid grid-cols-1 sm:grid-cols-6 gap-5">
          <div class="col-span-3">
            <FormField label="Width" required>
              <FormInput placeholder="John Doe" type="text" :modelValue="name" typeSize>
                <span
                  class="h-10 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-200 border border-r-0 rounded-r"
                >
                  px
                </span>
              </FormInput>
            </FormField>
          </div>
          <div class="col-span-3">
            <FormField label="Height" required>
              <FormInput placeholder="John Doe" type="text" :modelValue="name" typeSize>
                <span
                  class="h-10 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-200 border border-r-0 rounded-r"
                >
                  px
                </span>
              </FormInput>
            </FormField>
          </div>
        </div>

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
      </div>

      <div class="relative md:col-span-3 p-6 pb-24 bg-white rounded-md shadow-md">
        <div class="mb-3">
          <FormLabel for="thumbnail" :required="true"> Thumbnail </FormLabel>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              class="block mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:h-10 file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600"
              @change="onUploadThumbnail($event)"
            />
          </label>
          <div class="preview-image h-64 w-full border-1 border-gray-200 border mt-4">
            <img class="object-contain w-full h-full" :src="urlPreview" alt="" />
          </div>
          <FormHelperMessage class="mt-1 text-sm text-gray-500" v-if="errors.thumbnail" id="game-error">
            {{ errors.thumbnail }}
          </FormHelperMessage>
        </div>

        <div class="">
          <FormLabel for="gameFile" :required="true"> Game File </FormLabel>

          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50"
          >
            <div class="flex flex-col items-center justify-center pt-4 pb-6">
              <IconUploadZip class="fill-gray-400 w-10 h-10 mb-2" />
              <p class="text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" @change="onUploadGameFile($event)" />
          </label>
          <FormHelperMessage class="mt-1 text-sm text-gray-500" v-if="errors.gameFile" id="game-error">
            {{ errors.gameFile }}
          </FormHelperMessage>
        </div>

        <button
          class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white rounded bg-emerald-600 border border-emerald-700 hover:bg-emerald-700 absolute bottom-6 right-6"
        >
          <div class="mr-1">
            <Spinner v-if="isCreating" />
            <IconPlush v-else class="mr-1 fill-white" />
          </div>
          Add game
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
h2 {
  font-family: "Roboto", sans-serif;
}

:deep(.multiselect-tags-search) {
  height: 0;
  border: none;
}

:deep(.spinner) {
  width: 20px;
  height: 20px;
  border-width: 2px;
}
</style>
