"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div style={{ position: "fixed", top: 16, left: 16, zIndex: 1000 }}>
      {/* Cart icon button */}
      <button
        onClick={() => setShowCart((prev) => !prev)}
        style={{
          backgroundColor: "#4a90e2",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
        }}
        aria-label="Toggle Cart"
      >
        🛒 Cart ({cart.length})
      </button>

      {/* Cart dropdown */}
      {showCart && (
        <div
          style={{
            marginTop: "8px",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            maxWidth: "300px",
            maxHeight: "300px",
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {cart.map(({ cartItemId, name, variantSelected, price }) => (
                <li
                  key={cartItemId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <strong>{name}</strong> - {variantSelected}
                    <br />
                    <small>${price.toFixed(2)}</small>
                  </div>
                  <button
                    onClick={() => removeFromCart(cartItemId)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#e04f5f",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      lineHeight: 1,
                    }}
                    aria-label={`Remove ${name} ${variantSelected} from cart`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
