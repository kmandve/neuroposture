import { Github, Apple, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: '0.2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* macOS badge */}
          <div className="inline-flex items-center gap-2 macos-badge mb-8 animate-fade-in-up" style={{ animationDelay: '0s' }}>
            <Apple className="w-4 h-4" />
            <span>Available for macOS only</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Your AI-Powered{" "}
            <span className="gradient-text">Posture Wellness</span>{" "}
            Companion
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Real-time posture monitoring with computer vision and gentle AI voice coaching 
            to protect your long-term spinal health.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://github.com/kmandve/neuroposture/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn text-lg px-8 py-4"
            >
              <Github className="w-5 h-5" />
              Install via GitHub
            </a>
            <a
              href="#features"
              className="cyber-btn cyber-btn-secondary text-lg px-8 py-4"
            >
              Explore Features
            </a>
          </div>

          {/* Status indicators */}
          <div className="flex items-center justify-center gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_10px_hsl(157_100%_50%)]" />
              <span className="text-sm text-muted-foreground">Optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-warning shadow-[0_0_10px_hsl(42_100%_50%)]" />
              <span className="text-sm text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive shadow-[0_0_10px_hsl(340_100%_50%)]" />
              <span className="text-sm text-muted-foreground">Critical</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
