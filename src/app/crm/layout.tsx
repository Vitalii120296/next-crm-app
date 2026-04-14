import HeaderCrmPage from "@/components/HeaderCrm";
import HeaderCrmMobile from "@/components/HeaderCrmMobile";
import { AppShell } from "@/layouts/AppShell";
import { AuthShell } from "@/layouts/AuthShell";
import { Box } from "@mui/system";

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthShell>
      <AppShell disableCustomTheme={false}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "1320px",
            mx: "auto",
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
