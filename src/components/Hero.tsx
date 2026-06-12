import { motion } from "motion/react";
import {
  Terminal,
  Code,
  Cpu,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { smoothScrollTo } from "../utils/scroll";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden z-10 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue font-mono text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            System.status === "ONLINE"
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-app-text leading-[1.1] break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforming Ideas Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-300">
              Intelligent AI Systems
            </span>{" "}
            <br />
            and Digital Experiences.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-text max-w-xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-Hybrid Developer • AI Solutions Builder • Automation Specialist
            <br className="hidden md:block" /> Architecting the future of
            scalable web systems.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button
              onClick={(e) => smoothScrollTo("projects", e)}
              className="px-6 py-3 rounded-xl bg-app-text text-app-bg font-medium hover:bg-app-text/80 transition-colors cursor-pointer"
              aria-label="View Projects"
            >
              View Projects
            </button>
            <button
              onClick={(e) =>
                smoothScrollTo("contact", e, () => {
                  const nameInput = document.querySelector(
                    'input[name="name"]',
                  ) as HTMLInputElement;
                  if (nameInput) nameInput.focus();
                })
              }
              className="px-6 py-3 rounded-xl glass-panel text-app-text font-medium hover:bg-glass-panel transition-colors cursor-pointer"
              aria-label="Contact Me"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              {
                Icon: Github,
                href: "https://github.com/abdullah-sany",
                label: "GitHub",
              },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/md-abdullah-sany-1449363b5",
                label: "LinkedIn",
              },
              {
                Icon: Twitter,
                href: "https://x.com/ma_sany_01",
                label: "X (Twitter)",
              },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-text hover:text-electric-blue transition-colors focus:outline-none focus:text-electric-blue"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Visual / Terminal Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </section>
  );
}

function TerminalWindow() {
  const lines = [
    "> Initializing AI Systems...",
    "> Deploying Neural Interface...",
    "> Building Intelligent Experiences...",
    "> Connecting Automation Framework...",
    "> Status: READY.",
  ];

  return (
    <div className="w-full max-w-lg glass-panel rounded-2xl overflow-hidden border-app-border shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent z-0" />
      <div className="bg-app-card/60 px-4 py-3 border-b border-app-border flex items-center gap-2 z-10 relative">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-4 font-mono text-xs text-muted-text">
          root@sany-os:~
        </span>
      </div>
      <div className="p-6 font-mono text-sm space-y-3 z-10 relative h-64">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.5 }}
            className={
              i === lines.length - 1
                ? "text-electric-blue text-glow"
                : "text-app-text/80"
            }
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-electric-blue inline-block mt-2"
        />
      </div>
    </div>
  );
}
