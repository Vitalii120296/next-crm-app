import { Suspense } from "react";
import ClientsPage from "./ClientsPage";
import { Progress } from "@/components/Progress";

export default function ClientsPageWrapper() {
  return (
    <Suspense fallback={<Progress />}>
      <ClientsPage />
    </Suspense>
  );
}
