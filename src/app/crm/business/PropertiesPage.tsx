"use client";

import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

type Company = {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
};

const mockCompany: Company = {
  name: "My Business Ltd",
  description: "We provide high quality services...",
  email: "contact@business.com",
  phone: "+44 123 456 789",
  address: "London, UK",
  logo: "",
};

export default function BusinessPage() {
  const [form, setForm] = React.useState<Company>(mockCompany);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(
    mockCompany.logo || null,
  );

  const handleChange = (field: keyof Company, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setLogoPreview(url);

    setForm((prev) => ({ ...prev, logo: url }));
  };

  const handleSave = () => {
    console.log("Save company:", form);
  };

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
      {/* Header */}
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
        {/* LEFT SIDE - LOGO + INFO */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={logoPreview || undefined}
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                  }}
                />

                <Button variant="outlined" component="label" fullWidth>
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoUpload}
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

        {/* RIGHT SIDE - FORM */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Company Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Description"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  fullWidth
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Phone"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Address"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  fullWidth
                />

                {/* SAVE */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "stretch", sm: "flex-end" },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    fullWidth
                    sx={{
                      maxWidth: { sm: 200 },
                    }}
                  >
                    Save Changes
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
