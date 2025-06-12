'use client';

import { useState } from 'react';

export default function RecipientIntelForm({ recipientInfo, setRecipientInfo, context }) {
  const [newTrigger, setNewTrigger] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipientInfo(prev => ({ ...prev, [name]: value }));
  };

  const addTrigger = () => {
    if (newTrigger.trim()) {
      setRecipientInfo(prev => ({
        ...prev,
        triggers: [...prev.triggers, newTrigger.trim()]
      }));
      setNewTrigger('');
    }
  };

  const removeTrigger = (index) => {
    setRecipientInfo(prev => ({
      ...prev,
      triggers: prev.triggers.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recipient Information</h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Recipient Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipientInfo.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {(context === 'sales' || context === 'job' || context === 'partnership') && (
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Recipient Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            id="jobTitle"
            value={recipientInfo.jobTitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      {(context === 'sales' || context === 'partnership') && (
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Recipient Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            value={recipientInfo.company}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      <div>
        <label htmlFor="sharedConnection" className="block text-sm font-medium text-gray-700">
          Shared Connection (if any)
        </label>
        <input
          type="text"
          name="sharedConnection"
          id="sharedConnection"
          value={recipientInfo.sharedConnection}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., We both know John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Personalization Triggers
        </label>
        <div className="mt-1 flex">
          <input
            type="text"
            value={newTrigger}
            onChange={(e) => setNewTrigger(e.target.value)}
            className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Loved your recent post about AI"
          />
          <button
            type="button"
            onClick={addTrigger}
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
          >
            Add
          </button>
        </div>
        
        {recipientInfo.triggers.length > 0 && (
          <div className="mt-2 space-y-1">
            {recipientInfo.triggers.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm">{trigger}</span>
                <button
                  type="button"
                  onClick={() => removeTrigger(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}