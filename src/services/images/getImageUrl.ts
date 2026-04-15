import axios from "axios";

export const getImageUrlService = async (
  href: string,
  image: File,
): Promise<string> => {
  return axios.put(href, image, {
    headers: {
      "Content-Type": image.type,
    },
    withCredentials: false,
  });
};
