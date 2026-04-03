import axios from "axios";

// this client does not have auth interceptors
export const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

// to awoid getting `res.data` everywhere
authClient.interceptors.response.use((res) => res.data);
