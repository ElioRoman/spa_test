import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";

const ProductPage = () => {
  const { productId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Typography
              variant="h4"
              gutterBottom
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              {product.title}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      <strong>Категорія:</strong> {product.category}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Опис:</strong> {product.description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Ціна:</strong> {product.price} грн
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductPage;
