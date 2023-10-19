<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import { useUrlConfig } from '@/composables/useUrlConfig';
import { userGameEditPageBreadcrumbs } from '@/config/breadcrumbs';
import { ROUTE_NAMES } from '@/constants/routes';
import UserLayout from '@/layouts/UserLayout.vue';
import { ICategory, IGame } from '@/types/game';

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

const gameData = reactive({
  name: '',
  category: [],
  description: '',
  width: 0,
  height: 0,
});
const errors = ref({
  name: '',
  description: '',
  category: '',
  width: '',
  height: '',
});

const { data: game } = await useHttp<IGame>(() => `${API_URL}/game/${id}`);

onMounted(() => {
  if (game.value) {
    gameData.name = game.value.name;
    gameData.width = game.value.width;
    gameData.height = game.value.height;
    gameData.description = game.value.description;
  }
});

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

const validate = () => {
  errors.value = {
    name: '',
    description: '',
    category: '',
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

  if (!gameData.category.length) {
    errors.value.category = 'Category is required.';
  }

  if (
    errors.value.name ||
    errors.value.width ||
    errors.value.height ||
    errors.value.category
  )
    return false;

  return true;
};

const handleEditGame = async () => {
  if (!validate()) return;

  const formData = new FormData();

  formData.append('name', gameData.name);
  formData.append('description', gameData.description);
  formData.append('width', gameData.width + '');
  formData.append('height', gameData.height + '');

  const { data, error } = await useHttp(`/user/game/${id}`, {
    method: 'POST',
    body: formData,
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Update successfully!!!');

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
    }, 1000);
  }
};
</script>

<template>
  <UserLayout>
    <DashboardHeading
      title="Edit game"
      :breadcrumbs="userGameEditPageBreadcrumbs"
    />
    <user-game :is-loading="!game">
      <form @submit.prevent="handleEditGame">
        <div class="px-4 py-5 sm:p-6">
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
                <FormLabel for="message" :required="false"
                  >Description</FormLabel
                >
                <FormTextArea
                  v-model="gameData.description"
                  placeholder="Description your game ..."
                  type="text"
                />
              </FormField>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <base-button intent="success" type="submit"> Save </base-button>
        </div>
      </form>
    </user-game>
  </UserLayout>
</template>

<style scoped></style>
