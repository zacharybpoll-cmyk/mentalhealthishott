"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "4px",
          overflow: "hidden",
          transition: "transform 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        {/* Product image */}
        <div
          style={{
            aspectRatio: "3/4",
            backgroundColor: "#F0EDE8",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "14px", color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "16px", fontStyle: "italic" }}>
                Mental Health<br />is Hott
              </p>
            </div>
          )}

          {/* Founding badge */}
          {product.isFounding && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                backgroundColor: "var(--accent)",
                color: "var(--white)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 8px",
                borderRadius: "2px",
              }}
            >
              Founding
            </div>
          )}
        </div>

        {/* Product info */}
        <div style={{ padding: "16px" }}>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            {product.name}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "8px",
            }}
          >
            {product.tagline}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>
              ${product.price}
            </p>
            <p style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 500 }}>
              Funds {product.therapySessions} session{product.therapySessions > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
