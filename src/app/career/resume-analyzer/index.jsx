'use client';

import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    setFeedback('');

    const res = await fetch('/api/evaluate-resume', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setFeedback(data.feedback || 'Something went wrong.');
    setLoading(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-4">Upload your Resume (PDF)</h1>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {loading && <p className="mt-4">Evaluating resume...</p>}
      {feedback && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold mb-2">Gemini Feedback:</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
