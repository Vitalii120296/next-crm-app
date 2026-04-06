import "axios";
import type { AxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosInstance {
    request<T = unknown, R = T>(config: AxiosRequestConfig): Promise<R>;
    get<T = unknown, R = T>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    delete<T = unknown, R = T>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    head<T = unknown, R = T>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    post<T = unknown, R = T>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    put<T = unknown, R = T>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<R>;
    patch<T = unknown, R = T>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<R>;
  }
}
