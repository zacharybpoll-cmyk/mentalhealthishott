"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EMAILS = [
  {
    id: "welcome",
    flow: "Welcome / Post-Purchase",
    subject: "You just funded a therapy session. Here's what happens next.",
    delay: "Immediately after purchase",
    preview: "Welcome to the Founding Collection. You're now part of something real.",
    body: `
      <div style="max-width:560px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;color:#111;">
        <div style="background:#111;padding:32px 24px;text-align:center;">
          <img src="https://mentalhealthishott.com/images/logo/mhih-logo.png" alt="MHIH" style="width:40px;height:40px;margin-bottom:12px;" />
          <p style="color:#FAF9F6;font-family:Georgia,serif;font-size:20px;font-weight:600;letter-spacing:0.02em;margin:0;">Mental Health is Hott</p>
        </div>
        <div style="padding:48px 32px;">
          <p style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#C4A882;margin-bottom:16px;">Founding Collection · 2026</p>
          <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:700;line-height:1.1;margin-bottom:24px;">You just funded a therapy session.</h1>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:20px;">
            Your order is confirmed. But more importantly — a real person is going to receive therapy because you showed up today.
          </p>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:20px;">
            We work with a sliding-scale therapist network. Your purchase contributes directly to subsidizing sessions for people who can't afford standard rates. No gimmicks. No "a portion goes to" language. A real session, funded by you.
          </p>
          <div style="background:#FAF9F6;border:1px solid #e4e8ec;border-radius:4px;padding:24px;margin:32px 0;">
            <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#888;margin-bottom:12px;">Your Order</p>
            <p style="font-size:15px;color:#111;margin-bottom:4px;">{{order_items}}</p>
            <p style="font-size:13px;color:#666;">Ships in 5–7 business days via Shureprint · Los Angeles</p>
          </div>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:32px;">
            You're a Founding Member now. That's permanent. Check your impact at any time:
          </p>
          <a href="https://mentalhealthishott.com/impact" style="display:inline-block;background:#111;color:#FAF9F6;padding:14px 32px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;">See Your Impact</a>
        </div>
        <div style="border-top:1px solid #e4e8ec;padding:24px 32px;text-align:center;">
          <p style="font-size:12px;color:#999;margin-bottom:8px;">Follow us <a href="https://instagram.com/mentalhealthishott" style="color:#999;">@mentalhealthishott</a></p>
          <p style="font-size:11px;color:#bbb;">© 2026 Mental Health is Hott, LLC · <a href="#" style="color:#bbb;">Unsubscribe</a></p>
        </div>
      </div>
    `,
  },
  {
    id: "impact-update",
    flow: "Impact Update",
    subject: "Your therapy session was placed. Here's who it helped.",
    delay: "7 days after purchase",
    preview: "A real update on the impact your purchase made.",
    body: `
      <div style="max-width:560px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;color:#111;">
        <div style="background:#111;padding:32px 24px;text-align:center;">
          <img src="https://mentalhealthishott.com/images/logo/mhih-logo.png" alt="MHIH" style="width:40px;height:40px;margin-bottom:12px;" />
          <p style="color:#FAF9F6;font-family:Georgia,serif;font-size:20px;font-weight:600;letter-spacing:0.02em;margin:0;">Mental Health is Hott</p>
        </div>
        <div style="padding:48px 32px;">
          <p style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#C4A882;margin-bottom:16px;">Impact Update</p>
          <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:1.2;margin-bottom:24px;">Your session was placed.</h1>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:20px;">
            The therapy session funded by your purchase has been matched with a recipient through our sliding-scale network.
          </p>
          <div style="border-left:3px solid #C4A882;padding:16px 24px;margin:32px 0;background:#FAF9F6;">
            <p style="font-size:15px;font-style:italic;color:#333;line-height:1.6;margin:0;">
              "I've been on a waiting list for 8 months. This session was the first time I've talked to someone. I didn't know I needed it this much."
            </p>
            <p style="font-size:12px;color:#888;margin-top:12px;margin-bottom:0;">— Anonymous recipient, Los Angeles</p>
          </div>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:32px;">
            The Founding Collection is {{units_remaining}} units from being fully funded. Every unit is a real person who gets access to care.
          </p>
          <a href="https://mentalhealthishott.com/impact" style="display:inline-block;background:#111;color:#FAF9F6;padding:14px 32px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;margin-right:12px;">Live Impact Dashboard</a>
          <a href="https://mentalhealthishott.com/products" style="display:inline-block;border:1px solid #111;color:#111;padding:14px 32px;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;">Shop Again</a>
        </div>
        <div style="border-top:1px solid #e4e8ec;padding:24px 32px;text-align:center;">
          <p style="font-size:12px;color:#999;margin-bottom:8px;">Follow us <a href="https://instagram.com/mentalhealthishott" style="color:#999;">@mentalhealthishott</a></p>
          <p style="font-size:11px;color:#bbb;">© 2026 Mental Health is Hott, LLC · <a href="#" style="color:#bbb;">Unsubscribe</a></p>
        </div>
      </div>
    `,
  },
  {
    id: "shipping",
    flow: "Shipping Confirmation",
    subject: "Your order shipped. Wear it loud.",
    delay: "When tracking number available",
    preview: "Your MHIH order is on its way.",
    body: `
      <div style="max-width:560px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;color:#111;">
        <div style="background:#111;padding:32px 24px;text-align:center;">
          <img src="https://mentalhealthishott.com/images/logo/mhih-logo.png" alt="MHIH" style="width:40px;height:40px;margin-bottom:12px;" />
          <p style="color:#FAF9F6;font-family:Georgia,serif;font-size:20px;font-weight:600;letter-spacing:0.02em;margin:0;">Mental Health is Hott</p>
        </div>
        <div style="padding:48px 32px;">
          <p style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#C4A882;margin-bottom:16px;">Your Order Shipped</p>
          <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:1.2;margin-bottom:24px;">It&rsquo;s on its way. Wear it loud.</h1>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:32px;">
            Your Founding Collection piece shipped from Los Angeles. Estimated delivery: 3–5 business days.
          </p>
          <div style="background:#FAF9F6;border:1px solid #e4e8ec;border-radius:4px;padding:24px;margin-bottom:32px;">
            <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#888;margin-bottom:12px;">Tracking</p>
            <p style="font-size:15px;font-weight:500;color:#111;margin-bottom:4px;">{{tracking_number}}</p>
            <p style="font-size:13px;color:#666;">via {{carrier}} · {{estimated_delivery}}</p>
          </div>
          <p style="font-size:15px;color:#444;line-height:1.7;margin-bottom:24px;">When it arrives — wear it, tag us. Every time someone asks what it says, you get to start a conversation worth having.</p>
          <a href="https://instagram.com/mentalhealthishott" style="display:inline-block;background:#111;color:#FAF9F6;padding:14px 32px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;">Tag @mentalhealthishott</a>
        </div>
        <div style="border-top:1px solid #e4e8ec;padding:24px 32px;text-align:center;">
          <p style="font-size:11px;color:#bbb;">© 2026 Mental Health is Hott, LLC · <a href="#" style="color:#bbb;">Unsubscribe</a></p>
        </div>
      </div>
    `,
  },
  {
    id: "winback",
    flow: "Win-Back / Share",
    subject: "You were the first. Help us find the next one.",
    delay: "30 days after purchase",
    preview: "The Founding Collection is moving. Help spread it.",
    body: `
      <div style="max-width:560px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;color:#111;">
        <div style="background:#111;padding:32px 24px;text-align:center;">
          <img src="https://mentalhealthishott.com/images/logo/mhih-logo.png" alt="MHIH" style="width:40px;height:40px;margin-bottom:12px;" />
          <p style="color:#FAF9F6;font-family:Georgia,serif;font-size:20px;font-weight:600;letter-spacing:0.02em;margin:0;">Mental Health is Hott</p>
        </div>
        <div style="padding:48px 32px;">
          <p style="font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#C4A882;margin-bottom:16px;">Founding Member</p>
          <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:1.2;margin-bottom:24px;">You were the first. Help us find the next one.</h1>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:20px;">
            {{sessions_funded}} therapy sessions have been funded by the Founding Collection so far. That's {{sessions_funded}} real people who got access to care they couldn't afford.
          </p>
          <p style="font-size:16px;color:#444;line-height:1.7;margin-bottom:32px;">
            We're not running ads. We're growing through people who actually care. If that's you — share this with someone who should know about it.
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="https://mentalhealthishott.com" style="display:inline-block;background:#111;color:#FAF9F6;padding:14px 32px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;">Share the Site</a>
            <a href="https://mentalhealthishott.com/impact" style="display:inline-block;border:1px solid #111;color:#111;padding:14px 32px;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;border-radius:2px;">Your Impact</a>
          </div>
        </div>
        <div style="border-top:1px solid #e4e8ec;padding:24px 32px;text-align:center;">
          <p style="font-size:12px;color:#999;margin-bottom:8px;"><a href="https://instagram.com/mentalhealthishott" style="color:#999;">@mentalhealthishott</a></p>
          <p style="font-size:11px;color:#bbb;">© 2026 Mental Health is Hott, LLC · <a href="#" style="color:#bbb;">Unsubscribe</a></p>
        </div>
      </div>
    `,
  },
];

