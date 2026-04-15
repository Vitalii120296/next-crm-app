import axios from "axios";

export const imagesClient = axios.create({
  withCredentials: false,
});

imagesClient.interceptors.response.use((res) => res.data);
