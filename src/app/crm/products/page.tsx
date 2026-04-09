import { Suspense } from "react";
import { ProductsPage } from "./ProductsPage";
import { Progress } from "@/components/Progress";

const ProductPage = () => {
  return (
    <Suspense fallback={<Progress />}>
      <ProductsPage />
    </Suspense>
  );
};

export default ProductPage;
