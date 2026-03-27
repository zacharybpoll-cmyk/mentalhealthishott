import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Shop — Mental Health is Hott",
  description: "Founding Collection. Limited to 100 units.",
};

export default function ProductsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flex: 1, padding: "64px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Page header */}
          <div style={{ marginBottom: "56px", textAlign: "center" }}>
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
              Founding Collection
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              The Collection
            </h1>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              100 units. Once they&apos;re gone, they&apos;re gone. Every piece funds a therapy session.
            </p>
          </div>

          {/* Product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
