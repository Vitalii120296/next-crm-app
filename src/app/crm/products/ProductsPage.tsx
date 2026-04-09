"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "@/components/ProductCard";
import { useAuthStore } from "@/store/user";
import { useEffect } from "react";
import { useProductsStore } from "@/store/products";
import { useProducts } from "@/services/products/hooks/useProducts";
import { Progress } from "@/components/Progress";

export const ProductsPage = () => {
  const token = useAuthStore((state) => state.token);
  const { productsPayload } = useProducts(token);
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);

  useEffect(() => {
    console.log("useeffect");

    if (!products && productsPayload) {
      setProducts(productsPayload);
    }
    console.log("setPtoducts", products);
  }, [productsPayload, setProducts, products]);

  return (
    <>
      <Box sx={{ padding: 0 }}>
        <h1>Products</h1>
      </Box>
      {!products ? (
        <Progress />
      ) : (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid
                key={product.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 2.4, xl: 2 }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};
