import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent";
import { Progress } from "@/components/Progress";

export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={<Progress />}>
      <ProductsContent />
    </Suspense>
  );
}
