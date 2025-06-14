import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICING_MAP = {
    starter: 'price_1RZxLtPp75mGhEfOj5tWhlVN',
    pro: 'price_1RZxRyPp75mGhEfOsAKR8Tus',
};

export async function POST(req) {
    const { userId } = auth();
    const body = await req.json();
    const plan = body.plan; // "starter" or "pro"

    if (!PRICING_MAP[plan]) {
        return new Response('Invalid plan selected', { status: 400 });
    }

    // Get Clerk user
    const userRes = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
    });
    const user = await userRes.json();

    const stripeCustomerId = user.private_metadata?.stripeCustomerId;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer: stripeCustomerId,
        line_items: [
            {
                price: PRICING_MAP[plan],
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        metadata: { userId, plan }, // helpful in webhook
    });

    return Response.json({ sessionId: session.id });
}
