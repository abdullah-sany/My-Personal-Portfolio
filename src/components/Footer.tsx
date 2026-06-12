import { motion, Variants } from "motion/react";
import { Heart, Github, Linkedin, Twitter } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.2,
    },
  },
};

const sentenceVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function TypewriterText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${className || ""}`}
      variants={sentenceVariants}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={containerVariants}
      className="relative z-10 w-full py-12 px-6 flex flex-col items-center justify-center overflow-hidden border-t border-app-border bg-app-card md:bg-app-bg/50 md:backdrop-blur-3xl mt-12 transition-colors duration-500"
    >
      <motion.div
        variants={fadeUpVariants}
        className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent"
      />
      <motion.div
        variants={fadeUpVariants}
        className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-lg h-32 bg-electric-blue/10 blur-[100px] pointer-events-none"
      />

      <div className="text-center space-y-6 max-w-md relative z-10 w-full">
        <motion.div
          variants={fadeUpVariants}
          className="flex justify-center gap-6 pb-2"
        >
          {[
            {
              Icon: Github,
              href: "https://github.com/mdabdulllahsany-ai",
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
              className="text-muted-text hover:text-white transition-colors focus:outline-none focus:text-electric-blue"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        <div className="text-muted-text font-mono text-sm tracking-widest uppercase">
          <TypewriterText text="© 2026 MD Abdullah Sany" />
        </div>
        <div className="text-app-text/90 font-medium text-base sm:text-lg">
          <TypewriterText text="Crafting Intelligent Digital Experiences Powered by AI" />
        </div>
        <motion.div
          variants={fadeUpVariants}
          className="flex items-center justify-center gap-2 text-sm text-muted-text font-light"
        >
          Built with{" "}
          <Heart className="w-4 h-4 text-red-500/80 mx-1 fill-red-500/20" /> in
          Bangladesh 🇧🇩
        </motion.div>
      </div>
    </motion.footer>
  );
}
