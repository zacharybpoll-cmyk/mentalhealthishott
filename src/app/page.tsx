import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ImpactCounter from "@/components/ImpactCounter";
import { PRODUCTS } from "@/lib/products";
import { getTotalTherapySessions, getTotalOrders } from "@/lib/db";

export const revalidate = 60;

async function getImpactStats() {
  try {
    return {
      sessions: getTotalTherapySessions(),
      orders: getTotalOrders(),
    };
  } catch {
    return { sessions: 0, orders: 0 };
  }
}

export default async function HomePage() {
  const { sessions, orders } = await getImpactStats();
  const tier1Products = PRODUCTS.filter((p) => p.tier === 1).slice(0, 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            backgroundColor: "#1a1008",
            color: "var(--white)",
            height: "100vh",
            minHeight: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.jpg"
            alt="Mental Health is Hott"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
          {/* Subtle dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.28)",
            }}
          />
          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px" }}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(64px, 12vw, 160px)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "48px",
                textShadow: "0 2px 24px rgba(0,0,0,0.3)",
              }}
            >
              MENTAL<br />HEALTH<br />IS HOTT
            </h1>
            <Link
              href="/products"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.9)",
                color: "#FFFFFF",
                padding: "16px 48px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              SHOP THE COLLECTION
            </Link>
          </div>
        </section>

        {/* Impact counter */}
        <ImpactCounter sessions={sessions} orders={orders} />

        {/* Product grid */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "40px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Founding Collection
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  The Collection
                </h2>
              </div>
              <Link
                href="/products"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                View all
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              {tier1Products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Mission statement */}
        <section
          style={{
            backgroundColor: "var(--surface)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "80px 24px",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "24px",
              }}
            >
              Why We Exist
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "28px",
              }}
            >
              1 in 5 adults experience mental illness.
              <br />
              1 in 10 can afford to treat it.
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "16px",
              }}
            >
              Mental Health is Hott exists to change that ratio. We make premium apparel that starts
              conversations — because wearing your values is the most public thing you can do. And every
              purchase funds a real therapy session for someone in the sliding-scale network.
            </p>
            <p
              style={{
                fontSize: "17px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              No gimmicks. No greenwashing. 100 founding units. Real people, real sessions.
            </p>
          </div>
        </section>

        {/* Founding member CTA */}
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
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
              Be a Founder
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "24px",
              }}
            >
              100 units. Permanent badge.
              <br />
              First in line, forever.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "40px",
              }}
            >
              Founding Collection members get a permanent badge on the Impact Dashboard, early access to
              all future drops, and the knowledge that they were first.
            </p>
            <Link
              href="/products"
              style={{
                backgroundColor: "var(--black)",
                color: "var(--white)",
                padding: "18px 48px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                display: "inline-block",
              }}
            >
              Shop Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
