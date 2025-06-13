import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import MessageHistory from '@/components/MessageHistory';

export default async function HistoryPage() {
  const { userId } = await auth();
  await dbConnect();
  
  const messages = await Message.find({ userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Message History</h2>
      <MessageHistory messages={JSON.parse(JSON.stringify(messages))} />
    </div>
  );
}