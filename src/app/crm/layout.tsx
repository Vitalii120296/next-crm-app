import HeaderCrmPage from "@/components/HeaderCrm";
import { AppShell } from "@/layouts/AppShell";

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell disableCustomTheme={false}>
      <div className="flex flex-col gap-6 w-full">
        <HeaderCrmPage />
        {children}
      </div>
    </AppShell>
  );
}
