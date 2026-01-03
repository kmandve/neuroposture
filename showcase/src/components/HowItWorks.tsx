import { Download, Crosshair, Minimize2, Bell } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Launch",
    description: "App starts in your macOS menu bar, ready when you are.",
  },
  {
    icon: Crosshair,
    step: "02",
    title: "Calibrate",
    description: "Sit in your ideal posture and click Calibrate. Done in seconds.",
  },
  {
    icon: Minimize2,
    step: "03",
    title: "Work",
    description: "Minimize and focus on your work. NeuroPosture runs quietly in the background.",
  },
  {
    icon: Bell,
    step: "04",
    title: "Get Coached",
    description: "After 5 seconds of bad posture, receive gentle AI-powered voice guidance.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
              User Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple. <span className="text-secondary text-glow-secondary">Effective.</span> Non-Intrusive.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 150} direction="up">
              <div className="relative h-full">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <div className="glass-panel p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-primary/20">{step.step}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Status indicator showcase */}
        <ScrollReveal delay={200}>
          <div className="mt-20 glass-panel p-8 max-w-2xl mx-auto">
            <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-6">
              Menu Bar Status Indicators
            </h3>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="w-4 h-4 rounded-full bg-success shadow-[0_0_15px_hsl(157_100%_50%)] mx-auto mb-2" />
                <span className="text-xs text-muted-foreground">Optimal</span>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 rounded-full bg-warning shadow-[0_0_15px_hsl(42_100%_50%)] mx-auto mb-2" />
                <span className="text-xs text-muted-foreground">Minor Drift</span>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 rounded-full bg-destructive shadow-[0_0_15px_hsl(340_100%_50%)] mx-auto mb-2" />
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorks;
