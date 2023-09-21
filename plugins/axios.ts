import { API_ENDPOINT } from "@/constants";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = false;
  axios.defaults.baseURL = API_ENDPOINT;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  return {
    provide: {
      axios: axios,
    },
  };
});
