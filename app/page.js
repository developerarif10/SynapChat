import VoiceChat from "@/components/VoiceChat";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] w-full overflow-hidden bg-black text-white selection:bg-white/20 touch-none">
      {/* Hero Section */}
      <div
        className="relative h-full w-full flex flex-col items-center justify-center p-4 md:p-6"
        style={{ 
          backgroundImage: "url(/hero-bg.webp)", 
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Dark overlay for Readability */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="text-center space-y-2 md:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent drop-shadow-sm px-2">
              SynapChat
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/40 uppercase tracking-[0.2em] font-medium">
            Start a natural voice conversation with AI. Click to begin and speak naturally.
            </p>
          </div>
         
          <div className="w-full max-w-[90vw] md:max-w-md aspect-[4/5] md:aspect-auto">
            <VoiceChat />
          </div>
        </div>
      </div>
    </div>
  );
}
