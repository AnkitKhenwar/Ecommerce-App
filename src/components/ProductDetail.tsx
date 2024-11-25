import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IProduct } from "./Home";
import { Cart, MyContextType } from "../App";

const ProductDetail = () => {
  const cartValue = useContext<MyContextType | null>(Cart);
  const [quantity, setQuantity] = useState<number>(0);
  const [data, setData] = useState<IProduct | undefined>();
  const { id } = useParams();
  const navigate = useNavigate();

  // Increment and decrement for quantity
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  useEffect(() => {
    // Fetch product data based on the ID
    const productData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        setData(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    productData();
  }, [id]);

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    if (!data || !cartValue) return; // Ensure data and cartValue exist

    const productTitle = data.title || "Unnamed Product";

    // Update cart with new quantity and price
    cartValue.updateValue({
      [productTitle]: quantity,
    });

    // Navigate to the cart page after adding the product
    navigate("/cart");
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f4f4f9",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <button
            type="button"
            style={{
              float: "left",
              backgroundColor: "black",
              color: "white",
              marginBottom: "10px",
              padding: "10px",
            }}
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>
          <img
            src={data?.image}
            alt={data?.title}
            style={{
              maxWidth: "300px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            {data?.title}
          </h2>
          <div
            style={{ fontSize: "20px", marginBottom: "15px", color: "#28a745" }}
          >
            ${data?.price}
          </div>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.5" }}>
            {data?.description}
          </p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button
                onClick={decrement}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "20px",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                -
              </button>
              <span style={{ fontSize: "22px", fontWeight: "600" }}>
                {quantity}
              </span>
              <button
                onClick={increment}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "20px",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "12px 30px",
                borderRadius: "5px",
                fontSize: "18px",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
              disabled={quantity === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
