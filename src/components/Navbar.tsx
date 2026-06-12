import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Volume2, VolumeX, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSound } from "../contexts/SoundContext";
import { smoothScrollTo } from "../utils/scroll";

export function Navbar({ onBookCollab }: { onBookCollab: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSoundEnabled, toggleSound } = useSound();

  useEffect(() => {
    // Initial check
    if (
      document.documentElement.classList.contains("light") ||
      (!document.documentElement.classList.contains("dark") &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      setTheme("light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    const handleScroll = () => {
      const sections = ["skills", "projects", "certifications", "services"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight * 0.3 &&
            rect.bottom >= window.innerHeight * 0.3
          ) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
    >
      <div className="flex justify-between items-center h-14 px-6 bg-app-card/60 backdrop-blur-xl border border-app-border rounded-full shadow-[0_4px_24px_0_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-electric-blue rounded-full animate-pulse"></div>
          <span className="font-bold tracking-tighter text-lg text-app-text">
            SANY.AI
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-muted-text">
          <a
            href="#skills"
            onClick={(e) => smoothScrollTo("skills", e)}
            className={`hover:text-electric-blue transition-colors ${activeSection === "skills" ? "text-electric-blue" : ""}`}
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => smoothScrollTo("projects", e)}
            className={`hover:text-electric-blue transition-colors ${activeSection === "projects" ? "text-electric-blue" : ""}`}
          >
            Projects
          </a>
          <a
            href="#certifications"
            onClick={(e) => smoothScrollTo("certifications", e)}
            className={`hover:text-electric-blue transition-colors ${activeSection === "certifications" ? "text-electric-blue" : ""}`}
          >
            Certifications
          </a>
          <a
            href="#services"
            onClick={(e) => smoothScrollTo("services", e)}
            className={`hover:text-electric-blue transition-colors ${activeSection === "services" ? "text-electric-blue" : ""}`}
          >
            Services
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-app-bg border border-app-border text-app-text hover:text-electric-blue transition-colors"
            aria-label="Toggle sound"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-app-bg border border-app-border text-app-text hover:text-electric-blue transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onBookCollab}
            className="hidden md:flex px-5 py-2 bg-app-text text-app-bg text-[10px] font-bold rounded-full cursor-pointer hover:bg-electric-blue hover:text-white transition-colors items-center justify-center"
            aria-label="Book Collaboration"
          >
            BOOK COLLAB
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-app-bg border border-app-border text-app-text hover:text-electric-blue transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="md:hidden bg-app-card/90 backdrop-blur-xl border border-app-border rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-4 space-y-4 text-sm font-semibold uppercase tracking-widest text-muted-text">
              <a
                href="#skills"
                onClick={(e) => {
                  smoothScrollTo("skills", e);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 hover:text-electric-blue transition-colors ${activeSection === "skills" ? "text-electric-blue" : ""}`}
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  smoothScrollTo("projects", e);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 hover:text-electric-blue transition-colors ${activeSection === "projects" ? "text-electric-blue" : ""}`}
              >
                Projects
              </a>
              <a
                href="#certifications"
                onClick={(e) => {
                  smoothScrollTo("certifications", e);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 hover:text-electric-blue transition-colors ${activeSection === "certifications" ? "text-electric-blue" : ""}`}
              >
                Certifications
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  smoothScrollTo("services", e);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 hover:text-electric-blue transition-colors ${activeSection === "services" ? "text-electric-blue" : ""}`}
              >
                Services
              </a>

              <button
                onClick={() => {
                  onBookCollab();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 w-full py-3 bg-app-text text-app-bg text-[10px] font-bold rounded-xl hover:bg-electric-blue hover:text-white transition-colors"
              >
                BOOK COLLAB
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
