import { Github, Apple } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="glass-panel max-w-4xl mx-auto p-12 text-center">
            <div className="inline-flex items-center gap-2 macos-badge mb-6">
              <Apple className="w-4 h-4" />
              <span>macOS Exclusive</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Journey to{" "}
              <span className="gradient-text">Better Posture</span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Download NeuroPosture today and let AI guide you to long-term spinal health. 
              Your future self will thank you.
            </p>

            <a
              href="https://github.com/kmandve/neuroposture/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn text-lg px-10 py-5 inline-flex"
            >
              <Github className="w-6 h-6" />
              Install via GitHub
            </a>

            <p className="text-sm text-muted-foreground mt-6">
              Free and open source • Built with Python • Runs locally on your Mac
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
