import VoiceChat from "@/components/VoiceChat";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero-bg.webp)" }}
      >
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
            SynapChat
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-body">
            Experience natural voice conversations with AI
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            Start a natural voice conversation with AI. Click to begin and speak
            naturally.
          </p>

          <VoiceChat />
        </div>
      </div>
    </div>
  );
}
