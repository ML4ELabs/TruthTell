"use client"
import React, { FC, useState } from "react";

interface TextProps {}

const Text: FC<TextProps> = () => {
  const [text, setText] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Check if the last character is a space, indicating word completion
    if (newText.endsWith(" ")) {
      // Split the text into words and remove any empty strings
      const newWords = newText.trim().split(" ").filter(Boolean);
      // Get the last word from the newWords array
      const lastWord = newWords[newWords.length - 1];
      // Update the words state with the new word
      setWords((prevWords) => [...prevWords, lastWord]);
    }
    console.log(words)
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
        <h2 className="font-bold text-xl">Completed Words:</h2>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Text;
