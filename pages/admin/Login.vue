<script setup lang="ts"></script>

<template>
  <div class="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32">
    <div class="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
      <div class="p-6">
        <div class="flex justify-center mb-5">
          <img src="/images/logos/logo.png" alt="logo" class="w-[200px]" />
        </div>
        <form>
          <FormField label="Email" required>
            <FormInput placeholder="John Doe" class-name="rounded-l" />
          </FormField>

          <FormField label="Password" required>
            <FormInput placeholder="John Doe" class-name="rounded-l" type="password" />
          </FormField>

          <div class="flex items-center justify-between mt-5">
            <a class="inline-block align-baseline font-semibold text-xs text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
          <button
              class="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 mt-5 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Log In
            </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
