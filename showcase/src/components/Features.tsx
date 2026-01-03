import { Eye, Mic, Crosshair, Monitor, Activity, Brain } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Eye,
    title: "Real-Time Biometric Monitoring",
    description: "High-precision skeletal tracking using Google MediaPipe. Monitors shoulder level, head tilt, and head drop in real-time with a visual wireframe overlay.",
    metrics: ["Shoulder Level", "Head Tilt", "Head Drop"],
  },
  {
    icon: Mic,
    title: "AI Voice Coaching",
    description: "Gentle, human-like voice feedback powered by OpenAI GPT-4o and Microsoft Edge TTS. Never robotic beeps—just caring guidance.",
    example: '"Your shoulders are a bit uneven, try rolling them back."',
  },
  {
    icon: Crosshair,
    title: "Smart Calibration",
    description: "One-click calibration learns your unique body geometry. Measures deviations relative to your personal baseline, not generic averages.",
  },
  {
    icon: Monitor,
    title: "macOS Native Integration",
    description: "Lives quietly in your menu bar with real-time status indicators. Works in the background while you focus on what matters.",
  },
  {
    icon: Activity,
    title: "Live Dashboard",
    description: "Cyberpunk-inspired command center with real-time biometric visualization, progress bars, and system logs in a stunning glassmorphism UI.",
  },
  {
    icon: Brain,
    title: "Intelligent Alerts",
    description: "Only alerts after 5 seconds of sustained bad posture. Dynamic feedback based on specific deviations—not constant nagging.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for{" "}
              <span className="text-primary text-glow">Better Posture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Advanced computer vision meets gentle AI coaching for a wellness experience 
              that actually works with your workflow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100} direction="up">
              <div className="feature-card group h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                
                {feature.metrics && (
                  <div className="flex flex-wrap gap-2">
                    {feature.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                )}
                
                {feature.example && (
                  <div className="mt-4 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                    <p className="text-sm text-secondary italic">{feature.example}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
