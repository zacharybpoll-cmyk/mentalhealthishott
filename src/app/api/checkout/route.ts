import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";

interface CheckoutItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

interface CheckoutBody {
  items: CheckoutItem[];
  instagram_handle?: string;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, instagram_handle, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate items against our product catalog
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.slug === item.slug);
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Build Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: `Size: ${item.size} | Color: ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`,
          metadata: {
            slug: item.slug,
            size: item.size,
            color: item.color,
          },
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Calculate therapy sessions funded
    const totalSessions = items.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.slug === item.slug);
      return sum + (product?.therapySessions ?? 1) * item.quantity;
    }, 0);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      metadata: {
        instagram_handle: instagram_handle ?? "",
        therapy_sessions_funded: String(totalSessions),
        items_json: JSON.stringify(
          items.map((i) => ({ slug: i.slug, quantity: i.quantity, size: i.size, color: i.color }))
        ),
      },
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 799, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 8 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1499, currency: "usd" },
            display_name: "Expedited Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        },
      ],
      success_url: `${appUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
