import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useState, useEffect } from "react";
import {
  BookOpen,
  CheckCircle,
  Brain,
  PenTool,
  Award,
  Clock,
  Star,
  Hexagon,
  Terminal,
  Layout,
  Code,
} from "lucide-react";

const CATEGORIES = {
  ALL: "All",
  AI: "AI & Programming",
  DESIGN: "Design & Creative",
};

const CERTIFICATIONS = [
  {
    title: "Advanced Prompt Engineering",
    platform: "Udemy",
    year: "2026",
    category: CATEGORIES.AI,
    icon: Brain,
    color: "from-electric-blue to-purple-600",
  },
  {
    title: "ChatGPT Prompt Engineering",
    platform: "Udemy",
    year: "2026",
    category: CATEGORIES.AI,
    icon: Terminal,
    color: "from-cyan-400 to-electric-blue",
  },
  {
    title: "AI for Coding",
    platform: "Udemy",
    year: "2026",
    category: CATEGORIES.AI,
    icon: Code,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Python Programming Mastery",
    platform: "Udemy",
    year: "2026",
    category: CATEGORIES.AI,
    icon: Hexagon,
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "Python Flask",
    platform: "Udemy",
    year: "2026",
    category: CATEGORIES.AI,
    icon: Layout,
    color: "from-teal-400 to-blue-500",
  },
  {
    title: "Web Development",
    platform: "Udemy",
    year: "2026",
    category: CATEGORIES.AI,
    icon: BookOpen,
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Graphics Designing (Photoshop)",
    platform: "10 Minute School",
    year: "2025",
    category: CATEGORIES.DESIGN,
    icon: PenTool,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Graphic Design (Canva)",
    platform: "Mexemy Academy",
    year: "2025",
    category: CATEGORIES.DESIGN,
    icon: Star,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Adobe Illustration",
    platform: "10 Minute School",
    year: "2025",
    category: CATEGORIES.DESIGN,
    icon: Award,
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    title: "Motion Graphics",
    platform: "10 Minute School",
    year: "2025",
    category: CATEGORIES.DESIGN,
    icon: Hexagon,
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Logo Design",
    platform: "10 Minute School",
    year: "2025",
    category: CATEGORIES.DESIGN,
    icon: PenTool,
    color: "from-red-400 to-pink-600",
  },
];

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group h-full ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-electric-blue/0 group-hover:from-electric-blue/10 group-hover:to-transparent transition-all duration-500 rounded-3xl"
        style={{ transform: "translateZ(-10px)" }}
      ></div>
      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

function StatBox({ icon: Icon, value, label, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-6 flex items-center gap-4 relative overflow-hidden group"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-electric-blue/5 rounded-full blur-2xl group-hover:bg-electric-blue/20 transition-colors duration-500"></div>
      <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue relative z-10">
        <Icon className="w-6 h-6" />
      </div>
      <div className="relative z-10">
        <div className="text-2xl font-bold text-app-text">{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-text">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function AutoCarousel() {
  // Double the array for seamless scrolling
  const carouselItems = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <div className="w-full overflow-hidden mt-16 pb-8 relative mask-horizontal-fade">
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-app-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-app-bg to-transparent z-10 pointer-events-none" />

      <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
        {carouselItems.map((cert, i) => {
          const Icon = cert.icon;
          return (
            <div key={i} className="w-72 sm:w-[300px] shrink-0">
              <TiltCard>
                <div className="glass-card p-6 h-full flex flex-col justify-between border-app-border hover:border-electric-blue/40 transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${cert.color} text-white shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 bg-app-card px-2 py-1 rounded-md border border-app-border">
                      <CheckCircle className="w-3 h-3 text-electric-blue" />
                      <span className="font-mono text-[10px] text-muted-text/80">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-app-text whitespace-normal line-clamp-2 leading-snug mb-2">
                      {cert.title}
                    </h4>
                    <p className="text-muted-text/80 text-xs flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3" />
                      {cert.platform}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Education() {
  const [activeTab, setActiveTab] = useState(CATEGORIES.ALL);

  const filteredCerts = CERTIFICATIONS.filter(
    (c) => activeTab === CATEGORIES.ALL || c.category === activeTab,
  );

  return (
    <section
      id="certifications"
      className="py-24 relative z-10 px-6 w-full max-w-full box-border overflow-hidden mx-auto"
    >
      {/* Background Ornaments */}
      <div className="hidden md:block absolute top-1/4 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="mb-16 border-l-2 border-electric-blue/50 pl-6 relative w-full box-border">
        <div className="hidden md:block absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-electric-blue via-purple-500 to-transparent" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-app-text break-words">
          Courses & Certifications
        </h2>
        <p className="text-muted-text font-light text-lg break-words">
          Continuous learning is key to staying ahead. Here are my recent
          qualifications.
        </p>
      </div>

      {/* Floating Educational Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <StatBox icon={Award} value="11" label="Total Certs" delay={0.1} />
        <StatBox icon={Clock} value="350+" label="Learning Hrs" delay={0.2} />
        <StatBox icon={Brain} value="6" label="AI Courses" delay={0.3} />
        <StatBox icon={PenTool} value="5" label="Creative Skills" delay={0.4} />
      </div>

      {/* Category Filters */}
      <div className="flex overflow-x-auto sm:flex-wrap items-center gap-3 mb-10 pb-4 hide-scrollbar w-full">
        {Object.values(CATEGORIES).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === cat
                ? "bg-app-text text-app-bg shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "glass-panel text-muted-text hover:text-app-text hover:border-electric-blue/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid layout for active filtered certs */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full box-border"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="w-full box-border"
              >
                <TiltCard>
                  <div className="glass-card p-6 h-full flex flex-col justify-between border-app-border hover:border-electric-blue/50 hover:shadow-[0_0_30px_rgba(0,122,255,0.15)] transition-all duration-500 overflow-hidden relative group/card">
                    {/* Animated Holographic Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover/card:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cert.color} text-white shadow-lg relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-xl blur animate-pulse" />
                        <Icon className="w-6 h-6 relative z-10" />
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5 bg-electric-blue/10 border border-electric-blue/20 text-electric-blue px-3 py-1 rounded-full">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue"></span>
                          </span>
                          <span className="font-mono text-[10px] font-bold tracking-wider uppercase tracking-widest text-[#007AFF]">
                            Verified
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted-text/80 bg-app-card px-2 py-1 rounded-md border border-app-border">
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="text-[10px] uppercase tracking-widest text-electric-blue mb-2 font-mono">
                        {cert.category}
                      </div>
                      <h4 className="text-lg font-semibold text-app-text mb-2 leading-tight group-hover/card:text-electric-blue transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-muted-text/80 text-sm flex items-center gap-2">
                        <Hexagon className="w-3.5 h-3.5 text-muted-text/50" />
                        {cert.platform}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Futuristic Auto-scrolling Carousel */}
      <div className="mt-24 pt-16 border-t border-app-border/50 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-app-bg px-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-text/60 uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-electric-blue/50" />
            Evolving Knowledge Stream
            <span className="w-8 h-[1px] bg-electric-blue/50" />
          </div>
        </div>
        <AutoCarousel />
      </div>
    </section>
  );
}
