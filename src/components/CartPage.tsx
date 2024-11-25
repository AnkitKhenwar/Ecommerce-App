import React, { useContext } from "react";
import { Cart, MyContextType } from "../App";
import { Link } from "react-router";

const CartPage = () => {
  const cartValue = useContext<MyContextType | null>(Cart); // Get the cart context value
  const cartItems = cartValue?.value;
  console.log(cartItems);
  // Function to update quantity
  const updateQuantity = (item: string, quantity: number) => {
    if (cartValue && quantity >= 0) {
      cartValue.updateValue({
        [item]: quantity,
      });
    }
  };

  // Function to remove an item from the cart
  const removeItem = (item: string) => {
    if (cartValue) {
      // Create a shallow copy of the cart
      const updatedCart = { ...cartItems };

      // Remove the item from the cart object
      delete updatedCart[item];

      // Update the cart context with the modified cart
      cartValue.updateValue(updatedCart);
    }
  };

  // Calculate total items and total price
  const totalItems = cartItems
    ? Object.values(cartItems).reduce((acc, qty) => acc + qty, 0)
    : 0;

  const totalPrice = cartItems
    ? Object.entries(cartItems).reduce((acc, [item, qty]) => {
        const price = 20; // Assume each item costs $20 for simplicity
        return acc + price * qty;
      }, 0)
    : 0;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Your Shopping Cart
      </h2>
      {cartItems && Object.keys(cartItems).length > 0 ? (
        <div style={{ marginBottom: "20px" }}>
          {Object.entries(cartItems).map(([item, quantity]) => (
            <div
              key={item}
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <strong>{item}</strong>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item, quantity - 1)}
                    style={{
                      backgroundColor: "#ff9900",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    disabled={quantity === 0}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item, quantity + 1)}
                    style={{
                      backgroundColor: "#ff9900",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item)} // Remove the item on click
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: "18px", color: "#999" }}>
          Your cart is empty.
        </div>
      )}

      <div
        style={{
          marginTop: "30px",
          textAlign: "right",
          padding: "15px",
          backgroundColor: "#f1f1f1",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontSize: "18px", marginBottom: "10px" }}>
          Total Items: {totalItems}
        </div>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          paddingTop: "15px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </Link>
        <button
          style={{
            backgroundColor: "#ff9900",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
          }}
          disabled={totalItems === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
