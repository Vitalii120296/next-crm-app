import { getProductsService } from "@/services/products/getProducts";
import ProductsPage from "./ProductsPage";

export async function ProductsContent() {
  const products = await getProductsService();

  return <ProductsPage productsPayload={products} />;
}
