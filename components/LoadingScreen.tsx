import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const targetText = "ANTHONY ALABADO";
  const [systemMsg, setSystemMsg] = useState("INITIALIZING...");

  useEffect(() => {
    const totalTime = 2200; // Animation duration in ms
    const intervalTime = 30;
    const totalSteps = totalTime / intervalTime;
    let currentStep = 0;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    
    // System messages to cycle through
    const messages = [
      "LOADING_ASSETS...",
      "ESTABLISHING_UPLINK...",
      "RESOLVING_DNS...",
      "HANDSHAKE_COMPLETE...",
      "RENDERING_DOM...",
      "SYSTEM_READY"
    ];

    const timer = setInterval(() => {
      currentStep++;
      const ratio = currentStep / totalSteps;
      const newProgress = Math.min(Math.floor(ratio * 100), 100);
      
      setProgress(newProgress);

      // Scramble Text Logic
      const revealCount = Math.floor(ratio * targetText.length);
      let scrambled = "";
      for (let i = 0; i < targetText.length; i++) {
        if (i < revealCount) {
          scrambled += targetText[i];
        } else if (targetText[i] === ' ') {
          scrambled += ' ';
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(scrambled);

      // Cycle system messages based on progress chunks
      const msgIndex = Math.min(Math.floor((newProgress / 100) * messages.length), messages.length - 1);
      setSystemMsg(messages[msgIndex]);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Split the text to color the second word "ALABADO"
  const words = displayText.split(' ');

  return (
    <div 
      className={`fixed inset-0 z-[5000] bg-obsidian flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out font-mono cursor-none ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Corner HUD Elements */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 text-[10px] text-accent-teal/60 tracking-widest hidden md:block">
        <div>SYSTEM_CHECK: OK</div>
        <div className="mt-1">MEMORY: 64KB OK</div>
      </div>

      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 text-[10px] text-accent-teal/60 tracking-widest text-right hidden md:block">
        <div>SECURE_CONNECTION</div>
        <div className="mt-1">V.2.0.4</div>
      </div>

      <div className="w-full max-w-[320px] px-6 relative">
        {/* Main Title Scramble */}
        <h1 className="text-2xl md:text-3xl font-bold text-textPrimary tracking-[0.2em] mb-8 text-center min-h-[40px]">
          {words[0]} <span className="text-accent-teal">{words[1] || ""}</span>
          <span className="animate-pulse text-accent-teal">_</span>
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden mb-2">
          <div 
            className="absolute top-0 left-0 h-full bg-accent-teal shadow-[0_0_10px_rgba(94,234,212,0.5)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="flex justify-between items-end text-[10px] text-accent-teal uppercase tracking-widest font-bold">
          <span className="opacity-80">{systemMsg}</span>
          <span className="text-xs">{progress.toString().padStart(3, '0')}%</span>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-10">
            <div className="absolute top-[-20px] left-0 w-[1px] h-[10px] bg-accent-teal/50"></div>
            <div className="absolute top-[-20px] right-0 w-[1px] h-[10px] bg-accent-teal/50"></div>
            <div className="absolute bottom-[-20px] left-0 w-[1px] h-[10px] bg-accent-teal/50"></div>
            <div className="absolute bottom-[-20px] right-0 w-[1px] h-[10px] bg-accent-teal/50"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;