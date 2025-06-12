import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tier: { type: String, enum: ['free', 'pro', 'agency'], default: 'free' },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  messagesUsed: { type: Number, default: 0 },
  validUntil: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);