import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getProductsService } from "../getProducts";
import { Product } from "@/types/product";
import { useProductsStore } from "@/store/products";

export const useProducts = (token: string | null) => {
  const [productsPayload, setProductsPayload] = useState<Product[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const products = useProductsStore((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (token && !products) {
          setLoading(true);
          const data = await getProductsService();

          setProductsPayload(data);
          console.log("Products", data);
        }
      } catch (error) {
        throw new Error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, products]);

  return { productsPayload, loading };
};
