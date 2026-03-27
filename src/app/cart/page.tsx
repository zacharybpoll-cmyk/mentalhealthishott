"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalSessions } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "32px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Your cart is empty.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "40px" }}>
            The collection is waiting.
          </p>
          <Link
            href="/products"
            style={{
              backgroundColor: "var(--black)",
              color: "var(--white)",
              padding: "16px 40px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
            }}
          >
            Shop Now
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "36px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "48px",
            }}
          >
            Your Cart
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px", alignItems: "start" }}>
            {/* Line items */}
            <div>
              {items.map((item) => (
                <div
                  key={`${item.product.slug}-${item.size}-${item.color}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    gap: "16px",
                    padding: "24px 0",
                    borderBottom: "1px solid var(--border)",
                    alignItems: "start",
                  }}
                >
                  {/* Product thumbnail */}
                  <div
                    style={{
                      width: "80px",
                      height: "96px",
                      backgroundColor: item.color === "black" ? "#1a1a1a" : "#F0EDE8",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "7px",
                        color: item.color === "black" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
                        textAlign: "center",
                        fontStyle: "italic",
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      MHIH
                    </p>
                  </div>

                  {/* Details */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div>
                        <p style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "4px" }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "12px" }}>
                          {item.color.charAt(0).toUpperCase() + item.color.slice(1)} / {item.size}
                        </p>
                      </div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>
                        ${item.product.price * item.quantity}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Quantity */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid var(--border)", borderRadius: "2px", padding: "4px" }}>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.size, item.color, item.quantity - 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: "14px", fontWeight: 500, minWidth: "20px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.size, item.color, item.quantity + 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.slug, item.size, item.color)}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          textDecoration: "underline",
                          textUnderlineOffset: "2px",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "4px",
                padding: "24px",
                position: "sticky",
                top: "88px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                }}
              >
                Order Summary
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Subtotal</p>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>${subtotal}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Shipping</p>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Calculated at checkout</p>
              </div>

              {/* Impact summary */}
              <div
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "12px",
                  marginBottom: "20px",
                  marginTop: "8px",
                }}
              >
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  This order funds{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {totalSessions} therapy session{totalSessions > 1 ? "s" : ""}
                  </strong>
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "16px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>Total</p>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>${subtotal}</p>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                style={{
                  width: "100%",
                  padding: "16px",
                  backgroundColor: "var(--black)",
                  color: "var(--white)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
