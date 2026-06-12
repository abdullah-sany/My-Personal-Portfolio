import { motion } from "motion/react";
import {
  ExternalLink,
  Award,
  Github,
  Star,
  GitFork,
  BookOpen,
  Users,
  Activity,
  GitCommit,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

function GithubStats() {
  const [stats, setStats] = useState({
    stars: "-",
    forks: "-",
    repos: "-",
    followers: "-",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const username = "mdabdullahsany"; // Assuming this based on name
        const userRes = await fetch(`https://api.github.com/users/${username}`);

        if (!userRes.ok) throw new Error("API failed");
        const user = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        );
        let stars = 0;
        let forks = 0;

        if (reposRes.ok) {
          const repos = await reposRes.json();
          repos.forEach((repo: any) => {
            stars += repo.stargazers_count;
            forks += repo.forks_count;
          });
        }

        setStats({
          stars: stars.toString(),
          forks: forks.toString(),
          repos: user.public_repos.toString(),
          followers: user.followers.toString(),
        });
      } catch (error) {
        console.log("Using fallback stats due to rate limit/error");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center border border-electric-blue/30 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
          <Github className="w-5 h-5 text-electric-blue" />
        </div>
        <div className="flex items-center gap-2 bg-app-bg/50 px-3 py-1 rounded-full border border-app-border backdrop-blur-sm">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
            Live Sync
          </span>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-semibold text-app-text">
          Open Source Ecosystem
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-app-card/80 border border-app-border rounded-xl p-3 flex flex-col justify-center relative overflow-hidden group/stat">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <Star className="w-4 h-4 text-yellow-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-app-text">
              {loading ? (
                <div className="w-8 h-8 rounded bg-white/10 animate-pulse my-0.5" />
              ) : (
                stats.stars
              )}
            </span>
            <span className="text-[10px] text-muted-text uppercase tracking-widest mt-1">
              Stars
            </span>
          </div>

          <div className="bg-app-card/80 border border-app-border rounded-xl p-3 flex flex-col justify-center relative overflow-hidden group/stat">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <GitFork className="w-4 h-4 text-purple-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-app-text">
              {loading ? (
                <div className="w-8 h-8 rounded bg-white/10 animate-pulse my-0.5" />
              ) : (
                stats.forks
              )}
            </span>
            <span className="text-[10px] text-muted-text uppercase tracking-widest mt-1">
              Forks
            </span>
          </div>

          <div className="bg-app-card/80 border border-app-border rounded-xl p-3 flex flex-col justify-center relative overflow-hidden group/stat">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <BookOpen className="w-4 h-4 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-app-text">
              {loading ? (
                <div className="w-8 h-8 rounded bg-white/10 animate-pulse my-0.5" />
              ) : (
                stats.repos
              )}
            </span>
            <span className="text-[10px] text-muted-text uppercase tracking-widest mt-1">
              Repos
            </span>
          </div>

          <div className="bg-app-card/80 border border-app-border rounded-xl p-3 flex flex-col justify-center relative overflow-hidden group/stat">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <Users className="w-4 h-4 text-amber-400 mb-2" />
            <span className="text-2xl font-bold font-mono text-app-text">
              {loading ? (
                <div className="w-12 h-8 rounded bg-white/10 animate-pulse my-0.5" />
              ) : (
                stats.followers
              )}
            </span>
            <span className="text-[10px] text-muted-text uppercase tracking-widest mt-1">
              Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BentoGrid() {
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const items = [
    {
      title: "AI Hybrid Projects",
      colSpan: "col-span-12 md:col-span-5 md:row-span-2",
      highlight: true,
    },
    {
      title: "Full Stack Apps",
      colSpan: "col-span-12 md:col-span-4 md:row-span-1",
    },
    {
      title: "Prompt Engineering",
      colSpan: "col-span-12 md:col-span-3 md:row-span-1",
      highlight: true,
    },
    {
      title: "AI Automation",
      colSpan: "col-span-12 md:col-span-3 md:row-span-1",
    },
    {
      title: "Live Tech Stack",
      colSpan: "col-span-12 md:col-span-4 md:row-span-1",
    },
    {
      id: "github-stats",
      colSpan: "col-span-12 md:col-span-8 md:row-span-1",
      isCustom: true,
    },
    {
      title: "Current Focus",
      colSpan: "col-span-12 md:col-span-4 md:row-span-1",
      highlight: true,
    },
  ];

  return (
    <section
      ref={containerRef}
      className={`py-24 relative z-10 px-6 max-w-7xl mx-auto ${!inView ? "[&_.animate-pulse]:!animate-none [&_.animate-spin]:!animate-none" : ""}`}
    >
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-app-text">
          Digital Ecosystem
        </h2>
        <p className="text-muted-text font-light text-lg max-w-2xl">
          Modular architecture defining a futuristic AI workspace.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[220px]">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card relative group overflow-hidden ${item.colSpan}`}
          >
            {item.highlight && (
              <div className="hidden md:block absolute -top-32 -left-32 w-64 h-64 bg-electric-blue/10 rounded-full blur-[80px] group-hover:bg-electric-blue/20 transition-colors duration-700 pointer-events-none" />
            )}

            {item.isCustom && item.id === "github-stats" ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-app-card via-app-card/90 to-transparent pointer-events-none z-10" />
                <GithubStats />
              </>
            ) : (
              <div className="p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-app-card flex items-center justify-center border border-app-border group-hover:border-electric-blue/50 transition-colors shadow-sm">
                  <Award className="w-5 h-5 text-app-text/80 group-hover:text-electric-blue transition-colors" />
                </div>

                <div>
                  <h3 className="text-xl font-medium text-app-text mb-2 group-hover:text-electric-blue transition-all">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-text/80 font-mono">
                    <span>Explore module</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-electric-blue" />
                  </div>
                </div>
              </div>
            )}

            {/* Hover border effect */}
            <div className="absolute inset-0 border border-transparent group-hover:border-electric-blue/20 rounded-2xl transition-colors duration-500 pointer-events-none z-30" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
