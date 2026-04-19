import { httpClient } from "@/api/httpClient";
import { ResponseImageUrl } from "@/types/img";

export const getImageServerUrlService = async (
  img: File,
): Promise<ResponseImageUrl> => {
  const res = await httpClient.post<File, ResponseImageUrl>(
    "/images/upload-url",
    img,
  );

  return res;
};
