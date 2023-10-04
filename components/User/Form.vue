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

const handleAddNewGame = async () => {
  let formData = new FormData();
  const dataForm = formRef.value.data;

  if (!props.game) {
    formData.append("thumbnail", dataForm.thumbnail);
    formData.append("gameFile", dataForm.gameFile);

    const categoryIds = dataForm.category.map((cate) => cate.value);
    formData.append("category", JSON.stringify(categoryIds));
  }

  formData.append("name", dataForm.name);
  formData.append("description", dataForm.description);
  formData.append("width", dataForm.width + "");
  formData.append("height", dataForm.height + "");

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
    <Vueform ref="formRef" :display-errors="false" :endpoint="false">
      <div class="md:col-span-6 col-span-12 p-6 bg-white rounded-md shadow-md">
        <TextElement name="name" id="name" class="mb-5" rules="required">
          <template #label="scope">
            <FormLabel :required="true">Game name</FormLabel>
          </template>
        </TextElement>

        <TagsElement
          name="category"
          :items="categories"
          class="mb-5"
          rules="required"
          :messages="{
            required: 'Categories is required',
          }"
        >
          <template #label="scope">
            <FormLabel :required="true">Category</FormLabel>
          </template>
        </TagsElement>

        <div class="grid grid-cols-12 gap-4 mb-5">
          <TextElement name="width" class="md:col-span-6" rules="required">
            <template #label="scope">
              <FormLabel :required="true">Width</FormLabel>
            </template>
          </TextElement>
          <TextElement name="height" class="md:col-span-6" rules="required">
            <template #label="scope">
              <FormLabel :required="true">Height</FormLabel>
            </template>
          </TextElement>
        </div>

        <TEditorElement name="description">
          <template #label="scope">
            <FormLabel :required="false">Description</FormLabel>
          </template>
        </TEditorElement>
      </div>
      <div class="flex flex-col md:col-span-6 col-span-12 p-6 bg-white rounded-md shadow-md">
        <div>
          <FileElement
            :url="false"
            name="thumbnail"
            view="gallery"
            :auto="false"
            class="thumbnail mb-5"
            rules="required"
          >
            <template #label="scope">
              <FormLabel :required="true">Thumbnail</FormLabel>
            </template>
          </FileElement>
          <FileElement name="gameFile" :auto="false" class="thumbnail mb-5" :url="false" :drop="true" rules="required">
            <template #label="scope">
              <FormLabel :required="true">Game File</FormLabel>
            </template>
          </FileElement>
        </div>
        <ButtonElement name="button" @click="handleAddNewGame" class="mt-auto flex justify-end" submits>
          <div class="flex items-center btn-search text-sm font-medium text-white">
            <Spinner v-if="isCreating" />
            <IconEdit v-else-if="game" class="mr-1 fill-white" />
            <IconPlush v-else class="mr-1 fill-white" />
            {{ game ? "Edit" : "Add" }}
          </div>
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

.thumbnail {
  :deep(> div > div > div:nth-child(2)) {
    display: flex;
    justify-content: center;
  }
}
</style>
