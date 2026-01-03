import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="pulse-dot" />
          <h1 className="text-xl font-bold tracking-tight">
            NEURO<span className="text-primary text-glow">POSTURE</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Technology
          </a>
        </nav>

        <a
          href="https://github.com/kmandve/neuroposture/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="cyber-btn text-sm"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">Install via GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
