import { useUrlConfig } from "@/composables/useUrlConfig";
import axios from "axios";

const { API_URL, BACKEND_URL } = useUrlConfig();

// @ts-ignore
export default class UploadAdapter {
  loader: any;
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((uploadedFile) => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append("upload", uploadedFile);

        axios({
          url: `${API_URL}/game/upload-image`,
          method: "post",
          data,
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          withCredentials: false,
        })
          .then((response) => {
            if (response.data.result == "success") {
              resolve({
                default: BACKEND_URL + response.data.url,
              });
            } else {
              reject(response.data.message);
            }
          })
          .catch((response) => {
            reject("Upload failed");
          });
      });
    });
  }

  abort() {}
}
