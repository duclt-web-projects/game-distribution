import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = false;
  axios.defaults.baseURL = '';
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  return {
    provide: {
      axios: axios,
    },
  };
});
