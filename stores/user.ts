import { useAxios } from "@/composables/useAxios";
import { DEFAULT_USER } from "@/constants/user";
import { IUser } from "@/types/auth";
import { defineStore } from "pinia";

// @ts-ignore
const $axios = useAxios();

export const useUserStore = defineStore("user", {
  state: () => {
    const initialState: IUser = getDataFromLocalStorage("user", DEFAULT_USER);
    return {
      id: initialState.id,
      name: initialState.name,
      email: initialState.email,
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
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
      });
    },

    async getUser() {
      let res = await $axios.get("/api/logged-in-user");

      this.id = res.data[0].id;
      this.name = res.data[0].name;
      this.bio = res.data[0].bio;
      this.image = res.data[0].image;
    },

    async logout() {
      const response = await $axios.get("/auth/logout");
      if (response) {
        this.resetUser();
      }
    },

    resetUser() {
      this.id = DEFAULT_USER.id;
      this.name = DEFAULT_USER.name;
      this.email = DEFAULT_USER.email;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
