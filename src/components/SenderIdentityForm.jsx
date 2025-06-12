'use client';

export default function SenderIdentityForm({ senderInfo, setSenderInfo, context }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSenderInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Information</h3>
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={senderInfo.fullName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={senderInfo.jobTitle}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          value={senderInfo.company}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required={context === 'sales' || context === 'partnership'}
        />
      </div>
    </div>
  );
}