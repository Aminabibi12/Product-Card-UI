"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function CartIcon() {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ position: "fixed", top: 10, left: 10, zIndex: 1000 }}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle cart"
        style={{
          position: "relative",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.8rem",
        }}
      >
        🛒
        {cart.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {cart.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "320px",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(({ cartItemId, name, variantSelected, price }) => (
                <div
                  key={cartItemId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <strong>{name}</strong> <em>({variantSelected})</em>
                    <br />
                    <small>${price.toFixed(2)}</small>
                  </div>
                  <button
                    onClick={() => removeFromCart(cartItemId)}
                    style={{
                      background: "red",
                      border: "none",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer",
                      padding: "0.25rem 0.5rem",
                    }}
                    aria-label={`Remove one ${name} (${variantSelected})`}
                  >
                    &minus;
                  </button>
                </div>
              ))}

              <hr style={{ margin: "1rem 0" }} />
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "right",
                }}
              >
                Total: ${totalAmount.toFixed(2)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
