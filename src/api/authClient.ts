import axios from "axios";

export const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CLIENT_API_URL}`,
  withCredentials: true,
});

authClient.interceptors.response.use((res) => res.data);
