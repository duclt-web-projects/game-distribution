<script setup>
import { useHttp } from "@/composables/useHttp";
import { ROUTE_NAMES } from "@/constants/routes";
import { IconEdit, IconPlush } from "~/assets/icon";

const props = defineProps({
  game: {
    type: Object,
    default: null,
  },
});

const { $toast } = useNuxtApp();

const formRef = ref(null);
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

const { data: categories } = await useHttp(`categories`, {
  server: false,
  transform(categories) {
    return categories.map((cate) => ({
      label: cate.name,
      value: cate.id,
    }));
  },
});

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
  console.log(formRef.value.data);
  return;
  if (!validate()) return;
  isCreating.value = true;

  let formData = new FormData();

  if (!props.game) {
    formData.append("thumbnail", gameData.thumbnail);
    formData.append("gameFile", gameData.gameFile);

    const categoryIds = gameData.category.map((cate) => cate.value);
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

  <ClientOnly>
    <Vueform ref="formRef">
      <div class="md:col-span-6 p-6 bg-white rounded-md shadow-md">
        <TextElement name="name" id="name" class="mb-5" rules="required">
          <template #label="scope">
            <FormLabel :required="true">Game name</FormLabel>
          </template>
        </TextElement>

        <TagsElement name="tags" :items="categories" class="mb-5">
          <template #label="scope">
            <FormLabel :required="true">Category</FormLabel>
          </template>
        </TagsElement>

        <div class="grid grid-cols-12 gap-4 mb-5">
          <TextElement name="width" class="md:col-span-6">
            <template #label="scope">
              <FormLabel :required="true">Width</FormLabel>
            </template>
          </TextElement>
          <TextElement name="height" class="md:col-span-6">
            <template #label="scope">
              <FormLabel :required="true">Height</FormLabel>
            </template>
          </TextElement>
        </div>

        <TEditorElement name="t-editor">
          <template #label="scope">
            <FormLabel :required="false">Description</FormLabel>
          </template>
        </TEditorElement>
      </div>
      <div class="relative md:col-span-6 p-6 bg-white rounded-md shadow-md">
        <FileElement name="file" view="gallery" :auto="false" :submit="false" class="thumbnail mb-5">
          <template #label="scope">
            <FormLabel :required="true">Thumbnail</FormLabel>
          </template>
        </FileElement>
        <div>
          <FileElement name="file" :auto="false" class="thumbnail flex justify-center" :submit="false" :drop="true">
            <template #label="scope">
              <FormLabel :required="true">Game File</FormLabel>
            </template>
          </FileElement>
        </div>
        <ButtonElement name="button" @click="handleAddNewGame">
          <div class="flex items-center btn-search text-sm font-medium text-white">
            <Spinner v-if="isCreating" />
            <IconEdit v-else-if="game" class="mr-1 fill-white" />
            <IconPlush v-else class="mr-1 fill-white" />
          </div>
          {{ game ? "Edit" : "Add" }}
        </ButtonElement>
      </div>
    </Vueform>
  </ClientOnly>
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

:deep(.form-h-gallery) {
  height: 240px;
}

:deep(.form-color-on-primary) {
  display: none;
}

:deep(.form-w-gallery) {
  width: 240px;
}
</style>
