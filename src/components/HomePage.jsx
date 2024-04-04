import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "./Header";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Typography
          variant="h2"
          gutterBottom
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Список товарів
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            style={{ flex: 1 }}
            label="Пошук за назвою"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Назва</TableCell>
                  <TableCell>Ціна</TableCell>
                  <TableCell>Зображення</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <Link
                        to={`/product/${product.id}`}
                        style={{
                          color: "blue",
                          textDecoration: "inherit",
                          fontWeight: "bold",
                        }}
                      >
                        {product.title}
                      </Link>
                    </TableCell>
                    <TableCell>{product.price} грн</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(filteredProducts.length / rowsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
