import dbConnect from '@/lib/db';
import Subscription from '@/models/Subscription';

export async function checkSubscription(userId) {
  if (!userId) return false;
  
  await dbConnect();
  
  const subscription = await Subscription.findOne({ userId });
  
  if (!subscription) return false;
  
  // Check if subscription is still valid
  if (subscription.validUntil && new Date(subscription.validUntil) > new Date()) {
    return subscription.tier === 'pro' || subscription.tier === 'agency';
  }
  
  return false;
}

export async function getMessageLimit(userId) {
  const isPro = await checkSubscription(userId);
  
  if (isPro) {
    return 200; // Pro plan limit
  }
  
  return 5000; // Free plan limit
}