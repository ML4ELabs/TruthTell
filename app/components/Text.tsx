//@ts-nocheck
"use client";
import { FC, useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface TextProps {}

const Text: FC<TextProps> = ({}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  let task = 0;
  useEffect(() => {
    if (transcript.split(" ").length % 10 == 0) {
      console.log(transcript + " " + transcript.split(" ").length);
    }
    const query = transcript.split(" ").slice(task, task + 10).join(" ");

    const url = `/api/search?query=${query}`;
    const response = await fetch(url);
    console.log(response)

    task = task + 10;
  }, [transcript])

  return (
    <div>
      <h1 className="lg:text-5xl font-bold underline decoration-wavy text-2xl">
        VeriVoice: Real-Time Speech Fact-Check
      </h1>
      <p className="mt-6 pb-32 mb-4 rounded-md bg-base-100">
        <span className="ml-2 font-bold text-xl bg-base-100">generated text:</span>
        {transcript}
      </p>
      <p className="mb-2 text-xl font-bold">
        Microphone: {listening ? "Listening to your voice.." : "Off"}
      </p>
      <div className="flex gap-3">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => SpeechRecognition.startListening({continuous: true})}
        >
          Start
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Text;
