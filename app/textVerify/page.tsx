'use client';

import React, { useState } from 'react';

const TextComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [factCheckResults, setFactCheckResults] = useState<any[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    console.log('New text:', newText);
    setText(newText);

    if (newText.endsWith(' ')) {
      const words = newText.trim().split(/\s+/);
      if (words.length % 10 === 0) {
        const query = words.slice(-10).join(' ');
        const searchData = await performSearch(query);
        setSearchResults([...searchResults, searchData]);

        const factCheckData = await performFactCheck(query);
        setFactCheckResults([...factCheckResults, factCheckData]);
      }
    }
  };

  const performSearch = async (query: string) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching search results:', error);
      return null;
    }
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

  return (
    <div className="max-w-lg mx-auto p-6 text-center bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">VeriVoice: Fact-Check</h1>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type here..."
        className="border p-2 w-full rounded-md"
      />
      <p className="mt-4 text-gray-700">{text}</p>
      <div className="mt-4">
        {searchResults.map((result, index) => (
          <p key={index} className="text-blue-700">Search {index + 1}: {result}</p>
        ))}
      </div>
      <div className="mt-4">
        {factCheckResults.map((result, index) => (
          <p key={index} className="text-red-700">Fact-Check {index + 1}: {result}</p>
        ))}
      </div>
    </div>
  );
};

export default TextComponent;
