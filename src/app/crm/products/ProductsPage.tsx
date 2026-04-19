"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "@/components/ProductCard";
import { useAuthStore } from "@/store/user";
import { useEffect, useMemo, useState } from "react";
import { useProductsStore } from "@/store/products";
import { useProducts } from "@/services/products/hooks/useProducts";
import { Progress } from "@/components/Progress";
import Button from "@mui/material/Button";
import Modal from "@/components/Modal";
import { ProductCreate } from "@/components/ProductCreate";

export const ProductsPage = () => {
  const token = useAuthStore((state) => state.token);
  const { productsPayload } = useProducts(token);
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    if (!products) return null;

    return [...products].sort((a, b) => {
      const dateA = new Date(a.createdAt!).getTime();
      const dateB = new Date(b.createdAt!).getTime();
      return dateB - dateA;
    });
  }, [products]);

  const handleCreateProduct = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!products && productsPayload) {
      setProducts(productsPayload);
    }
  }, [productsPayload, setProducts, products]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={handleCreateProduct}
          sx={{
            width: "150px",
            height: "26px",
            boxSizing: "border-box",
            display: "flex",
            py: 2,
          }}
        >
          Add product
        </Button>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create product"
        >
          <ProductCreate />
        </Modal>
      </Box>
      {!sortedProducts ? (
        <Progress />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid
                key={product.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
