"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  variants: string[];
  image: string;
  inStock: boolean;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({ 
      id: product.id,
      name: product.name,
      price: product.price,
      variantSelected: selectedVariant,
      image: product.image,
    });
  }

  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price.toFixed(2)}</p>

      <label htmlFor={`variant-${product.id}`} className="variant-label">
        Variant:
      </label>
      <select
        id={`variant-${product.id}`}
        className="variant-select"
        value={selectedVariant}
        onChange={(e) => setSelectedVariant(e.target.value)}
      >
        {product.variants.map((variant) => (
          <option key={variant} value={variant}>
            {variant}
          </option>
        ))}
      </select>

      {product.inStock ? (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      ) : (
        <button className="out-of-stock-btn" disabled>
          Out of Stock
        </button>
      )}
    </div>
  );
}
