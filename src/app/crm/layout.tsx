import HeaderCrmPage from "@/components/HeaderCrm";
import HeaderCrmMobile from "@/components/HeaderCrmMobile";
import { AppShell } from "@/layouts/AppShell";
import { AuthShell } from "@/layouts/AuthShell";
import { Box } from "@mui/system";
import { headers } from "next/headers";

export default async function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const profileHeader = headersList.get("x-user-profile");
  const profile = profileHeader ? JSON.parse(profileHeader) : null;

  return (
    <AuthShell initialProfile={profile}>
      <AppShell disableCustomTheme={false}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "1320px",
            mx: "auto",
            overflow: "hidden",
          }}
        >
          <HeaderCrmMobile />
          <HeaderCrmPage />
          {children}
        </Box>
      </AppShell>
    </AuthShell>
  );
}
