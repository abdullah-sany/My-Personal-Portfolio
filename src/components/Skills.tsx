import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const technologies = [
  { name: 'Next.js', orbit: 1, angle: 0, icon: 'Nx' },
  { name: 'React', orbit: 1, angle: 120, icon: 'Re' },
  { name: 'Tailwind CSS', orbit: 1, angle: 240, icon: 'Tw' },
  { name: 'Node.js', orbit: 2, angle: 45, icon: 'No' },
  { name: 'TypeScript', orbit: 2, angle: 135, icon: 'Ts' },
  { name: 'MongoDB', orbit: 2, angle: 225, icon: 'Mg' },
  { name: 'Firebase', orbit: 2, angle: 315, icon: 'Fb' },
  { name: 'OpenAI API', orbit: 3, angle: 30, icon: 'Oa' },
  { name: 'Gemini API', orbit: 3, angle: 102, icon: 'Gm' },
  { name: 'Framer Motion', orbit: 3, angle: 174, icon: 'Fm' },
  { name: 'Three.js', orbit: 3, angle: 246, icon: 'Th' },
  { name: 'GSAP', orbit: 3, angle: 318, icon: 'Gs' },
];

export function Skills() {
  const [mounted, setMounted] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const hoveredTechRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mounted || !orbitContainerRef.current) return;

    const container = orbitContainerRef.current;
    let rafId: number;
    let angle = 0;
    let targetSpeed = 1;
    let currentSpeed = 1;
    let targetScale = 1;
    let currentScale = 1;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updateFrame);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDist = rect.width / 2;
      
      if (dist < maxDist) {
        // Decrease speed as mouse gets closer to center
        targetSpeed = Math.max(0.05, Math.min(1, Math.pow(dist / maxDist, 1.5)));
      } else {
        targetSpeed = 1;
      }
    };

    const handleMouseLeave = () => {
      targetSpeed = 1;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.0015;
      targetScale -= e.deltaY * zoomSensitivity;
      targetScale = Math.max(0.5, Math.min(targetScale, 3));
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    const updateFrame = () => {
      // Override speed to complete pause if actively hovering a node
      const finalTargetSpeed = hoveredTechRef.current ? 0 : targetSpeed;
      
      // Smooth interpolation for velocity changes
      currentSpeed += (finalTargetSpeed - currentSpeed) * 0.05;
      angle = (angle + 0.15 * currentSpeed) % 360;

      // Smooth interpolation for scale
      currentScale += (targetScale - currentScale) * 0.1;

      const scaleWrapper = container.querySelector('.tech-scale-wrapper') as HTMLDivElement | null;
      if (scaleWrapper) {
        scaleWrapper.style.transform = `scale(${currentScale})`;
      }

      const wrapper = container.querySelector('.tech-orbit-wrapper') as HTMLDivElement | null;
      const nodes = container.querySelectorAll('.tech-node-inner');

      if (wrapper) {
        wrapper.style.transform = `rotate(${angle}deg)`;
      }

      nodes.forEach((node) => {
        (node as HTMLDivElement).style.transform = `rotate(${-angle}deg)`;
      });

      if (isVisible) {
        rafId = requestAnimationFrame(updateFrame);
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <section id="skills" className="py-24 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="mb-16 border-l-2 border-electric-blue/30 pl-6">
          <div className="h-10 w-64 bg-app-card/50 rounded animate-pulse mb-4" />
          <div className="h-6 w-96 max-w-full bg-app-card/50 rounded animate-pulse" />
        </div>
        <div className="glass-panel w-full h-[500px] md:h-[700px] rounded-[2.5rem] flex items-center justify-center border-app-border">
          <div className="flex flex-col items-center gap-4 opacity-50">
            <span className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono text-muted-text uppercase tracking-widest">Loading Technology Ecosystem...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 relative z-10 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-16 border-l-2 border-electric-blue/30 pl-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-app-text">Technology Ecosystem</h2>
        <p className="text-muted-text font-light text-lg md:text-xl max-w-2xl">The interconnected technologies powering my AI, automation, and full-stack engineering workflow.</p>
      </div>

      <motion.div
        ref={orbitContainerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel w-full h-[500px] md:h-[700px] rounded-[2.5rem] overflow-hidden relative flex items-center justify-center border border-app-border group cursor-zoom-in"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,122,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="tech-scale-wrapper w-full h-full absolute inset-0 flex items-center justify-center will-change-transform">
          {/* Orbits */}
        {[1, 2, 3].map((orbit) => (
          <div 
            key={`orbit-${orbit}`}
            className="absolute rounded-full border border-app-border/30 border-dashed pointer-events-none"
            style={{
              width: isMobile ? orbit * 140 : orbit * 200,
              height: isMobile ? orbit * 140 : orbit * 200,
              opacity: hoveredTech ? 0.1 : 0.4,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}

        {/* Center Node */}
        <div className="absolute z-30 w-24 h-24 md:w-32 md:h-32 rounded-full bg-electric-blue/10 border border-electric-blue/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(0,122,255,0.15)] pointer-events-none">
          <span className="text-lg md:text-2xl font-bold font-mono text-white tracking-wider text-glow">SANY.AI</span>
        </div>

        {/* Tech Nodes */}
        <div className="absolute inset-0 z-20 tech-orbit-wrapper will-change-transform">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {technologies.map((tech) => {
              const radius = isMobile ? tech.orbit * 70 : tech.orbit * 100;
              const angleRad = (tech.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              
              const isHovered = hoveredTech === tech.name;
              const isFaded = hoveredTech !== null && !isHovered;

              return (
                <line
                  key={`line-${tech.name}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  className={`transition-all duration-300 stroke-electric-blue ${isHovered ? 'animate-pulse' : ''}`}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{
                    opacity: isFaded ? 0.05 : isHovered ? 0.6 : 0.15,
                  }}
                />
              );
            })}
          </svg>

          {technologies.map((tech) => {
            const radius = isMobile ? tech.orbit * 70 : tech.orbit * 100;
            const angleRad = (tech.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            const isHovered = hoveredTech === tech.name;
            const isFaded = hoveredTech !== null && !isHovered;

            return (
              <div
                key={tech.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  opacity: isFaded ? 0.3 : 1,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={() => {
                  setHoveredTech(tech.name);
                  hoveredTechRef.current = tech.name;
                }}
                onMouseLeave={() => {
                  setHoveredTech(null);
                  hoveredTechRef.current = null;
                }}
              >
                <div className="tech-node-inner will-change-transform">
                  <div className="group/node relative cursor-pointer">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-app-card/80 border border-app-border flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:border-electric-blue hover:bg-electric-blue/10 hover:shadow-[0_0_20px_rgba(0,122,255,0.3)]">
                      <span className="text-sm md:text-base font-semibold text-muted-text group-hover/node:text-electric-blue transition-colors">{tech.icon}</span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="bg-app-bg/95 backdrop-blur-md border border-app-border px-4 py-2 rounded-xl text-xs sm:text-sm font-mono whitespace-nowrap text-white shadow-xl">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        </div>
      </motion.div>
    </section>
  );
}
