import { Button, CardMedia } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";

type Props = {
  imagePreview: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ModalImageViewer = ({
  imagePreview,
  handleImageChange,
}: Props) => {
  return (
    <CardMedia
      sx={{
        height: 180,
        borderRadius: 1,
        position: "relative",
      }}
      image={imagePreview}
      title={"Product image"}
    >
      <Button
        component="label"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: "0.7",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload image
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>
    </CardMedia>
  );
};
