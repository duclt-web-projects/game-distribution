<script setup>
import { useHttp } from '@/composables/useHttp';
import { adminCategoryPageBreadcrumbs } from '@/config/breadcrumbs';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { PlusSmallIcon } from '@heroicons/vue/24/outline';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';

useHead({
  title: 'Category - Admin - XGame Studio',
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
  middleware: ['auth-admin'],
});

const { $toast } = useNuxtApp();

const currentPage = ref(1);
const isRefetch = ref(false);
const modalActive = ref(null);
const currentCategory = ref(null);
const categoryData = ref('');
const categoryError = ref('');

const { data: categories } = await useHttp(
  () => `/admin/categories/list?page=${currentPage.value}`,
  {
    server: false,
    watch: [isRefetch],
    tokenKey: 'admin_access_token',
  },
);

const editCategory = async (id) => {
  const { data, error } = await useHttp(`/admin/category/${id}`, {
    tokenKey: 'admin_access_token',
  });

  if (data.value) {
    modalActive.value = true;
    currentCategory.value = data.value;
    categoryData.value = data.value.name;
    return;
  }

  $toast.error(error.value?.message ?? 'Something went wrong !!!');
};

const addCategory = () => {
  currentCategory.value = null;
  categoryData.value = '';
  modalActive.value = true;
};

const onChangePage = (val) => {
  currentPage.value = val;
};

const handleChangeStatus = async (id) => {
  isRefetch.value = !isRefetch.value;

  const { data, error } = await useHttp(`admin/category/change-status/${id}`, {
    method: 'POST',
    tokenKey: 'admin_access_token',
  });

  if (error.value) {
    $toast.error(error.value.message);
  }
  if (data.value) {
    $toast.success('Change status successfully!!!');
  }
};

const handleAddCategory = async () => {
  categoryError.value = '';

  if (categoryData.value === '') {
    categoryError.value = 'Category is required.';
    return;
  }

  modalActive.value = false;

  const requestData = {
    method: 'POST',
    tokenKey: 'admin_access_token',
    body: {
      name: categoryData,
    },
  };

  const { data, error } = currentCategory.value
    ? await useHttp(
        `admin/category/edit/${currentCategory.value.id}`,
        requestData,
      )
    : await useHttp(`admin/category/store`, requestData);

  if (error.value) {
    $toast.error(error.value.message);
  }
  if (data.value) {
    $toast.success('Change category successfully!!!');
    isRefetch.value = !isRefetch.value;
    currentCategory.value = null;
  }
};
</script>

<template>
  <AdminLayout>
    <DashboardHeading
      title="Category List"
      :breadcrumbs="adminCategoryPageBreadcrumbs"
    />
    <div class="bg-white rounded mt-4 shadow overflow-hidden">
      <div class="flex justify-end items-center p-4">
        <base-button
          :icon-left="PlusSmallIcon"
          intent="primary"
          @click="addCategory"
        >
          Add
        </base-button>
      </div>
      <div class="overflow-x-auto px-4 pb-5">
        <table class="w-full">
          <thead class="bg-gray-300 border border-gray-200">
            <tr class="text-gray-900 text-sm text-left">
              <th class="px-4 py-4 font-medium border-r border-gray-200">
                Name
              </th>
              <th
                class="w-[120px] px-4 py-4 text-center font-medium border-r border-gray-200"
              >
                Status
              </th>
              <th
                class="w-[150px] px-4 py-4 text-center font-medium border-r border-gray-200"
              >
                Total Games
              </th>
              <th
                class="w-[150px] px-4 py-4 font-medium border-r border-gray-200"
              >
                Created at
              </th>
              <th
                class="w-[150px] px-4 py-4 font-medium border-r border-gray-200"
              >
                Updated at
              </th>
              <th class="w-[150px] px-4 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody class="border">
            <tr v-if="!categories || !categories.data" class="loading-wrapper">
              <td colSpan="7" class="text-center p-4">
                <Spinner class="w-10 h-10" />
              </td>
            </tr>
            <tr
              v-else-if="categories.data.length === 0"
              class="loading-wrapper"
            >
              <td colSpan="7" class="text-center p-4">
                <div>No data</div>
              </td>
            </tr>
            <template v-else>
              <tr
                v-for="(category, index) in categories.data"
                :key="index"
                class="odd:bg-white even:bg-gray-100 text-sm text-gray-900"
              >
                <td
                  class="px-4 py-4 whitespace-nowrap border-r border-gray-200"
                >
                  {{ category.name }}
                </td>
                <td
                  class="px-4 py-4 whitespace-nowrap border-r border-gray-200"
                >
                  <span
                    v-if="category.status === 1"
                    class="bg-emerald-100 text-green-700 px-2 py-0.5 rounded-full"
                  >
                    Active
                  </span>
                  <span
                    v-else
                    class="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                  >
                    Inactive
                  </span>
                </td>
                <td
                  class="px-4 py-4 text-center whitespace-nowrap border-r border-gray-200"
                >
                  {{ category.games_count }}
                </td>
                <td
                  class="px-4 py-4 whitespace-nowrap border-r border-gray-200"
                >
                  {{ convertStringToDate(category.created_at) }}
                </td>
                <td
                  class="px-4 py-4 whitespace-nowrap border-r border-gray-200"
                >
                  {{ convertStringToDate(category.updated_at) }}
                </td>
                <td class="h-[44px] px-4 gap-1">
                  <div class="flex items-center justify-center">
                    <FormSwitch
                      :id="category.slug"
                      :value="category.status === 1"
                      @update:model-value="handleChangeStatus(category.id)"
                    />
                    <PencilSquareIcon
                      class="w-5 h-5 ml-4 fill-yellow-500 cursor-pointer"
                      @click="editCategory(category.id)"
                    />
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div
          v-if="categories && categories.data.length"
          class="flex justify-end p-4 bg-white"
        >
          <PaginationUser
            :current-page="currentPage"
            :total-page="categories.last_page"
            @change-page="onChangePage"
          />
        </div>
      </div>
    </div>
    <base-modal
      :modal-active="modalActive"
      title="Add new category"
      @close-modal="modalActive = false"
    >
      <template #body>
        <form @submit.prevent="handleAddCategory">
          <FormField label="Category Name" :error="categoryError" required>
            <FormInput
              v-model="categoryData"
              placeholder="John Doe"
              type="text"
            />
          </FormField>
        </form>
      </template>
      <template #footer>
        <base-button
          :icon-left="PlusSmallIcon"
          intent="success"
          @click="handleAddCategory"
        >
          Add
        </base-button>
      </template>
    </base-modal>
  </AdminLayout>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
