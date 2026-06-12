import { motion } from "motion/react";
import { Code2, Cpu, Layers, Zap } from "lucide-react";

export function About() {
  return (
    <section className="py-24 relative z-10 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Cinematic Image Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass-panel group"
        >
          {/* Identity Image Reference */}
          <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-blue-900/20 md:mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
          <img
            src="https://raw.githubusercontent.com/abdullah-sany/Asset/main/Sany.png"
            alt="MD Abdullah Sany"
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full grayscale-[20%] contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Cyberpunk rim lighting illusion */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-electric-blue/30 rounded-3xl transition-colors duration-700 z-20 pointer-events-none" />

          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="text-app-text font-medium">MD Abdullah Sany</p>
                <p className="text-electric-blue text-sm font-mono mt-1 text-glow">
                  Identity Verified
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-electric-blue text-glow animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Storytelling Text */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-app-text leading-tight">
              Architecting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-300">
                Intelligent
              </span>{" "}
              Futures
            </h2>
            <div className="space-y-4 text-muted-text text-lg font-light leading-relaxed">
              <p>
                I am an AI-Hybrid Developer, Prompt Engineer, and Automation Specialist dedicated to building smarter digital experiences. Leveraging Generative AI, Python Development, Advanced Prompt Engineering, AI Automation, and Creative Design, I transform complex ideas into intelligent solutions that enhance productivity, creativity, and innovation.
              </p>
              <p>
                My mission is to bridge the gap between human imagination and the limitless potential of artificial intelligence.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-sm font-mono">
            {[
              { label: "AI Integrations", icon: Cpu },
              { label: "Full-Stack Eng.", icon: Layers },
              { label: "Cloud Automation", icon: Zap },
              { label: "UI/UX Creativity", icon: Code2 },
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 glass-card p-4"
              >
                <skill.icon className="w-5 h-5 text-electric-blue" />
                <span className="text-app-text/80">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
