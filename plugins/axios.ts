import { API_ENDPOINT } from "@/config/constants";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = API_ENDPOINT;
  axios.defaults.headers.head = {
    Accept: "*",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
  };

  return {
    provide: {
      axios: axios,
    },
  };
});
