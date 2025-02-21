'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';

const YoutubeVerifier: React.FC = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [factCheckResults, setFactCheckResults] = useState<any[]>([]);

  const handleFetchTranscript = async () => {
    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
  
      const data = await response.json();
      if (data.transcript) {
        setTranscript(data.transcript);
        handleVerification(data.transcript);
      } else {
        console.error('Error fetching transcript:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleVerification = async (text: string) => {
    const factCheckData = await performFactCheck(text);
    setFactCheckResults(prev => [...prev, factCheckData]);
  };

  const performFactCheck = async (text: string) => {
    try {
      const response = await fetch('/api/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error performing fact-check:', error);
      return null;
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('YouTube Transcript & Fact-Check Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Video URL: ${url}`, 20, 30);
    doc.text('Transcript:', 20, 40);
    doc.text(transcript || 'No transcript available', 20, 50, { maxWidth: 170 });
    
    doc.text('Fact-Check Results:', 20, 80);
    factCheckResults.forEach((result, index) => {
      doc.text(`${index + 1}. ${result}`, 20, 90 + index * 10, { maxWidth: 170 });
    });
    
    doc.save('fact_check_report.pdf');
  };

  return (
    <div className="max-w-lg mx-auto p-6 text-center bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">VeriVoice: YouTube Fact-Check</h1>
      <input
        type="text"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL..."
        className="border p-2 w-full rounded-md"
      />
      <button
        onClick={handleFetchTranscript}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Fetch & Verify
      </button>
      <div className="mt-4">
        {factCheckResults.map((result, index) => (
          <p key={index} className="text-red-700">Fact-Check: {result}</p>
        ))}
      </div>
      {transcript && (
        <button
          onClick={handleDownloadPDF}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default YoutubeVerifier;
