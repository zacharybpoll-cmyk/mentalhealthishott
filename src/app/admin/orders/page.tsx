import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllOrders, getImpactBreakdown } from "@/lib/db";

export const revalidate = 0;

export default function OrdersPage() {
  let orders: ReturnType<typeof getAllOrders> = [];
  let breakdown = { total_sessions: 0, total_orders: 0, total_revenue: 0 };

  try {
    orders = getAllOrders();
    breakdown = getImpactBreakdown();
  } catch {
    // DB may be empty on first run
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
            Admin · SQLite
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "40px" }}>
            Orders & Database
          </h1>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
            {[
              { label: "Therapy Sessions Funded", value: breakdown.total_sessions },
              { label: "Paid Orders", value: breakdown.total_orders },
              { label: "Total Revenue", value: `$${(breakdown.total_revenue / 100).toFixed(2)}` },
            ].map((stat) => (
              <div key={stat.label} style={{ border: "1px solid var(--border)", borderRadius: "4px", padding: "24px", backgroundColor: "var(--surface)" }}>
                <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif", marginBottom: "6px" }}>{stat.value}</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Schema */}
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Database Schema — mhih.db (SQLite)
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {[
                {
                  table: "orders",
                  cols: ["id", "stripe_session_id", "customer_email", "instagram_handle", "total", "status", "created_at"],
                },
                {
                  table: "order_items",
                  cols: ["id", "order_id →orders", "product_slug", "product_name", "quantity", "price"],
                },
                {
                  table: "impact",
                  cols: ["id", "order_id →orders", "therapy_sessions_funded", "recipient_story", "created_at"],
                },
              ].map((t) => (
                <div key={t.table} style={{ border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden", backgroundColor: "var(--surface)" }}>
                  <div style={{ backgroundColor: "#111", padding: "10px 16px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "white", fontFamily: "monospace" }}>{t.table}</p>
                  </div>
                  {t.cols.map((col) => (
                    <p key={col} style={{ fontSize: "12px", color: "var(--text-secondary)", padding: "6px 16px", borderBottom: "1px solid var(--border)", fontFamily: "monospace", margin: 0 }}>
                      {col}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Orders table */}
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>
              Recent Orders ({orders.length})
            </p>
            {orders.length === 0 ? (
              <div style={{ border: "1px solid var(--border)", borderRadius: "4px", padding: "48px", textAlign: "center", backgroundColor: "var(--surface)" }}>
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>No orders yet. Complete a test purchase to see records here.</p>
              </div>
            ) : (
              <div style={{ border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--surface)" }}>
                      {["Date", "Email", "Instagram", "Items", "Total", "Sessions", "Status"].map((h) => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid var(--border)" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      let items: Array<{ name: string; qty: number; price: number }> = [];
                      try { items = JSON.parse(order.items); } catch { /* empty */ }
                      return (
                        <tr key={order.id} style={{ borderBottom: "1px solid var(--border)" }}>
                          <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{order.created_at.slice(0, 10)}</td>
                          <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>{order.customer_email || "—"}</td>
                          <td style={{ padding: "12px 16px", color: "var(--accent)" }}>{order.instagram_handle ? `@${order.instagram_handle}` : "—"}</td>
                          <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{items.map((i) => `${i.name} ×${i.qty}`).join(", ")}</td>
                          <td style={{ padding: "12px 16px", color: "var(--text-primary)", fontWeight: 500 }}>${(order.total / 100).toFixed(2)}</td>
                          <td style={{ padding: "12px 16px", color: "var(--accent)", fontWeight: 500 }}>{order.sessions_funded}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "2px", fontSize: "11px", fontWeight: 600, backgroundColor: order.status === "paid" ? "#d1fae5" : "#fef3c7", color: order.status === "paid" ? "#065f46" : "#92400e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
