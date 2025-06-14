'use client';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const plans = [
    { name: 'Starter', id: 'starter', price: '$9/month' },
    { name: 'Pro', id: 'pro', price: '$29/month' },
];

export default function PricingPage() {
    const handleSubscribe = async (plan) => {
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            body: JSON.stringify({ plan }),
        });
        const { sessionId } = await res.json();

        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId });
    };

    return (
        <div className="grid gap-4">
            {plans.map(p => (
                <div key={p.id} className="rounded-xl border p-4">
                    <h2 className="text-xl font-bold">{p.name}</h2>
                    <p>{p.price}</p>
                    <button onClick={() => handleSubscribe(p.id)} className="btn mt-2">Choose {p.name}</button>
                </div>
            ))}
        </div>
    );
}
