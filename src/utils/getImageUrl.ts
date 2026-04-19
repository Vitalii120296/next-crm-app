import { defaultImageUrl } from "@/constants/defaultImage";
import { getImageServerUrlService } from "@/services/images/getImageServerUrl";
import { getImageUrlService } from "@/services/images/getImageUrl";

export const getImageUrl = async (imageFile: File | null) => {
  let imgUrl = defaultImageUrl;

  if (imageFile) {
    const { uploadUrl, fileUrl } = await getImageServerUrlService(imageFile);

    await getImageUrlService(uploadUrl, imageFile);

    imgUrl = fileUrl;
  }

  return imgUrl;
};
