import { Cpu, Eye, Bot, Shield } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const techStack = [
  {
    icon: Eye,
    name: "Google MediaPipe",
    description: "Industry-leading computer vision for precise skeletal tracking",
    color: "primary",
  },
  {
    icon: Bot,
    name: "OpenAI GPT-4o",
    description: "Human-like AI coaching that adapts to your specific posture issues",
    color: "secondary",
  },
  {
    icon: Cpu,
    name: "Python + Flask",
    description: "Lightweight local server—your data never leaves your machine",
    color: "primary",
  },
  {
    icon: Shield,
    name: "100% Local Processing",
    description: "All computer vision runs on your CPU. Privacy by design.",
    color: "success",
  },
];

const Technology = () => {
  return (
    <section id="technology" className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Tech info */}
          <div>
            <ScrollReveal direction="right">
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                Under the Hood
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powered by{" "}
                <span className="text-primary text-glow">Advanced AI</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                NeuroPosture combines cutting-edge computer vision with natural language AI 
                to create a wellness experience that feels more like a caring friend than software.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <ScrollReveal key={tech.name} delay={index * 100} direction="right">
                  <div className="glass-panel p-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      tech.color === "primary" 
                        ? "bg-primary/10 border border-primary/20" 
                        : tech.color === "secondary"
                        ? "bg-secondary/10 border border-secondary/20"
                        : "bg-success/10 border border-success/20"
                    }`}>
                      <tech.icon className={`w-5 h-5 ${
                        tech.color === "primary" 
                          ? "text-primary" 
                          : tech.color === "secondary"
                          ? "text-secondary"
                          : "text-success"
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{tech.name}</h4>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: Dashboard preview */}
          <ScrollReveal direction="left" delay={200}>
            <div className="relative">
              <div className="glass-panel p-6 animate-glow-pulse">
                {/* Mock dashboard header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="pulse-dot" />
                    <span className="font-bold">NEURO<span className="text-primary">POSTURE</span></span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
                    OPTIMAL
                  </span>
                </div>

                {/* Mock metrics */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Shoulder Level</span>
                      <span className="text-primary font-mono">0.012</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[15%] bg-primary rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Head Tilt</span>
                      <span className="text-primary font-mono">0.008</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[10%] bg-primary rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Head Drop</span>
                      <span className="text-primary font-mono">0.023</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-primary rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                </div>

                {/* Mock log terminal */}
                <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">System Log</span>
                  <div className="mt-2 space-y-1 font-mono text-xs text-muted-foreground">
                    <p className="text-success">&gt; Posture optimal. Keep it up!</p>
                    <p>&gt; Calibration successful</p>
                    <p>&gt; System initialized...</p>
                  </div>
                </div>
              </div>

              {/* Decorative scan line */}
              <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                <div className="scan-line" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Technology;
