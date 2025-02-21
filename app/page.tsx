"use client";
import 'regenerator-runtime/runtime'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);


  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMouseX(e.clientX * 1.7);
      setMouseY(e.clientY * 1.9);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorX((prevX) => prevX + (mouseX - prevX) * 0.1);
      setCursorY((prevY) => prevY + (mouseY - prevY) * 0.1);
    }, 16); // 60 FPS

    return () => clearInterval(interval);
  }, [mouseX, mouseY]);


  return (
    <div>
      <h1 className="text-center">ZeroTrust</h1>
    <div className="relative flex h-screen font-sans overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      

      {/* Left Section */}
      <div className="flex flex-1 items-center justify-center p-2 md:p-10 lg:p-20 bg-gradient-to-r from-[#13315C] to-[#1E3A8A]">
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-20 h-20 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full bg-yellow-300 shadow-xl animate-glow group-hover:scale-110 transition-transform duration-300">
            <img src="/bulb.png"/>
          </div>
          <button
            className="bg-black text-white text-sm md:text-lg lg:text-xl font-bold py-2 px-4 md:py-3 md:px-6 lg:py-3 lg:px-6 mt-20 rounded-full border-2 border-yellow-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={() => {
              router.push("./voiceVerify");
            }}
          >
            Voice Verify
          </button>
          
          {/* <p className="text-white text-center mt-3 md:text-lg lg:text-xl">
            Surf through and get the true insights with our voice analysis tool.
          </p> */}
          
          {/* Terminal Section */}
          
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-2 md:p-10 lg:p-20 bg-gradient-to-r from-[#13315C] to-[#1E3A8A]">
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-20 h-20 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full bg-yellow-300 shadow-xl animate-glow group-hover:scale-110 transition-transform duration-300">
            <img src="/youtube.svg"/>
          </div>
          <button
            className="bg-black text-white text-sm md:text-lg lg:text-xl font-bold py-2 px-4 md:py-3 md:px-6 lg:py-3 lg:px-6 mt-20 rounded-full border-2 border-yellow-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={() => {
              router.push("./youtubeVerify");
            }}
          >
            Youtube Verify
          </button>
          
          {/* <p className="text-white text-center mt-3 md:text-lg lg:text-xl">
            Surf through and get the true insights with our voice analysis tool.
          </p> */}
          
          {/* Terminal Section */}
          
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-2 md:p-10 lg:p-20 bg-gradient-to-r from-[#dde1e4] to-[#bbbbbb]">
        <div className="flex flex-col items-center cursor-pointer group">
          <img
            src="/file.svg"
            alt="YouTube Icon"
            className="w-30 h-40 md:w-40 md:h-60 lg:w-60 lg:h-80 transition-transform duration-300 hover:scale-110"
          />
          <button
            className="bg-black text-white text-sm md:text-lg lg:text-xl font-bold py-2 px-4 md:py-3 md:px-6 lg:py-3 lg:px-6 mt-5 rounded-full border-2 border-yellow-100 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={() => {
              router.push("./textVerify");
            }}
          >
            Text Verify
          </button>

          {/* Terminal Section for Right */}
          
        </div>
      </div>
    </div>
    </div>
    
  );
}