import axios from "axios";
const BaseUrl = import.meta.env.VITE_BASEURL_API_PATH;

export const ApiUrl = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});
