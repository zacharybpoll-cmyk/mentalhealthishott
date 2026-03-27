"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS, ProductSize, ProductColor } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({ product, size: selectedSize, color: selectedColor, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Product image */}
          <div
            style={{
              aspectRatio: "3/4",
              backgroundColor: selectedColor === "black" ? "#1a1a1a" : selectedColor === "white" ? "#F8F8F8" : "#F0EDE8",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "sticky",
              top: "88px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(20px, 3vw, 28px)",
                  color: selectedColor === "black" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                Mental Health
                <br />
                is Hott
              </p>
              {product.isFounding && (
                <p
                  style={{
                    marginTop: "24px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  Founding Collection
                </p>
              )}
            </div>
          </div>

          {/* Product details */}
          <div>
            {/* Founding badge */}
            {product.isFounding && (
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "12px",
                }}
              >
                Founding Collection
              </p>
            )}

            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              ${product.price}
            </p>

            {/* Impact callout */}
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                This purchase funds{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {product.therapySessions} therapy session{product.therapySessions > 1 ? "s" : ""}
                </strong>{" "}
                for someone who can&apos;t afford care.
              </p>
            </div>

            <p
              style={{
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors.length > 1 && (
              <div style={{ marginBottom: "24px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                  }}
                >
                  Color: {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor:
                          color === "black" ? "#111" : color === "white" ? "#fff" : "#F0EDE8",
                        border:
                          selectedColor === color
                            ? "2px solid var(--text-primary)"
                            : "1px solid var(--border)",
                        cursor: "pointer",
                        outline: selectedColor === color ? "2px solid var(--background)" : "none",
                        outlineOffset: "2px",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  Size
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "10px 16px",
                      border:
                        selectedSize === size
                          ? "2px solid var(--text-primary)"
                          : "1px solid var(--border)",
                      backgroundColor:
                        selectedSize === size ? "var(--text-primary)" : "transparent",
                      color: selectedSize === size ? "var(--white)" : "var(--text-primary)",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      borderRadius: "2px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginTop: "8px",
                  }}
                >
                  Please select a size
                </p>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: added ? "var(--accent-dark)" : "var(--black)",
                color: "var(--white)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "2px",
                cursor: selectedSize ? "pointer" : "not-allowed",
                opacity: selectedSize ? 1 : 0.4,
                transition: "background-color 0.2s ease",
                marginBottom: "48px",
              }}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>

            {/* Product details */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                Details
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {product.details.map((detail) => (
                  <li
                    key={detail}
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      paddingBottom: "8px",
                      borderBottom: "1px solid var(--border)",
                      marginBottom: "8px",
                    }}
                  >
                    {detail}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "16px" }}>
                {product.careInstructions}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
