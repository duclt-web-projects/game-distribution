<script setup lang="ts">
import { IconEdit, IconPlush, IconUploadZip } from "@/assets/icon";
import { useHttp } from "@/composables/useHttp";
import { ROUTE_NAMES } from "@/constants/routes";
import { ICategory } from "@/types/game";
import { IOptions } from "../../types/common";

const props = defineProps({
  game: {
    type: Object,
    default: null,
  },
});

const { $toast } = useNuxtApp();

const gameData = reactive({
  name: "",
  category: [],
  description: "",
  width: "",
  height: "",
  thumbnail: "",
  gameFile: "",
});
const isCreating = ref(false);
const errors = ref({
  name: "",
  description: "",
  category: "",
  thumbnail: "",
  gameFile: "",
  width: "",
  height: "",
});
const urlPreview = ref("/images/no-image.png");

const loadCategories = async (query, setOptions) => {
  const { data: categories } = await useHttp<ICategory[]>(`categories?name=${query}`);
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
    name: "",
    description: "",
    category: "",
    thumbnail: "",
    gameFile: "",
    width: "",
    height: "",
  };

  if (!gameData.name) {
    errors.value.name = "Name is required.";
  }

  if (!gameData.width) {
    errors.value.width = "Width is required.";
  }

  if (!gameData.height) {
    errors.value.height = "Height is required.";
  }

  if (!props.game) {
    if (!gameData.thumbnail) {
      errors.value.thumbnail = "Thumbnail is required.";
    }

    if (!gameData.gameFile) {
      errors.value.gameFile = "Game file is required.";
    }

    if (!gameData.category.length) {
      errors.value.category = "Category is required.";
    }
  }

  if (errors.value.name || errors.value.width || errors.value.height || errors.value.thumbnail || errors.value.gameFile)
    return false;

  return true;
};

const handleAddNewGame = async () => {
  if (!validate()) return;
  isCreating.value = true;

  let formData = new FormData();

  if (!props.game) {
    formData.append("thumbnail", gameData.thumbnail);
    formData.append("gameFile", gameData.gameFile);

    const categoryIds = gameData.category.map((cate: IOptions) => cate.value);
    formData.append("category", JSON.stringify(categoryIds));
  }

  formData.append("name", gameData.name);
  formData.append("description", gameData.description);
  formData.append("width", gameData.width + "");
  formData.append("height", gameData.height + "");

  const { data, error } = props.game
    ? await useHttp(`/game/edit/${props.game.id}`, { method: "POST", body: formData })
    : await useHttp("/game/store", { method: "POST", body: formData });

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
</script>

<template>
  <Breadcrumb />
  <h2 class="text-xl font-semibold text-gray-700 capitalize mb-5">{{ game ? "Edit game" : "Add new game" }}</h2>
  <form @submit.prevent="handleAddNewGame">
    <div class="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
      <div class="md:col-span-3 p-6 bg-white rounded-md shadow-md">
        <FormField label="Game Name" :error="errors.name" required>
          <FormInput placeholder="John Doe" type="text" v-model="gameData.name" />
        </FormField>

        <FormField label="Category" :error="errors.category" required disable>
          <FormCombobox
            placeholder="Search user..."
            v-model="gameData.category"
            multiple
            :loadOptions="loadCategories"
          />
        </FormField>

        <div class="grid grid-cols-1 sm:grid-cols-6 gap-5">
          <div class="col-span-3">
            <FormField label="Width" :error="errors.width" required>
              <FormInput placeholder="John Doe" type="text" v-model="gameData.width" typeSize>
                <span
                  class="h-10 inline-flex items-center px-3 text-sm text-gray-700 bg-gray-200 border border-r-0 rounded-r"
                >
                  px
                </span>
              </FormInput>
            </FormField>
          </div>
          <div class="col-span-3">
            <FormField label="Height" :error="errors.height" required>
              <FormInput placeholder="John Doe" type="text" v-model="gameData.height" typeSize>
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
          <FormLabel for="message" :required="false">Description</FormLabel>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 border border-gray-300"
            placeholder="Write your thoughts here..."
            v-model="gameData.description"
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
          <FormErrorMessage v-if="errors.thumbnail" id="game-error">
            {{ errors.thumbnail }}
          </FormErrorMessage>
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
          class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white rounded border absolute bottom-6 right-6"
          :class="
            game
              ? 'bg-yellow-400 border-yellow-400 hover:bg-yellow-500'
              : 'bg-emerald-600 border-emerald-700 hover:bg-emerald-700'
          "
        >
          <div class="mr-1">
            <Spinner v-if="isCreating" />
            <IconEdit v-else-if="game" class="mr-1 fill-white" />
            <IconPlush v-else class="mr-1 fill-white" />
          </div>
          {{ game ? "Edit" : "Add" }}
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
