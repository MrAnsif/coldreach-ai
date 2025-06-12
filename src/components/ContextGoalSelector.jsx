'use client';

export default function ContextGoalSelector({ context, setContext }) {
  const contexts = [
    { value: 'sales', label: 'Sales Pitch' },
    { value: 'job', label: 'Job Inquiry' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'content', label: 'Content Collaboration' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Outreach Context
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {contexts.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setContext(c.value)}
            className={`px-3 py-2 text-sm rounded-md ${
              context === c.value
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}