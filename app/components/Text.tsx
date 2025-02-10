"use client"
import React, { FC, useState } from "react";
import { getJson } from "serpapi";

interface TextProps {}

const Text: FC<TextProps> = () => {
  const [text, setText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    if (newText.endsWith(" ")) {
      const newWords = newText.trim().split(/\s+/);
      const lastWord = newWords[newWords.length - 1];
      setWords((prevWords) => [...prevWords, lastWord]);

      if (newWords.length % 10 === 0) {
        const query = newWords.slice(-10).join(" ");
        console.log(`Searching for: ${query}`);
        await performSearch(query);
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
      // Process and display the search results
    } catch (error) {
      console.error('Error fetching search results:', error);
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
        <span className="ml-2 font-bold text-xl bg-base-100">
          Generated text:
        </span>
        {text}
      </p>
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <h2>Search Results for Group {index + 1}:</h2>
            {/* Render your search results here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Text;
