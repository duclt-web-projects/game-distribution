<script setup lang="ts">
import { RESPONSE_STATUS } from "@/constants";
import { ROUTE_NAMES } from "@/constants/routes";
import { useAdminStore } from "@/stores/useAdminStore";

useHead({
  title: "Admin Login - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Login - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
});

const adminStore = useAdminStore();

const { $toast } = useNuxtApp();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errors = ref({
  email: "",
  password: "",
});

const login = async () => {
  if (!validate()) return;

  isLoading.value = true;

  const response = await adminStore.login({ email: email.value, password: password.value });

  isLoading.value = false;
  if (response.status === RESPONSE_STATUS.SUCCESS) {
    $toast.success(response.message);

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.ADMIN_GAME);
    }, 500);
  } else {
    $toast.error(response.message);
  }
};

const validate = () => {
  errors.value.email = "";
  errors.value.password = "";

  if (!email.value) {
    errors.value.email = "Email is required.";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    errors.value.email = "Invalid Email.";
  }

  if (!password.value) {
    errors.value.password = "Password is required.";
  }

  if (errors.value.email || errors.value.email) return false;

  return true;
};
</script>

<template>
  <div class="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32">
    <div class="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
      <div class="p-6">
        <div class="flex justify-center mb-5">
          <img src="/images/logos/logo.png" alt="logo" class="w-[200px]" />
        </div>
        <form>
          <FormField label="Email" :error="errors.email" required>
            <FormInput placeholder="John Doe" class-name="rounded-l" v-model="email" />
          </FormField>

          <FormField label="Password" :error="errors.password" required>
            <FormInput placeholder="John Doe" class-name="rounded-l" type="password" v-model="password" />
          </FormField>

          <div class="flex items-center justify-between mt-5">
            <a
              class="inline-block align-baseline font-semibold text-xs text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <button
            class="w-full h-10 bg-blue-500 flex items-center justify-center hover:bg-blue-700 text-white font-bold px-4 mt-5 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="login"
          >
            <Spinner v-show="isLoading" />
            Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.spinner) {
  width: 20px;
  height: 20px;
}
</style>
