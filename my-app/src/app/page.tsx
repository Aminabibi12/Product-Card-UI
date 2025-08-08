"use client";

import React from "react";
import ProductCard from "./components/ProductCard";
import CartIcon from "./components/CartIcon";
import { CartProvider } from "./components/CartContext";

import tShirtImage1 from "./images/t-s.webp";
import tShirtImage2 from "./images/ts2.jpg";
import tShirtImage3 from "./images/ts3.jpg";

const products = [
  {
    id: 1,
    name: "Classic T-Shirt 1",
    price: 29.99,
    variants: ["Small", "Medium", "Large"],
    image: tShirtImage1.src,
    inStock: true,
  },
  {
    id: 2,
    name: "Classic T-Shirt 2",
    price: 35.5,
    variants: ["Small", "Medium", "Large"],
    image: tShirtImage2.src,
    inStock: true,
  },
  {
    id: 3,
    name: "Classic T-Shirt 3",
    price: 40.0,
    variants: ["Small", "Medium", "Large"],
    image: tShirtImage3.src,
    inStock: false,
  },
];

export default function Page() {
  return (
    <CartProvider>
      <main className="page-container" style={{ padding: "1rem" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontWeight: "600",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            marginBottom: "2rem",
          }}
        >
          Product card web page
        </h1>

        <CartIcon />

        <div className="cards-row" style={{ display: "flex", gap: "1rem" }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </CartProvider>
  );
}
