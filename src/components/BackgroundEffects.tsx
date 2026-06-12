import { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable heavy mouse tracking on mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 300;
      targetY = e.clientY - 300;
    };

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hidden md:block fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500">
      {/* Heavy vignette */}
      <div
        className="hidden md:block absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--bg-color) 100%)",
        }}
      />

      {/* Grid Pattern */}
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] transition-colors duration-500" />
      {/* Mobile background is intentionally left clear of 1px grids to prevent horizontal scanline / aliasing artifacts */}

      {/* Dynamic Cursor Glow (Desktop Only, CSS updated via ref) */}
      <div
        ref={glowRef}
        className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full mix-blend-screen will-change-transform pointer-events-none"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(0,122,255,0.08) 0%, transparent 100%)",
        }}
      />

      {/* Static Ambient Orbs (Optimized without blur filters) */}
      <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle_closest-side,rgba(30,58,138,0.15)_0%,transparent_100%)] pointer-events-none will-change-transform" />
      <div className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_closest-side,rgba(8,145,178,0.08)_0%,transparent_100%)] pointer-events-none will-change-transform" />
    </div>
  );
}
