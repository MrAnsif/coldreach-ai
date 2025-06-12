'use client';

export default function ToneSelector({ tone, setTone }) {
  const tones = [
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTone(t.value)}
            className={`px-3 py-1 text-sm rounded-full ${
              tone === t.value
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}