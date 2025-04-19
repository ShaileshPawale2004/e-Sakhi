import React from 'react';

const IdeaModal = ({ idea, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-5xl mb-2">{idea.icon}</div>
        <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
        <p className="mb-3 text-gray-700"><strong>Estimated income:</strong> {idea.income}</p>
        <p className="font-semibold">Tools Needed:</p>
        <ul className="list-disc list-inside mb-4 text-sm text-gray-800">
          {idea.tools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
        <p className="font-semibold">Steps to Start:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-800">
          {idea.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default IdeaModal;
