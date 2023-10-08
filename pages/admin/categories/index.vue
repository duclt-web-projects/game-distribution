<script setup>
import { IconPlush } from "@/assets/icon";
import { useHttp } from "@/composables/useHttp";
import { ROUTE_NAMES } from "@/constants";
import AdminLayout from "@/layouts/AdminLayout.vue";

useHead({
  title: "Category - Admin - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Register - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
});

definePageMeta({
  middleware: ["auth-admin"],
});

const { $toast } = useNuxtApp();

const currentPage = ref(1);
const isRefetch = ref(false);

const { data: categories } = await useHttp(() => `/admin/categories/list?page=${currentPage.value}`, {
  server: false,
  watch: [isRefetch],
  tokenKey: "admin_access_token",
});

const onChangePage = (val) => {
  currentPage.value = val;
};

const handleChangeStatus = async (id) => {
  isRefetch.value = !isRefetch.value;

  const { data, error } = await useHttp(`admin/category/change-status/${id}`, {
    method: "POST",
    tokenKey: "admin_access_token",
  });

  if (error.value) {
    $toast.error(error.value.message);
  }
  if (data.value) {
    $toast.success("Change status successfully!!!");
  }
};
</script>

<template>
  <AdminLayout>
    <div class="flex justify-end">
      <NuxtLink
        :to="ROUTE_NAMES.USER_GAME_ADD"
        class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-700"
      >
        <IconPlush class="mr-1 fill-gray-50" /> Add game
      </NuxtLink>
    </div>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Id
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Created at
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-if="!categories || !categories.data" class="loading-wrapper">
                <td colSpan="5" class="text-center p-4">
                  <Loading />
                </td>
              </tr>
              <tr v-else-if="categories.data.length === 0" class="loading-wrapper">
                <td colSpan="5" class="text-center p-4">
                  <div>No data</div>
                </td>
              </tr>
              <template v-else>
                <tr v-for="(category, index) in categories.data" :key="index">
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ index + 1 }}
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ category.name }}
                  </td>
                  <td class="px-6 py-4 text-sm font-medium leading-5 border-b border-gray-200 whitespace-nowrap">
                    <span
                      v-if="category.status === 0"
                      class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      Inactive
                    </span>
                    <span
                      v-if="category.status === 1"
                      class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      Active
                    </span>
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ convertStringToDate(category.created_at) }}
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <FormSwitch
                      :id="category.slug"
                      :value="category.status === 1"
                      v-on:update:modelValue="handleChangeStatus(category.id)"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-if="categories && categories.data && categories.data.length" class="flex justify-end p-4 bg-white">
            <PaginationUser :currentPage="currentPage" :totalPage="categories.last_page" @changePage="onChangePage" />
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
