//@ts-nocheck
"use client";
import { FC, useState, useEffect, useRef } from "react";

interface TextProps {}

const Text: FC<TextProps> = ({}) => {
  // Use state to htextold the user-entered text instead of a transcript from speech recognition
  const [text, setText] = useState("");
  // Use a ref to store the task counter persistently
  let task = 0;

  useEffect(() => {
    const words = text.split(" ");
    if (words.length > 0 && words.length % 5 === 0) {
      console.log(text + " " + words.length);
      const query = words.slice(task, task + 5).join(" ");
      task = task + 5;
      console.log("query" + query)

      const fetchData = async () => {
        const url = `/api/search?query=${encodeURIComponent(query)}`;
        try {
          const response = await fetch(url);
          const res = await response.json();
          console.log(res.organic_results)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }

  }, [text]);

  return (
    <div>
      <h1 className="lg:text-5xl font-bold underline decoration-wavy text-2xl">
        VeriVoice: Real-Time Text Fact-Check
      </h1>
      {/* A text input to enter text in real time */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        className="border p-2 w-full mb-4"
      />
      <p className="mt-6 pb-32 mb-4 rounded-md bg-base-100">
        <span className="ml-2 font-bold text-xl bg-base-100">
          generated text:
        </span>
        {text}
      </p>
    </div>
  );
};

export default Text;
