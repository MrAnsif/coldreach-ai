import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const event = await req.json();

  if (event.type === 'user.created') {
    const user = event.data;

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email_addresses[0]?.email_address,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
      metadata: {
        clerkUserId: user.id,
      },
    });

    // Save Stripe customer ID to Clerk metadata (via Clerk Admin API or from frontend)
    await fetch(`https://api.clerk.dev/v1/users/${user.id}/metadata`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        private_metadata: {
          stripeCustomerId: customer.id,
        },
      }),
    });
  }

  return new Response('OK', { status: 200 });
}
