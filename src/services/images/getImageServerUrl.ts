import { httpClient } from "@/api/httpClient";

type ResponseImageUrl = {
  uploadUrl: string;
  fileUrl: string;
};

export const getImageServerUrlService = async (): Promise<string> => {
  const res = await httpClient.post<File, ResponseImageUrl>(
    "/images/upload-url",
    {
      fileType: "image/png",
    },
  );

  return res.uploadUrl;
};
