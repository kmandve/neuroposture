import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(185_100%_50%)]" />
            <span className="font-bold text-sm">
              NEURO<span className="text-primary">POSTURE</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Your AI-Powered Posture Wellness Companion
          </p>

          <a
            href="https://github.com/kmandve/neuroposture/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
