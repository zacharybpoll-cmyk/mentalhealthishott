"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--background)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Mental Health is Hott
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link
            href="/products"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Shop
          </Link>
          <Link
            href="/impact"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Impact
          </Link>
          <Link
            href="/cart"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Cart
            {totalItems > 0 && (
              <span
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--white)",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
