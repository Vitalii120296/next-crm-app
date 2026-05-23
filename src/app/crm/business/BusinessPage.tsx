"use client";

import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Business, BusinessDTO } from "@/types";
import { updateBusinessService } from "@/services/business/updateBusiness";
import { getImageUrl } from "@/utils/getImageUrl";
import { deleteImg } from "@/utils/deleteImg";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { defaultImageUrl } from "@/constants/defaultImage";
import { useState } from "react";

type Props = {
  businessPayload: Business;
};

export default function BusinessPage({ businessPayload }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [form, setForm] = useState<Business>(businessPayload);

  const avatarSrc = imagePreview || form.avatar || defaultImageUrl;

  const handleChange = (field: keyof Business, value: string) => {
    setIsSaved(false);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setIsError("Company name is required");
      return;
    }

    setIsSending(true);
    setIsError(null);
    setIsSaved(false);

    try {
      let imgUrl: string | null = null;
      const fileName = form.avatar?.split("/").at(-1) || null;

      if (imageFile) {
        imgUrl = await getImageUrl(imageFile, "business_img");

        if (imgUrl && fileName) {
          await deleteImg(fileName, "business_img");
        }
      }

      const payload: Partial<BusinessDTO> = {
        name: form.name.trim(),
        description: form.description?.trim() || null,
        email: form.email?.trim() || null,
        phone: form.phone?.trim() || null,
        address: form.address?.trim() || null,
        avatar: imgUrl || form.avatar || null,
        updated_at: new Date(),
      };

      const updated = await updateBusinessService(form.id, payload);

      setForm(updated);
      setImageFile(null);

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
      setIsSaved(true);
    } catch (error) {
      setIsError(getErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Business Settings
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={avatarSrc}
                  alt={form.name}
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                  }}
                />

                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  disabled={isSending}
                >
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Recommended: 512x512px
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Company Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  disabled={isSending}
                  fullWidth
                />

                <TextField
                  label="Description"
                  value={form.description ?? ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  disabled={isSending}
                  multiline
                  minRows={3}
                  fullWidth
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Email"
                      type="email"
                      value={form.email ?? ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      disabled={isSending}
                      fullWidth
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Phone"
                      value={form.phone ?? ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      disabled={isSending}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Address"
                  value={form.address ?? ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  disabled={isSending}
                  fullWidth
                />

                {isError && <Alert severity="error">{isError}</Alert>}
                {isSaved && !isError && (
                  <Alert severity="success">
                    Business settings saved successfully.
                  </Alert>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "stretch", sm: "flex-end" },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSending}
                    fullWidth
                    sx={{ maxWidth: { sm: 200 } }}
                  >
                    {isSending ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