export default function EmailsPage() {
  const [activeEmail, setActiveEmail] = useState(EMAILS[0].id);
  const email = EMAILS.find((e) => e.id === activeEmail)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, padding: "48px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
            Admin · Klaviyo Flows
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "40px" }}>
            Email Sequences
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px", alignItems: "start" }}>
            {/* Flow list */}
            <div style={{ border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
              {EMAILS.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => setActiveEmail(e.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "16px 20px",
                    borderBottom: i < EMAILS.length - 1 ? "1px solid var(--border)" : "none",
                    backgroundColor: activeEmail === e.id ? "var(--black)" : "var(--surface)",
                    color: activeEmail === e.id ? "white" : "var(--text-primary)",
                    cursor: "pointer",
                    border: "none",
                    display: "block",
                  }}
                >
                  <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{e.flow}</p>
                  <p style={{ fontSize: "11px", opacity: 0.6, margin: 0 }}>{e.delay}</p>
                </button>
              ))}
            </div>

            {/* Preview panel */}
            <div>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", padding: "20px 24px", marginBottom: "24px" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Subject line</p>
                <p style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "12px" }}>{email.subject}</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Preview text: {email.preview}</p>
              </div>
              {/* Email render */}
              <div style={{ border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden", backgroundColor: "#f5f5f5", padding: "24px" }}>
                <div dangerouslySetInnerHTML={{ __html: email.body }} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
