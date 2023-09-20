// import { API_ENDPOINT } from "@/constants";
// import axios from "axios";

// export default defineNuxtPlugin((nuxtApp) => {
//   axios.defaults.withCredentials = false;
//   axios.defaults.baseURL = API_ENDPOINT;

//   return {
//     provide: {
//       axios: axios,
//     },
//   };
// });

export default function ({ $axios, redirect }) {
  $axios.baseUrl

  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400");
    }
  });
}
