"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/store/products";
import { useAuthStore } from "@/store/user";
import { useEffect } from "react";
import { getProductsService } from "@/services/products/getProducts";

const ProductsPage = () => {
  const products = useProducts((state) => state.products);
  const setProducts = useProducts((state) => state.setProducts);
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    const productsPayload = getProductsService();

    setProducts(productsPayload);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        if (!currentUser) {
          setLoading(true);
          await waitForUser();
          await getProducts();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);
  return (
    <>
      {products && (
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

export default ProductsPage;
