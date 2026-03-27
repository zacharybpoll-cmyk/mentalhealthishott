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
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

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
          {/* Product image gallery */}
          <div style={{ position: "sticky", top: "88px" }}>
            {/* Main image / video */}
            <div
              style={{
                aspectRatio: "3/4",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "#f0ede8",
                marginBottom: "12px",
              }}
            >
              {showVideo && product.video ? (
                <video
                  src={product.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            {/* Thumbnails + video thumb */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImage(i); setShowVideo(false); }}
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: !showVideo && activeImage === i ? "2px solid #111" : "1px solid var(--border)",
                    padding: 0,
                    cursor: "pointer",
                    backgroundColor: "#f0ede8",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
              {product.video && (
                <button
                  onClick={() => setShowVideo(true)}
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: showVideo ? "2px solid #111" : "1px solid var(--border)",
                    padding: 0,
                    cursor: "pointer",
                    backgroundColor: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontSize: "18px", color: "white" }}>▶</span>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Film</span>
                </button>
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
                borderLeft: "3px solid var(--accent)",
                borderRadius: "0 4px 4px 0",
                padding: "14px 16px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>Every purchase funds a therapy session</strong>{" "}
                for someone who can&apos;t afford care. No gimmicks. Real sessions, real people.
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
