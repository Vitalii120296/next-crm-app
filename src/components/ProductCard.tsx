"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
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
        image={product.image}
        title={product.title}
      />
      <CardContent className="flex flex-col grow">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-center"
        >
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" variant="outlined">
          Edit
        </Button>
        <Button size="small" variant="outlined" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
