'use client';

import { useState } from 'react';

export default function MessageHistory({ messages }) {
  const [expandedMessage, setExpandedMessage] = useState(null);

  const toggleExpand = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  if (messages.length === 0) {
    return <p className="text-gray-500">No messages generated yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message._id} className="border rounded-lg overflow-hidden">
          <div 
            className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(message._id)}
          >
            <div>
              <h4 className="font-medium">
                {new Date(message.createdAt).toLocaleDateString()} - {message.inputs.messageType.toUpperCase()}
              </h4>
              <p className="text-sm text-gray-500">
                To: {message.inputs.recipientInfo.name || 'Unknown'}
              </p>
            </div>
            <div className={`transform ${expandedMessage === message._id ? 'rotate-180' : ''}`}>
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          {expandedMessage === message._id && (
            <div className="p-4 bg-white border-t">
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700">Generated Message</h5>
                <div className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-wrap">
                  {message.generatedMessage}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-700">Details</h5>
                  <ul className="mt-1 space-y-1">
                    <li>Tone: {message.inputs.tone}</li>
                    <li>Format: {message.inputs.format}</li>
                    <li>Context: {message.inputs.context}</li>
                    <li>Length: {message.inputs.length}</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700">Spam Analysis</h5>
                  <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    message.spamScore > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    Score: {message.spamScore} - {message.spamScore > 50 ? 'High Risk' : 'Low Risk'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}