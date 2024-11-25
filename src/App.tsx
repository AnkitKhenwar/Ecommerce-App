import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";

export interface DynamicObject {
  [key: string]: number; // Keys are strings, and values are numbers
}

export interface MyContextType {
  value: DynamicObject;
  updateValue: (newValue: DynamicObject) => void;
}

export const Cart = createContext<MyContextType | null>(null);

function App() {
  // Try to get the cart value from localStorage or initialize as an empty object
  const [cartValue, setCartValue] = useState<DynamicObject>(
    JSON.parse(localStorage.getItem("cart") || "{}")
  );

  // Save cartValue to localStorage whenever it changes
  useEffect(() => {
    if (cartValue && Object.keys(cartValue).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartValue));
    }
  }, [cartValue]);

  function setData(val: DynamicObject) {
    setCartValue((prevValue) => {
      const updatedCart = { ...prevValue, ...val };
      return updatedCart;
    });
  }

  return (
    <Cart.Provider value={{ value: cartValue, updateValue: setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </Cart.Provider>
  );
}

export default App;
