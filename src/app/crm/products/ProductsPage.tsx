"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";
import { ProductCreate } from "@/components/ProductCreate";
import { useProductsStore } from "@/store/products";
import { Product } from "@/types";

type Props = {
  productsPayload: Product[];
};

export default function ProductsPage({ productsPayload }: Props) {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProducts(productsPayload);
  }, [productsPayload, setProducts]);

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    return [...products].sort((a, b) => {
      const dateA = new Date(a.created_at ?? 0).getTime();
      const dateB = new Date(b.created_at ?? 0).getTime();
      return dateB - dateA;
    });
  }, [products]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1">
          Products
        </Typography>

        <Button
          variant="outlined"
          onClick={() => setIsModalOpen(true)}
          sx={{
            minWidth: 150,
            py: 1,
          }}
        >
          Add product
        </Button>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Create product"
      >
        <ProductCreate onSuccess={handleCloseModal} />
      </Modal>

      {sortedProducts.length === 0 ? (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary" gutterBottom>
            No products yet.
          </Typography>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Create your first product
          </Button>
        </Box>
      ) : (
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
      )}
    </Box>
  );
}
