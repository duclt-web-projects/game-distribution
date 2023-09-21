import { API_ENDPOINT } from "@/constants";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = false;
  axios.defaults.baseURL = API_ENDPOINT;

  return {
    provide: {
      axios: axios,
    },
  };
});
