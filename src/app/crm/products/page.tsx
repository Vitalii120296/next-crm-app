"use client";

import { getProductsTestApi } from "@/api/products.test-api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [trash, setTrash] = useState<Product[]>([]);
  const [showEditIcons, setShowEditIcons] = useState<boolean>(false);
  const [showTrash, setShowTrash] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsTestApi()
      .then((res) => {
        setProducts(res);
      })
      .finally(() => {
        setLoading(false);
      });

    // if (showTrash) {
    //   productService
    //     .getAll()
    //     .then((res) => {
    //       setTrash(res);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }
  }, [showTrash]);

  const handleCreate = () => {};

  const handleTrash = () => {
    setShowTrash((prev) => !prev);
  };
  return (
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
  );
};

export default ProductsPage;
