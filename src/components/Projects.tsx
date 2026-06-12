import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useState, useMemo, useEffect } from "react";
import { useEngagementTracker } from "../hooks/useEngagementTracker";
import {
  Rocket,
  Server,
  Gamepad2,
  Plane,
  Box,
  Heart,
  FileText,
  ShoppingBag,
  Calculator,
  CheckSquare,
  CloudRain,
  Bird,
  Cpu,
  Map,
  Hourglass,
  ShieldAlert,
  Eye,
  Github,
  Activity,
  ArrowUpRight,
  Zap,
  Target,
  Search,
} from "lucide-react";

const CATEGORIES = {
  ALL: "All Projects",
  ROBOTICS: "Innovation & Robotics",
  WEB: "Web Systems & AI Platforms",
  GAMES: "Games & Interactive Experiences",
};

const PROJECTS = [
  // INNOVATION & ROBOTICS
  {
    id: "vtol-drone",
    category: CATEGORIES.ROBOTICS,
    title: "VTOL Drone System",
    type: "Innovation Project",
    description:
      "A futuristic vertical take-off and landing drone engineered for intelligent surveillance, autonomous navigation, and payload delivery systems.",
    techStack: ["C++", "Arduino", "Flight Dynamics", "Embedded Systems"],
    icon: Plane,
    color: "from-electric-blue to-cyan-400",
    bgImage:
      "https://images.unsplash.com/photo-1579822989182-f38b4dfa2fd5?q=80&w=1000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "mini-supply",
    category: CATEGORIES.ROBOTICS,
    title: "Mini Supply Drone",
    type: "Emergency Delivery",
    description:
      "Compact autonomous drone system designed for short-range medical and emergency supply delivery operations.",
    techStack: ["Python", "OpenCV", "Embedded Systems"],
    icon: Box,
    color: "from-emerald-400 to-teal-500",
    bgImage:
      "https://images.unsplash.com/photo-1527443154391-426175b5baf3?q=80&w=1000&auto=format&fit=crop",
  },

  // WEB SYSTEMS & AI PLATFORMS
  {
    id: "blood-donation",
    category: CATEGORIES.WEB,
    title: "Blood Donation Platform",
    type: "Realtime Humanitarian Platform",
    description:
      "A realtime blood donation ecosystem connecting donors and patients across Bangladesh during emergency situations.",
    techStack: ["React", "Node.js", "MongoDB", "Express.js"],
    icon: Heart,
    color: "from-red-500 to-rose-500",
    bgImage:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "portfolio-enhancer",
    category: CATEGORIES.WEB,
    title: "Portfolio Enhancer",
    type: "AI-Powered Resume System",
    description:
      "An intelligent portfolio and resume generation platform using AI to instantly generate premium PDF resumes and dynamic layouts.",
    techStack: ["TypeScript", "React", "OpenAI API", "PDF Systems"],
    icon: FileText,
    color: "from-purple-500 to-indigo-500",
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "commerce-mini",
    category: CATEGORIES.WEB,
    title: "E-Commerce Mini",
    type: "Modern Commerce Interface",
    description:
      "A lightweight high-performance e-commerce experience focused on speed, clean UI, and seamless shopping interactions.",
    techStack: ["JavaScript", "Tailwind", "Local Storage"],
    icon: ShoppingBag,
    color: "from-orange-400 to-amber-500",
    bgImage:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "smart-converter",
    category: CATEGORIES.WEB,
    title: "Smart Converter",
    type: "Utility & Productivity",
    description:
      "An all-in-one smart conversion and scientific calculation system with intelligent history tracking and PWA functionality.",
    techStack: ["Vue.js", "Math.js", "PWA"],
    icon: Calculator,
    color: "from-cyan-500 to-electric-blue",
    bgImage:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "task-master",
    category: CATEGORIES.WEB,
    title: "Task Master",
    type: "Productivity Dashboard",
    description:
      "A modern productivity ecosystem featuring drag-and-drop task management, realtime analytics, and workflow optimization.",
    techStack: ["React", "Redux", "Firebase"],
    icon: CheckSquare,
    color: "from-blue-400 to-indigo-500",
    bgImage:
      "https://images.unsplash.com/photo-1507925922837-326f12d9348d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "skycast-weather",
    category: CATEGORIES.WEB,
    title: "Skycast Weather",
    type: "Realtime Intelligence System",
    description:
      "A location-aware weather intelligence application delivering realtime forecasts, severe weather alerts, and atmospheric analytics.",
    techStack: ["JavaScript", "OpenWeatherMap", "Geolocation"],
    icon: CloudRain,
    color: "from-cyan-300 to-electric-blue",
    bgImage:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000&auto=format&fit=crop",
  },

  // GAMES & INTERACTIVE
  {
    id: "adaptive-enemy",
    category: CATEGORIES.GAMES,
    title: "Adaptive Enemy AI",
    type: "ML Game AI Demo",
    description:
      "An experimental AI enemy system where enemies dynamically learn from player behavior using neural network logic.",
    techStack: ["Python", "PyGame", "TensorFlow"],
    icon: Cpu,
    color: "from-red-500 to-orange-500",
    bgImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "climate-survival",
    category: CATEGORIES.GAMES,
    title: "Climate Survival BD",
    type: "Educational Survival",
    description:
      "A narrative survival game set in future Bangladesh focusing on climate change awareness and environmental storytelling.",
    techStack: ["Unity", "C#", "Pixel Art"],
    icon: ShieldAlert,
    color: "from-emerald-500 to-green-600",
    bgImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "time-freeze",
    category: CATEGORIES.GAMES,
    title: "Time Freeze Puzzle",
    type: "Puzzle Mechanics",
    description:
      "A logic puzzle game where players manipulate time mechanics to solve advanced mechanical and environmental riddles.",
    techStack: ["Godot", "GDScript"],
    icon: Hourglass,
    color: "from-blue-400 to-purple-500",
    bgImage:
      "https://images.unsplash.com/photo-1506318137071-a4870f74eedf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "campus-treasure",
    category: CATEGORIES.GAMES,
    title: "Campus Treasure AR",
    type: "AR Exploration",
    description:
      "An immersive university AR experience allowing students to discover hidden digital artifacts using geolocation systems.",
    techStack: ["WebXR", "Three.js", "Geolocation"],
    icon: Map,
    color: "from-teal-400 to-cyan-500",
    bgImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "memory-echo",
    category: CATEGORIES.GAMES,
    title: "Memory Echo",
    type: "Narrative Intelligence",
    description:
      "A story-driven game where narrative outcomes dynamically adapt based on player memory and previous interactions.",
    techStack: ["JavaScript", "NLP", "Text Adventure"],
    icon: Eye,
    color: "from-indigo-400 to-purple-500",
    bgImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "flappy",
    category: CATEGORIES.GAMES,
    title: "Flappy Bird Clone",
    type: "Arcade Recreation",
    description:
      "A faithful recreation of the classic arcade game featuring enhanced physics systems and competitive global leaderboards.",
    techStack: ["HTML5 Canvas", "Physics Engine"],
    icon: Bird,
    color: "from-yellow-400 to-orange-500",
    bgImage:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "tictactoe-ai",
    category: CATEGORIES.GAMES,
    title: "Tic Tac Toe AI",
    type: "AI Strategy",
    description:
      "A classic strategy game powered by an unbeatable AI opponent using advanced Minimax decision algorithms.",
    techStack: ["React", "Algorithms", "Game Theory"],
    icon: Target,
    color: "from-red-400 to-rose-500",
    bgImage:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop",
  },
];

