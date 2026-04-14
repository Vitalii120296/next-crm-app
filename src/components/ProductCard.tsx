import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "@/types";
import React, { useState } from "react";
import Modal from "./Modal";
import { Box } from "@mui/system";
import { deleteProductService } from "@/services/products/deleteProduct";
import { useProductsStore } from "@/store/products";
import { ProductDetails } from "./ProductDetails";

export default function ProductCard({ product }: { product: Product }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const removeProduct = useProductsStore((state) => state.removeProduct);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const deleteProduct = async (productId: string) => {
    try {
      await deleteProductService(productId);

      removeProduct(productId);
      setIsDeleting(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
      setIsDeleting(false);
    }
  };

  const handleDelete = () => {
    setIsDeleting((prev) => !prev);
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        backgroundColor: "background.default",
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          borderRadius: 1,
        }}
        image={"/productImages/defaultProductImage.webp"}
        title={product.name}
      />
      <CardContent className="flex flex-col grow">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {product.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "text.secondary",
            fontSize: "1rem",
          }}
        >
          {product.price ? `$${product.price}` : "Price not specified"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setSelectedProduct(product)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          Delete
        </Button>
        <Modal open={isDeleting} onClose={handleDelete} title="Confirm delete">
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}
          >
            <Button onClick={handleDelete} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteProduct(product.id);
              }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Modal>
        <Modal
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title="Update product"
        >
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Modal>
      </CardActions>
    </Card>
  );
}
