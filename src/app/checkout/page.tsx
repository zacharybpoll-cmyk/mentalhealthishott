"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { items, subtotal, totalSessions, clearCart } = useCart();
  const router = useRouter();
  const [instagramHandle, setInstagramHandle] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Your cart is empty.
            </p>
            <Link
              href="/products"
              style={{ fontSize: "14px", color: "var(--text-primary)", textDecoration: "underline" }}
            >
              Back to shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.product.slug,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
          instagram_handle: instagramHandle.replace(/^@/, ""),
          email,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Checkout failed");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

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
            Checkout
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px", alignItems: "start" }}>
            {/* Form */}
            <div>
              {/* Order items recap */}
              <div style={{ marginBottom: "40px" }}>
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
                  Your Order
                </p>
                {items.map((item) => (
                  <div
                    key={`${item.product.slug}-${item.size}-${item.color}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {item.color.charAt(0).toUpperCase() + item.color.slice(1)} / {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div style={{ marginBottom: "32px" }}>
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
                  Contact
                </p>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      fontSize: "15px",
                      color: "var(--text-primary)",
                      backgroundColor: "var(--white)",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Instagram handle — the special field */}
                <div
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "20px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                    }}
                  >
                    Your Instagram handle
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "var(--accent)",
                        marginLeft: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Optional
                    </span>
                  </label>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      marginBottom: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    We&apos;ll tag you when we post your impact story. Founding members get a shoutout.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                    <span
                      style={{
                        padding: "12px 10px 12px 14px",
                        border: "1px solid var(--border)",
                        borderRight: "none",
                        borderRadius: "2px 0 0 2px",
                        fontSize: "15px",
                        color: "var(--text-muted)",
                        backgroundColor: "var(--background)",
                      }}
                    >
                      @
                    </span>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value.replace(/^@/, ""))}
                      placeholder="yourhandle"
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        border: "1px solid var(--border)",
                        borderRadius: "0 2px 2px 0",
                        fontSize: "15px",
                        color: "var(--text-primary)",
                        backgroundColor: "var(--white)",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px" }}>
                Shipping and payment details are handled securely by Stripe on the next page.
              </p>

              {error && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#c0392b",
                    marginBottom: "16px",
                    padding: "12px",
                    backgroundColor: "#fdf2f2",
                    borderRadius: "2px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "18px",
                  backgroundColor: "var(--black)",
                  color: "var(--white)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "2px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? "Redirecting to payment..." : "Continue to Payment"}
              </button>
            </div>

            {/* Summary */}
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
                <p style={{ fontSize: "14px", fontWeight: 500 }}>${subtotal}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Shipping</p>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>TBD</p>
              </div>

              <div
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "12px",
                  marginBottom: "16px",
                }}
              >
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Funds{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {totalSessions} therapy session{totalSessions > 1 ? "s" : ""}
                  </strong>
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: "16px", fontWeight: 600 }}>Total</p>
                <p style={{ fontSize: "16px", fontWeight: 700 }}>${subtotal}+</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
