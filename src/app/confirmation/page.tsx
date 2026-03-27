"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <main style={{ flex: 1, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Impact moment */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "var(--black)",
            margin: "0 auto 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "32px", color: "var(--white)" }}>✓</span>
        </div>

        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          You did it.
        </p>

        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "24px",
            lineHeight: 1.15,
          }}
        >
          Your purchase just funded
          <br />a therapy session.
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "16px",
          }}
        >
          Welcome to the Founding Collection. You&apos;re not just buying a hoodie — you&apos;re part of a movement that
          believes mental health care should be accessible to everyone.
        </p>

        <p
          style={{
            fontSize: "17px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}
        >
          A real person will receive therapy because you showed up today. We&apos;ll send your order confirmation and
          tracking to your email.
        </p>

        {/* Impact badge */}
        <div
          style={{
            backgroundColor: "var(--black)",
            color: "var(--white)",
            borderRadius: "4px",
            padding: "32px",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            Founding Member Badge
          </p>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Mental Health is Hott
          </p>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            Founding Collection · {new Date().getFullYear()}
          </p>
        </div>

        {/* Next steps */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/impact"
            style={{
              backgroundColor: "var(--black)",
              color: "var(--white)",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
            }}
          >
            See Your Impact
          </Link>
          <Link
            href="/products"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
            }}
          >
            Keep Shopping
          </Link>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            marginTop: "48px",
          }}
        >
          Follow us on Instagram{" "}
          <a
            href="https://instagram.com/mentalhealthishott"
            style={{ color: "var(--text-secondary)", textDecoration: "underline" }}
          >
            @mentalhealthishott
          </a>
        </p>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Suspense fallback={<main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><p>Loading...</p></main>}>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}
