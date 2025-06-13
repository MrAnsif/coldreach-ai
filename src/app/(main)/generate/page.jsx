'use client';

import MessageForm from '@/components/MessageForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const [defaultType, setDefaultType] = useState('email');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && ['email', 'linkedin', 'twitter'].includes(type)) {
      setDefaultType(type);
    }
  }, [searchParams]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Generate Cold Message
      </h2>
      <MessageForm defaultType={defaultType} />
    </div>
  );
}