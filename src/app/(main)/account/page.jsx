import { auth } from '@clerk/nextjs/server';
import SubscriptionTier from '@/components/SubscriptionTier';
import { checkSubscription } from '@/lib/subscription';

export default async function AccountPage() {
  const { userId } = await auth();
  const isPro = await checkSubscription(userId);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Account</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
          <SubscriptionTier isPro={isPro} />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Billing</h3>
          <p className="text-gray-600 mb-4">
            {isPro ? 'You are currently on the Pro plan.' : 'You are currently on the Free plan.'}
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
          </button>
        </div>
      </div>
    </div>
  );
}