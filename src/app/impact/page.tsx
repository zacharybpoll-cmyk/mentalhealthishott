import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTotalTherapySessions, getTotalOrders } from "@/lib/db";

export const metadata = {
  title: "Impact — Mental Health is Hott",
  description: "Real-time impact dashboard. See the therapy sessions funded.",
};

export const revalidate = 60;

async function getStats() {
  try {
    return {
      sessions: getTotalTherapySessions(),
      orders: getTotalOrders(),
    };
  } catch {
    return { sessions: 0, orders: 0 };
  }
}

export default async function ImpactPage() {
  const { sessions, orders } = await getStats();
  const targetSessions = 100;
  const progress = Math.min((sessions / targetSessions) * 100, 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section
          style={{
            backgroundColor: "var(--black)",
            color: "var(--white)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
              Live Impact Dashboard
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(36px, 6vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Real sessions.
              <br />
              Real people.
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Every number here is a real person who received therapy because of this community.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "64px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "32px",
                marginBottom: "64px",
              }}
            >
              {[
                {
                  value: sessions,
                  label: "Therapy Sessions Funded",
                  description: "Real sliding-scale sessions",
                },
                {
                  value: orders,
                  label: "Founding Members",
                  description: "People who showed up first",
                },
                {
                  value: `${Math.round(progress)}%`,
                  label: "Founding Collection Sold",
                  description: `${targetSessions - orders > 0 ? targetSessions - orders : 0} units remaining`,
                },
              ].map(({ value, label, description }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: "var(--surface)",
                    borderRadius: "4px",
                    padding: "32px",
                    textAlign: "center",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "56px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}
                  >
                    {value}
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{description}</p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "4px",
                padding: "32px",
                border: "1px solid var(--border)",
                marginBottom: "48px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  alignItems: "baseline",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>
                  Founding Collection Progress
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  {orders} of 100 units
                </p>
              </div>
              <div
                style={{
                  height: "8px",
                  backgroundColor: "var(--border)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "var(--black)",
                    borderRadius: "4px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginTop: "12px",
                  lineHeight: 1.5,
                }}
              >
                {targetSessions - orders > 0
                  ? `${targetSessions - orders} units remaining. Once they're gone, the Founding Collection closes permanently.`
                  : "The Founding Collection is sold out. Thank you to all 100 founding members."}
              </p>
            </div>

            {/* How it works */}
            <div style={{ textAlign: "center" }}>
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
                How It Works
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "24px",
                }}
              >
                {[
                  { step: "1", title: "You buy", desc: "A portion of every purchase is allocated to therapy funding." },
                  { step: "2", title: "We match", desc: "We partner with sliding-scale therapists to place sessions." },
                  { step: "3", title: "They get care", desc: "A real person receives a subsidized therapy session." },
                  { step: "4", title: "We report", desc: "This dashboard updates in real time. No black boxes." },
                ].map(({ step, title, desc }) => (
                  <div key={step} style={{ padding: "24px", backgroundColor: "var(--surface)", borderRadius: "4px", border: "1px solid var(--border)" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "var(--accent)",
                        marginBottom: "8px",
                      }}
                    >
                      {step}
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                      {title}
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
