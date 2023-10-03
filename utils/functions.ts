import { RESPONSE_STATUS } from "@/constants";

export function handleResponse(data, error, messageSuccess = "Successful!!!", messageFailed = "Failed!!!") {
  if (error.value) {
    return {
      status: RESPONSE_STATUS.ERROR,
      message: error.value.message,
    };
  }

  if (data.value) {
    return {
      status: RESPONSE_STATUS.SUCCESS,
      message: messageSuccess,
    };
  }

  return {
    status: RESPONSE_STATUS.FAILED,
    message: messageFailed,
  };
}

export function getTokenFromLocalStorage() {
  if (process.client) {
    return localStorage.getItem("access_token") ?? "";
  }

  return "";
}

export function randomString(length = 5) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function convertStringToDate(string) {
  return new Date(string).toLocaleDateString();
}
