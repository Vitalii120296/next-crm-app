import HeaderCrmPage from "@/components/HeaderCrm";
import { AppShell } from "@/layouts/AppShell";
import { AuthShell } from "@/layouts/AuthShell";

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthShell>
      <AppShell disableCustomTheme={false}>
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
          <HeaderCrmPage />
          {children}
        </div>
      </AppShell>
    </AuthShell>
  );
}
