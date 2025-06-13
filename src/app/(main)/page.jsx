import Link from 'next/link';
import { auth } from '@clerk/nextjs/server'
import SubscriptionTier from '@/components/SubscriptionTier';
import { checkSubscription } from '@/lib/subscription';

export default async function Dashboard() {
  const { userId } = auth();
  const isPro = await checkSubscription(userId);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to ColdMessageGen</h2>
        <p className="text-gray-600 mb-6">
          Generate personalized cold messages for email, LinkedIn, and Twitter with AI.
        </p>
        <Link
          href="/generate"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Start Generating Messages
        </Link>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Subscription</h3>
        <SubscriptionTier isPro={isPro} />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/generate?type=email"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h4 className="font-medium">Email Message</h4>
            <p className="text-sm text-gray-500">Professional outreach emails</p>
          </Link>
          <Link
            href="/generate?type=linkedin"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h4 className="font-medium">LinkedIn DM</h4>
            <p className="text-sm text-gray-500">Connection messages</p>
          </Link>
          <Link
            href="/generate?type=twitter"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h4 className="font-medium">Twitter DM</h4>
            <p className="text-sm text-gray-500">Direct messages</p>
          </Link>
        </div>
      </div>
    </div>
  );
}