"use client";

import { useConversation } from "@elevenlabs/react";
import { Loader2, Mic, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
    },
    onMessage: (message) => {
      console.log("Received message:", message);
    },
    onError: (error) => {
      setErrorMessage(typeof error === "string" ? error : error.message);
      console.error("Error:", error);
    },
  });

  const { status, isSpeaking } = conversation;
  const isConnected = status === "connected";

  // Control video playback based on connection status
  useEffect(() => {
    if (videoRef.current) {
      if (isConnected) {
        // Video plays when connected
        videoRef.current.play().catch((e) => console.log("Video play failed:", e));
      } else {
        // Video pauses and resets when disconnected
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isConnected]);

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        toast.error("Microphone Permission denied", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    };

    requestMicPermission();
  }, []);

  const handleStartConversation = async () => {
    try {
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
      });
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[500px] max-w-sm mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-black/40 backdrop-blur-xl border border-white/5 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.1)] group select-none">
      
      {/* Video Background Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isConnected ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        >
          <source src="/video/voice_anim.webm" type="video/webm" />
        </video>
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
      </div>

      {/* Idle State Visual (when not connected) */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
          isConnected ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse-slow">
           <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10">
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white/20 transition-all duration-500 group-hover:text-white/40" />
           </div>
        </div>
        <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase font-medium">Ready to Connect</p>
      </div>

      {/* Status Header */}
      <div className={`absolute top-6 sm:top-8 left-0 right-0 flex justify-center transition-all duration-500 ${isConnected ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
        <div className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 flex items-center gap-2 sm:gap-3">
          <span className={`relative flex h-2 w-2 sm:h-2.5 sm:w-2.5`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSpeaking ? "bg-green-400" : "bg-blue-400"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 ${isSpeaking ? "bg-green-500" : "bg-blue-500"}`}></span>
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-white/90 tracking-wider uppercase">
            {isSpeaking ? "AI Speaking" : "Listening"}
          </span>
        </div>
      </div>

      {/* Controls Container */}
      <div className="absolute bottom-6 sm:bottom-8 w-full flex justify-center z-20">
        <div className="flex items-center gap-4 sm:gap-6 p-2 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-black/50 hover:border-white/20">
            
            {/* Mute Button */}
            {isConnected && (
              <button
                onClick={toggleMute}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation active:scale-95 ${
                  isMuted 
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {isMuted ? <VolumeX size={18} className="sm:w-5 sm:h-5" /> : <Volume2 size={18} className="sm:w-5 sm:h-5" />}
              </button>
            )}

            {/* Main Action Button */}
            <button
              onClick={isConnected ? handleEndConversation : handleStartConversation}
              disabled={!hasPermission}
              className={`relative group/btn w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 touch-manipulation active:scale-95 ${
                isConnected 
                  ? "bg-red-500 hover:bg-red-600 shadow-[0_0_30px_-5px_rgba(239,68,68,0.5)]" 
                  : "bg-white hover:bg-white/90 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
              }`}
            >
              <div className={`absolute inset-0 rounded-full border-2 border-white/20 transition-transform duration-700 ${isConnected ? "scale-110 opacity-0" : "scale-125 opacity-100 group-hover/btn:scale-110"}`} />
              
              {!hasPermission ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-black" />
              ) : isConnected ? (
                <PhoneHangupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              )}
            </button>

            {/* Spacer for symmetry if Mute is present */}
            {isConnected && (
               <div className="w-10 h-10 sm:w-12 sm:h-12" /> 
            )}
        </div>
      </div>

      {/* Error Toast */}
      {errorMessage && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] bg-red-500/10 backdrop-blur-md border border-red-500/20 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-red-400 text-xs sm:text-sm font-medium">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

// Custom Icon for End Call
const PhoneHangupIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="rotate(135 12 12)" />
  </svg>
);

export default VoiceChat;
