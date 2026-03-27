import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, padding: "64px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
            Internal
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "36px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "48px" }}>
            Admin Dashboard
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              { href: "/admin/emails", label: "Email Sequences", desc: "Klaviyo flow previews — post-purchase, impact updates, welcome series" },
              { href: "/admin/orders", label: "Orders & Database", desc: "SQLite order log, impact records, founding member list" },
              { href: "/api/impact", label: "Impact API", desc: "Live JSON: therapy sessions funded, total orders" },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "28px",
                    backgroundColor: "var(--surface)",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}
                >
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>{item.label}</p>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
