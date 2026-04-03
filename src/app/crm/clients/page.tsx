import { Loader } from "@/components/Loader/Loader";
import { Suspense } from "react";
import ClientsPage from "./ClientsPage";

export default function ClientsPageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <ClientsPage />
    </Suspense>
  );
}
