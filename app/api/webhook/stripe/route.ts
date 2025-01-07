import Stripe from "stripe";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import { supabaseAdmin } from "@/lib/supabase/admin";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;

const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: any) {
  const rawBody = await buffer(req.body);
  try {
    const sig = headers().get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
      return Response.json({ error: `Webhook Error ${err?.message!} ` });
    }

    // 24-Hour pass $2 (plan_type -> 1)
    // Monthly pass $5 (plan_type -> 2)
    console.log("event type: ", event.type);
    switch (event.type) {
      // for single payment
      case "charge.succeeded":
        console.log("event.type: ", event.type);
        // update here
        const result1 = event.data.object;
        const supabase1 = await supabaseAdmin();

        const start_at1 = new Date().toISOString();
        const end_at1 = new Date();
        end_at1.setHours(end_at1.getHours() + 24);

        const end_at1ISOString = end_at1.toISOString();
        const customer_id1 = result1.id as string;
        const subscription_id1 = result1.payment_intent as string;
        const plan_type1 = 1 as number;

        const email1 = result1.billing_details.email as string;

        console.log("CHARGE: ", end_at1ISOString, customer_id1, subscription_id1, plan_type1, email1)
        const { error: err } = await supabase1
          .from("subscriptions")
          .update({
            start_at: start_at1,
            end_at: end_at1ISOString,
            customer_id: customer_id1,
            subscription_id: subscription_id1,
            plan_type: plan_type1,
          })
          .eq("email", email1);
        if (err) {
          console.log(err);
          return Response.json({ error: err.message });
        }
        break;

      // for subscription payments
      case "invoice.payment_succeeded":
        console.log("event.type: ", event.type);
        // update here
        const result = event.data.object;
        const supabase = await supabaseAdmin();

        const start_at = new Date().toISOString();
        const end_at = new Date(
          result.lines.data[0].period.end * 1000
        ).toISOString();
        const customer_id = result.customer as string;
        const subscription_id = result.subscription as string;
        const plan_type = 2 as number;

        const email = result.customer_email as string;

        const { error } = await supabase
          .from("subscriptions")
          .update({
            start_at,
            end_at,
            customer_id,
            subscription_id,
            plan_type,
          })
          .eq("email", email);
        if (error) {
          console.log(error);
          return Response.json({ error: error.message });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return Response.json({});
  } catch (e) {
    return Response.json({ error: `Webhook Error}` });
  }
}

async function onPaymentSucceeded(
  start_at: string,
  end_at: string,
  customer_id: string,
  subscription_id: string,
  email: string,
  plan_type: number
) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscriptions")
    .update({
      start_at,
      end_at,
      customer_id,
      subscription_id,
      plan_type,
    })
    .eq("email", email);
  return error;
}

async function onSubCancel(subscription_id: string) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from("subscriptions")
    .update({
      customer_id: null,
      subscription_id: null,
    })
    .eq("subscription_id", subscription_id);
  return error;
}
