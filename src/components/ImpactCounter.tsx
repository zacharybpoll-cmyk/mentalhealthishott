interface ImpactCounterProps {
  sessions: number;
  orders: number;
}

export default function ImpactCounter({ sessions, orders }: ImpactCounterProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--black)",
        color: "var(--white)",
        padding: "48px 24px",
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
          marginBottom: "24px",
        }}
      >
        Founding Collection Impact
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "80px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {sessions}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Therapy Sessions Funded
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {orders}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Founding Members
          </p>
        </div>
      </div>
    </div>
  );
}
