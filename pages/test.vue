<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import {
  GoogleSignInButton,
  decodeCredential,
  type CredentialResponse,
} from 'vue3-google-signin';

const userStore = useUserStore();

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  if (credential) {
    const decodedCredential = decodeCredential(credential);
    userStore.loginWithProvider({
      email: decodedCredential.email,
      name: decodedCredential.name,
    });
  }
};

// handle an error event
const handleLoginError = () => {
  console.error('Login failed');
};
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>
