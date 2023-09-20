import axios from "@/plugins/axios";
import { defineStore } from "pinia";

// @ts-ignore
const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      id: "",
      name: "",
      email: "",
    };
  },
  actions: {
    async login(email, password) {
      const response = await $axios.post("/auth/login", {
        email: email,
        password: password,
      });

      this.id = response.data.user.id;
      this.name = response.data.user.name;
      this.email = response.data.user.email;

      localStorage.setItem("access_token", response.data.access_token);
    },

    async register(name, email, password) {
      const response = await $axios.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      this.id = response.data.user.id;
      this.name = response.data.user.name;
      this.email = response.data.user.email;

      localStorage.setItem("access_token", response.data.access_token);
    },

    async getUser() {
      let res = await $axios.get("/api/logged-in-user");

      this.id = res.data[0].id;
      this.name = res.data[0].name;
      this.bio = res.data[0].bio;
      this.image = res.data[0].image;
    },

    async logout() {
      await $axios.post("/logout");
      this.resetUser();
    },

    resetUser() {
      this.id = "";
      this.name = "";
      this.email = "";
      this.bio = "";
      this.image = "";
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
