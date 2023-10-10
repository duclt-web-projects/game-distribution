<script setup>
import { useHttp } from "@/composables/useHttp";
import AdminLayout from "@/layouts/AdminLayout.vue";

useHead({
  title: "Games - Admin - XGame Studio",
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

// definePageMeta({
//   middleware: ["auth-admin"],
// });

const { BACKEND_URL } = useUrlConfig();

const { $toast } = useNuxtApp();

const currentPage = ref(1);
const isRefetch = ref(false);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Publish At",
    dataIndex: "published_at",
    key: "publish_at",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const { data: games } = await useHttp(() => `/admin/games/list?page=${currentPage.value}`, {
  server: false,
  watch: [isRefetch],
  tokenKey: "admin_access_token",
});

const pagination = computed(() => ({
  total: games.total,
  current: games.current_page,
  pageSize: 10,
}));

const handleTableChange = (pagination, filters, sorter) => {
  console.log(pagination);
  isRefetch.value = !isRefetch.value;
};

const onChangePage = (val) => {
  currentPage.value = val;
};

const changeStatus = async (id, currentStatus, status) => {
  if (currentStatus !== status) {
    isRefetch.value = !isRefetch.value;

    const { data, error } = await useHttp(`admin/game/change-status/${id}`, {
      method: "POST",
      body: { status },
      tokenKey: "admin_access_token",
    });

    if (error.value) {
      $toast.error(error.value.message);
    }
    if (data.value) {
      $toast.success("Change status successfully!!!");
    }
  }
};
</script>

<template>
  <AdminLayout>
    <a-card title="Games by user" :bordered="false">
      <a-table
        :dataSource="games && games.data"
        :columns="columns"
        :pagination="pagination"
        @change="handleTableChange"
        :loading="!games"
      />
    </a-card>
  </AdminLayout>
</template>

<style scoped></style>
