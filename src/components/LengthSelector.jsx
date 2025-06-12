'use client';

export default function LengthSelector({ length, setLength }) {
  const lengths = [
    { value: 'short', label: 'Short (<100 words)' },
    { value: 'medium', label: 'Medium (100-200)' },
    { value: 'long', label: 'Long (200+)' },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
      <div className="space-y-2">
        {lengths.map((l) => (
          <div key={l.value} className="flex items-center">
            <input
              id={`length-${l.value}`}
              name="length"
              type="radio"
              checked={length === l.value}
              onChange={() => setLength(l.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor={`length-${l.value}`}
              className="ml-3 block text-sm text-gray-700"
            >
              {l.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}