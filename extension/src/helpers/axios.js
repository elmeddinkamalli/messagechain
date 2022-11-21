import axios from "axios";
import { useSelector } from "react-redux";
import { currentChainId } from "./web3";

const $axios = axios.create({
  headers: {
    "x-auth-token": localStorage.getItem("authToken"),
    chainId: currentChainId ?? localStorage.getItem("chainId"),
  },
  "content-type": "application/json",
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

$axios.interceptors.response.use(
  (response) => {
    if (response.status === 201) {
      console.log("success");
    } else if (response.config.method === "put") {
      console.log("success update");
    }
    return response;
  },
  (error) => {
    if (
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 403
    ) {
      if (error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log("Something went wrong");
      }
    } else {
      console.log("Something went wrong");
    }
    throw error;
  }
);

export default $axios;
