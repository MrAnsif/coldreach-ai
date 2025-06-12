'use client';

import { useState } from 'react';
import ToneSelector from './ToneSelector';
import OutputTypeSelector from './OutputTypeSelector';
import ContextGoalSelector from './ContextGoalSelector';
import LengthSelector from './LengthSelector';
import SenderIdentityForm from './SenderIdentityForm';
import RecipientIntelForm from './RecipientIntelForm';

export default function MessageForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('email');
  const [tone, setTone] = useState('friendly');
  const [format, setFormat] = useState('paragraph');
  const [context, setContext] = useState('sales');
  const [length, setLength] = useState('medium');
  const [cta, setCta] = useState('');
  const [senderInfo, setSenderInfo] = useState({
    fullName: '',
    jobTitle: '',
    company: ''
  });
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    jobTitle: '',
    company: '',
    sharedConnection: '',
    triggers: []
  });
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [spamScore, setSpamScore] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            messageType,
            tone,
            format,
            context,
            length,
            cta,
            senderInfo,
            recipientInfo,
            triggers: recipientInfo.triggers
          }
        })
      });

      const data = await response.json();
      setGeneratedMessage(data.message);
      setSpamScore(data.spamScore);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex mb-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 border-b-2 ${step >= i ? 'border-blue-500' : 'border-gray-200'}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {i}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Message Type</h3>
            <div className="flex space-x-4 mt-2">
              {['email', 'linkedin', 'twitter'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMessageType(type)}
                  className={`px-4 py-2 rounded-md ${messageType === type ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <ToneSelector tone={tone} setTone={setTone} />
          <OutputTypeSelector format={format} setFormat={setFormat} />
          <ContextGoalSelector context={context} setContext={setContext} />
          <LengthSelector length={length} setLength={setLength} />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Call to Action
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Schedule a call, check out our website"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Next: Sender Details
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <SenderIdentityForm
            senderInfo={senderInfo}
            setSenderInfo={setSenderInfo}
            context={context}
          />

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Next: Recipient Details
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <RecipientIntelForm
            recipientInfo={recipientInfo}
            setRecipientInfo={setRecipientInfo}
            context={context}
          />

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Message'}
            </button>
          </div>
        </div>
      )}

      {/* {generatedMessage && ( */}
        <div className="mt-8 p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Generated Message</h3>
          <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
            {generatedMessage}
          </div>

          {spamScore !== null && (
            <div className={`mt-4 p-3 rounded-md ${spamScore > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
              Spam Score: {spamScore} - {spamScore > 50 ?
                'High risk of being marked as spam' :
                'Low spam risk'}
            </div>
          )}
        </div>
      {/* )} */}
    </div>
  );
}