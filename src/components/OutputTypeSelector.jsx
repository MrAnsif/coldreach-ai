'use client';

export default function OutputTypeSelector({ format, setFormat }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setFormat('paragraph')}
          className={`px-3 py-1 text-sm rounded-md ${
            format === 'paragraph'
              ? 'bg-blue-100 text-blue-800 border border-blue-300'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Paragraph
        </button>
        <button
          type="button"
          onClick={() => setFormat('bullet')}
          className={`px-3 py-1 text-sm rounded-md ${
            format === 'bullet'
              ? 'bg-blue-100 text-blue-800 border border-blue-300'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Bullet Points
        </button>
      </div>
    </div>
  );
}