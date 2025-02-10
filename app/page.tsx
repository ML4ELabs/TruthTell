'use client';

import React, { useState } from 'react';

const TextComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [factCheckResults, setFactCheckResults] = useState<any[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    if (newText.endsWith(' ')) {
      const newWords = newText.trim().split(/\s+/);
      const lastWord = newWords[newWords.length - 1];
      setWords((prevWords) => [...prevWords, lastWord]);

      if (newWords.length % 10 === 0) {
        const query = newWords.slice(-10).join(' ');
        console.log(`Searching for: ${query}`);
        const searchData = await performSearch(query);
        setSearchResults((prevResults) => [...prevResults, searchData]);

        const factCheckData = await performFactCheck(query);
        setFactCheckResults((prevResults) => [...prevResults, factCheckData]);
      }
    }
  };

  const performSearch = async (query: string) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return null;
    }
  };

  const performFactCheck = async (text: string) => {
    try {
      const response = await fetch('/api/fact-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error performing fact-check:', error);
      return null;
    }
  };

  return (
    <div>
      <h1 className="lg:text-5xl font-bold underline decoration-wavy text-2xl">
        VeriVoice: Real-Time Text Fact-Check
      </h1>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type your text here..."
        className="border p-2 w-full mb-4"
      />
      <p className="mt-6 pb-32 mb-4 rounded-md bg-base-100">
        <span className="ml-2 font-bold text-xl bg-base-100">Generated text:</span>
        {text}
      </p>
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <h2>Search Results for Group {index + 1}:</h2>
            {result}
          </div>
        ))}
      </div>
      <div>
        {factCheckResults.map((result, index) => (
          <div key={index}>
            <h2>Fact-Check Results for Group {index + 1}:</h2>
            {result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextComponent;
