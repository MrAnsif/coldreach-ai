'use client';

export default function SubscriptionTier({ isPro }) {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 messages/month',
        'Basic personalization',
        'Email support'
      ],
      cta: isPro ? 'Current Plan' : 'Your Plan',
      current: !isPro,
    },
    {
      name: 'Pro',
      price: '$15/month',
      features: [
        '200 messages/month',
        'Advanced personalization',
        'Spam analyzer',
        'Priority support'
      ],
      cta: isPro ? 'Current Plan' : 'Upgrade',
      current: isPro,
      highlighted: true
    },
    {
      name: 'Agency',
      price: '$59/month',
      features: [
        'Unlimited messages',
        'All Pro features',
        'Team members',
        'Dedicated support'
      ],
      cta: 'Upgrade',
      current: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`border rounded-lg p-6 ${
            tier.highlighted ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
          } ${tier.current ? 'bg-blue-50' : 'bg-white'}`}
        >
          <h3 className="text-lg font-medium">{tier.name}</h3>
          <p className="mt-2 text-3xl font-bold">{tier.price}</p>
          <ul className="mt-4 space-y-2">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            className={`mt-6 w-full py-2 px-4 rounded-md ${
              tier.current
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={tier.current}
          >
            {tier.cta}
          </button>
        </div>
      ))}
    </div>
  );
}