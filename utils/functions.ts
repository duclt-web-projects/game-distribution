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
