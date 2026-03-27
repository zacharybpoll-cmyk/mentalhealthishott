import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--surface)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "48px",
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "12px",
            }}
          >
            Mental Health is Hott
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
              maxWidth: "240px",
            }}
          >
            Premium wellness apparel. Every purchase funds a therapy session for someone who needs it.
          </p>
        </div>

        {/* Shop */}
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            Shop
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/products", label: "All Products" },
              { href: "/products?category=hoodie", label: "Hoodies" },
              { href: "/products?category=tee", label: "Tees" },
              { href: "/products?category=set", label: "Sets" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            Mission
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/impact", label: "Impact Dashboard" },
              { href: "https://instagram.com/mentalhealthishott", label: "@mentalhealthishott" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px 32px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} Mental Health is Hott, LLC. All rights reserved.
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Clarity starts here.
        </p>
      </div>
    </footer>
  );
}
