import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  inputs: {
    messageType: String,
    tone: String,
    format: String,
    context: String,
    length: String,
    cta: String,
    senderInfo: {
      fullName: String,
      jobTitle: String,
      company: String
    },
    recipientInfo: {
      name: String,
      jobTitle: String,
      company: String,
      sharedConnection: String,
      triggers: [String]
    }
  },
  generatedMessage: { type: String, required: true },
  spamScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Add index for faster queries
messageSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Message || mongoose.model('Message', messageSchema);