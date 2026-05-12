import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getProductsService } from "../getProducts";
import { Product, User } from "@/types";
import { useProductsStore } from "@/store/products";

export const useProducts = (currentUser: User | null) => {
  const [productsPayload, setProductsPayload] = useState<Product[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const products = useProductsStore((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (currentUser && !products) {
          setLoading(true);
          const res = await getProductsService();

          setProductsPayload(res);
        }
      } catch (error) {
        throw new Error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentUser, products]);

  return { productsPayload, loading };
};
