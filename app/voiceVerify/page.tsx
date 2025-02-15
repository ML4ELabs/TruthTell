//@ts-nocheck
"use client";
import { FC, useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface TextProps {}

const VoiceVerify: FC<TextProps> = ({}) => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

    const [textlen, setTextLen] = useState(0);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [factCheckResults, setFactCheckResults] = useState<any[]>([]);
  

  useEffect(() => {
    const newText = transcript;
    const words = newText.trim().split(" ");
    if (words.length == textlen+10) {
      const query = words.slice(textlen, textlen+10).join(" ");
      setTextLen(textlen+10);
      const searchData = performSearch(query);
      setSearchResults([...searchResults, searchData]);

      const factCheckData = performFactCheck(query);
      setFactCheckResults([...factCheckResults, factCheckData]);
    }

    console.log(words)
  }, [transcript]);

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
      <h1 className="text-2xl font-bold text-blue-600 mb-4">VeriVoice: Speech Fact-Check</h1>
      <p className="p-4 bg-gray-100 rounded-md text-lg">
        {transcript}
      </p>
      <p className="mb-2 text-xl font-bold">Microphone: {listening ? "Listening..." : "Off"}</p>
      <div className="flex gap-3 justify-center mb-4">
        <button className="btn btn-secondary" onClick={() => SpeechRecognition.startListening({ continuous: true })}>
          Start
        </button>
        <button className="btn btn-secondary" onClick={SpeechRecognition.stopListening}>
          Stop
        </button>
        <button className="btn btn-accent" onClick={resetTranscript}>
          Reset
        </button>
      </div>
      <div className="mt-4 text-left">
        <h2 className="font-semibold text-blue-700">Search Results:</h2>
        {searchResults.map((result, index) => (
          <p key={index} className="text-blue-700">
            {result}
          </p>
        ))}
      </div>
      <div className="mt-4 text-left">
        <h2 className="font-semibold text-red-700">Fact-Check Results:</h2>
        {factCheckResults.map((result, index) => (
          <p key={index} className="text-red-700">
            {result}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VoiceVerify;