function FilterTab({ label, active, onClick, icon: Icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all group overflow-hidden ${
        active
          ? "bg-electric-blue/10 text-electric-blue border-electric-blue/50 shadow-[0_0_20px_rgba(0,122,255,0.2)]"
          : "bg-app-card/50 text-muted-text border-app-border hover:border-electric-blue/30"
      } border backdrop-blur-md`}
    >
      {active && (
        <motion.div
          layoutId="project-tab-bg"
          className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-transparent"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Icon
        className={`w-4 h-4 ${active ? "animate-pulse" : "group-hover:text-electric-blue/70 transition-colors"}`}
      />
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function ProjectCard({
  project,
  onClick,
  index = 0,
}: {
  project: any;
  onClick: () => void;
  index?: number;
}) {
  const Icon = project.icon;
  const isFeatured = project.featured;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      custom={index}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        bounce: 0.2,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer w-full box-border ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      } glass-card border border-app-border hover:border-electric-blue/50 transition-all duration-500`}
      style={{
        minHeight: isFeatured ? "400px" : "300px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-app-bg/80 group-hover:bg-app-bg/60 transition-colors duration-500 z-10 md:mix-blend-overlay" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-700 z-10 md:mix-blend-color-dodge`}
        />
        {/* Tech Grid Pattern */}
        <div
          className="hidden md:block absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 z-10"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <img
          src={project.bgImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div
            className={`w-12 h-12 rounded-xl bg-app-card/80 border border-app-border backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-electric-blue group-hover:border-electric-blue/50 transition-all duration-300 shadow-lg relative overflow-hidden`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity`}
            />
            <Icon className="w-6 h-6 relative z-10" />
          </div>
          <div className="flex items-center gap-2">
            {isFeatured && (
              <span className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-[10px] font-mono tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(0,122,255,0.2)] font-bold flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                Featured
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-app-bg/50 backdrop-blur-md border border-app-border flex items-center justify-center text-muted-text group-hover:text-white group-hover:bg-electric-blue/20 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-[10px] font-mono text-electric-blue uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-electric-blue/50" />
            {project.type}
          </div>
          <h3
            className={`font-semibold text-app-text mb-3 group-hover:text-electric-blue transition-colors ${isFeatured ? "text-3xl" : "text-2xl"}`}
          >
            {project.title}
          </h3>
          <p
            className={`text-muted-text/80 text-sm leading-relaxed mb-6 ${isFeatured ? "line-clamp-3" : "line-clamp-2"}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack
              .slice(0, isFeatured ? 4 : 3)
              .map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-app-bg/60 backdrop-blur-md border border-app-border text-muted-text text-xs rounded-full group-hover:border-electric-blue/30 transition-colors shadow-sm"
                >
                  {tech}
                </span>
              ))}
            {project.techStack.length > (isFeatured ? 4 : 3) && (
              <span className="px-3 py-1 bg-app-bg/60 backdrop-blur-md border border-app-border text-muted-text text-xs rounded-full">
                +{project.techStack.length - (isFeatured ? 4 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Animated Bottom Glow Line */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.color} w-0 group-hover:w-full transition-all duration-700 ease-out z-20`}
      />
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("modal-open");
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("modal-open");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("modal-open");
    };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [project, onClose]);

  if (!project) return null;
  const Icon = project.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-app-bg/90 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal-content relative w-full max-w-5xl bg-app-card border border-electric-blue/30 rounded-[2.5rem] flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,122,255,0.15)] hide-scrollbar"
        >
          {/* Left Column: Visuals */}
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
            <div className="hidden md:block absolute inset-0 bg-app-bg/40 z-10 mix-blend-overlay" />
            <div
              className={`hidden md:block absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 z-10 mix-blend-color-dodge`}
            />
            <img
              src={project.bgImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay Gradient for readability on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-app-card via-app-card/20 to-transparent md:hidden z-10" />

            <div className="absolute top-6 left-6 z-20">
              <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white shadow-lg">
                <Activity className="w-3 h-3 text-electric-blue animate-pulse" />
                System Active
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto relative z-20 flex flex-col bg-app-card/95 backdrop-blur-md">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-app-bg flex items-center justify-center border border-app-border text-muted-text hover:text-white hover:border-white/30 transition-all z-30"
            >
              ✕
            </button>

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white mb-8 shadow-lg`}
            >
              <Icon className="w-8 h-8" />
            </div>

            <div className="text-xs font-mono text-electric-blue uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-electric-blue/50" />
              {project.category}
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-app-text mb-4 leading-tight">
              {project.title}
            </h2>

            <p className="text-muted-text text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="mb-8">
              <h4 className="text-sm font-semibold text-app-text uppercase tracking-widest mb-4 flex items-center gap-2">
                <Box className="w-4 h-4 text-electric-blue" /> Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-app-bg border border-app-border text-app-text text-sm rounded-lg hover:border-electric-blue/50 transition-colors shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-8 border-t border-app-border">
              <button
                aria-label="View live preview"
                className="flex-1 px-6 py-4 bg-app-text text-app-bg font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-electric-blue hover:text-white transition-all group shadow-lg"
              >
                <Eye className="w-5 h-5" />
                Live Preview
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button
                aria-label="View source code on GitHub"
                className="px-6 py-4 bg-app-bg border border-app-border text-app-text font-semibold rounded-xl flex items-center justify-center hover:border-electric-blue/50 hover:text-electric-blue transition-all shadow-md"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Projects() {
  const sectionRef = useEngagementTracker("Projects");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.ALL);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    PROJECTS.forEach((p) => p.techStack.forEach((t) => techs.add(t)));
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    const categoryMatch =
      activeCategory === CATEGORIES.ALL || p.category === activeCategory;
    const techMatch = !activeTech || p.techStack.includes(activeTech);
    const searchMatch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && techMatch && searchMatch;
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 relative z-10 px-6 w-full max-w-full box-border overflow-hidden mx-auto"
    >
      {/* Background Ornaments */}
      <div className="hidden md:block absolute top-0 right-0 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">
        <div className="border-l-2 border-electric-blue/50 pl-6 relative">
          <div className="hidden md:block absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-electric-blue via-transparent to-transparent" />
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            <span className="text-xs font-mono text-electric-blue uppercase tracking-widest">
              Innovation Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-app-text break-words">
            System Architectures
          </h2>
          <p className="text-muted-text font-light text-lg max-w-xl break-words">
            Cinematic showcases of launched AI, interactive ecosystems, and
            advanced robotics projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <FilterTab
            label={CATEGORIES.ALL}
            active={activeCategory === CATEGORIES.ALL}
            icon={Box}
            onClick={() => setActiveCategory(CATEGORIES.ALL)}
          />
          <FilterTab
            label={CATEGORIES.ROBOTICS}
            active={activeCategory === CATEGORIES.ROBOTICS}
            icon={Rocket}
            onClick={() => setActiveCategory(CATEGORIES.ROBOTICS)}
          />
          <FilterTab
            label={CATEGORIES.WEB}
            active={activeCategory === CATEGORIES.WEB}
            icon={Server}
            onClick={() => setActiveCategory(CATEGORIES.WEB)}
          />
          <FilterTab
            label={CATEGORIES.GAMES}
            active={activeCategory === CATEGORIES.GAMES}
            icon={Gamepad2}
            onClick={() => setActiveCategory(CATEGORIES.GAMES)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12 relative z-10 overflow-hidden">
        <div className="relative w-full md:max-w-xs shrink-0 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text group-focus-within:text-electric-blue transition-colors duration-500" />
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-app-card/50 border border-app-border rounded-xl py-3 pl-10 pr-4 text-sm text-app-text placeholder:text-muted-text/50 focus:outline-none focus:border-electric-blue focus:ring-4 focus:ring-electric-blue/20 focus:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all duration-500 backdrop-blur-md"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <button
            onClick={() => setActiveTech(null)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
              !activeTech
                ? "bg-electric-blue/20 text-electric-blue border-electric-blue/50 shadow-[0_0_15px_rgba(0,122,255,0.2)]"
                : "bg-app-card/50 text-muted-text border-app-border hover:border-electric-blue/30"
            } border backdrop-blur-md`}
          >
            All Tech
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech(tech)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                activeTech === tech
                  ? "bg-electric-blue/20 text-electric-blue border-electric-blue/50 shadow-[0_0_15px_rgba(0,122,255,0.2)]"
                  : "bg-app-card/50 text-muted-text border-app-border hover:border-electric-blue/30"
              } border backdrop-blur-md`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              project={project}
              onClick={() => setSelectedProject(project as any)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
