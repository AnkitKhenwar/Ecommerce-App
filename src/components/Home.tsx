import React, { useEffect, useState, useContext } from "react";
import { Cart } from "../App";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type Rating = {
  rate: number;
  count: number;
};

export interface IProduct {
  category: string;
  description: string;
  id: number;
  price: number;
  image: string;
  rating: Rating;
  title: string;
}

const Home = () => {
  const cartContext = useContext(Cart);
  const cartValue = cartContext?.value || {};
  const navigate = useNavigate();
  const [data, setData] = useState<IProduct[]>([]);
  const [select, setSelect] = useState<string>("desc");
  const [category, setCategory] = useState<string>("");

  // Calculate total items in the cart
  const totalItems = Object.values(cartValue).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  useEffect(() => {
    async function getData() {
      try {
        const url =
          category.length > 0
            ? `https://fakestoreapi.com/products/category/${category}?sort=${select}`
            : `https://fakestoreapi.com/products`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Clear data on fetch error
      }
    }

    getData();
  }, [select, category]);

  const onProductDetail = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#131921",
          color: "white",
          flexDirection: { xs: "column", sm: "row" },
          gap: "15px",
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon Logo"
              style={{ height: "30px" }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <label>Choose Category:</label>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <option value="">All Categories</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <label>Choose Sorting Order:</label>
          <select
            name="order"
            id="order"
            onChange={(e) => setSelect(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Link
            to="/cart"
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            <div style={{ marginRight: "10px", fontSize: "20px" }}>
              <span role="img" aria-label="cart">
                🛒
              </span>
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>
              {totalItems > 0 ? totalItems : "Cart"}
            </div>
          </Link>
        </Box>
      </Box>

      <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: { xs: "24px", sm: "32px" },
          }}
        >
          Product List
        </Typography>

        {data.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "red", marginTop: "20px" }}
          >
            Fetching Products Please Wait...
          </Typography>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                display: { xs: "none", md: "block" },
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="responsive table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Thumbnail</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: { xs: "100px", sm: "250px" },
                        }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">
                        ${row.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          component="img"
                          src={row.image}
                          alt="Product"
                          sx={{
                            width: { xs: "40px", sm: "50px" },
                            height: { xs: "40px", sm: "50px" },
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => onProductDetail(row.id)}
                          sx={{
                            backgroundColor: "#007bff",
                            "&:hover": {
                              backgroundColor: "#0056b3",
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {data.map((row) => (
                <Card
                  key={row.id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    padding: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={row.image}
                    alt={row.title}
                    sx={{
                      width: { xs: "100%", sm: "150px" },
                      height: "150px",
                      objectFit: "contain",
                      marginBottom: { xs: "10px", sm: "0" },
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: { xs: "16px", sm: "18px" },
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      {row.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#28a745",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      ${row.price.toFixed(2)}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onProductDetail(row.id)}
                      sx={{
                        alignSelf: "flex-start",
                        backgroundColor: "#007bff",
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
