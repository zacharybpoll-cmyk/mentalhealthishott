import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createOrder, createOrderItems, recordImpact, updateOrderStatus } from "@/lib/db";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const metadata = session.metadata ?? {};
      const instagramHandle = metadata.instagram_handle ?? "";
      const sessionsFunded = parseInt(metadata.therapy_sessions_funded ?? "1", 10);

      // Parse items from metadata
      let items: Array<{ slug: string; quantity: number; size: string; color: string }> = [];
      try {
        items = JSON.parse(metadata.items_json ?? "[]");
      } catch {
        console.warn("Could not parse items_json from metadata");
      }

      // Create order record
      const orderId = createOrder({
        stripe_session_id: session.id,
        customer_email: session.customer_email ?? "",
        instagram_handle: instagramHandle,
        total: session.amount_total ?? 0,
        status: "paid",
      });

      // Create order item records
      if (items.length > 0) {
        createOrderItems(
          items.map((item) => ({
            order_id: orderId,
            product_slug: item.slug,
            product_name: item.slug,
            quantity: item.quantity,
            price: 0, // price stored in Stripe line items
          }))
        );
      }

      // Record impact
      recordImpact(orderId, sessionsFunded);

      // TODO: Trigger Klaviyo email (stub)
      console.log(`[EMAIL STUB] Order confirmed for ${session.customer_email}. Sessions funded: ${sessionsFunded}`);

      // TODO: Trigger Status Engine / IG story (deferred)
      if (instagramHandle) {
        console.log(`[STATUS ENGINE STUB] Would post impact story for @${instagramHandle}`);
      }

      console.log(`Order ${session.id} recorded. Funded ${sessionsFunded} therapy session(s).`);
    } catch (err) {
      console.error("Error processing webhook:", err);
      return NextResponse.json({ error: "Order processing failed" }, { status: 500 });
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      updateOrderStatus(session.id, "expired");
    } catch {
      // Session may not exist in DB if it never completed
    }
  }

  return NextResponse.json({ received: true });
}
