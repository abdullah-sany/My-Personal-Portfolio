import { useEffect, useRef } from 'react';

export function useEngagementTracker(sectionName: string) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let entryTime: number | null = null;
    let totalTime = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User entered the section
            entryTime = performance.now();
            performance.mark(`${sectionName}-enter`);
          } else {
            // User left the section
            if (entryTime !== null) {
              const exitTime = performance.now();
              const duration = exitTime - entryTime;
              totalTime += duration;
              
              performance.mark(`${sectionName}-exit`);
              try {
                performance.measure(
                  `Engagement: ${sectionName}`,
                  `${sectionName}-enter`,
                  `${sectionName}-exit`
                );
              } catch (e) {
                // Ignore if marks are missing
              }
              
              // Only log significant engagement (> 1s)
              if (duration > 1000) {
                console.log(`[Performance/Web Vitals] ${sectionName} engagement: ${Math.round(duration)}ms (Total: ${Math.round(totalTime)}ms)`);
              }
              entryTime = null;
            }
          }
        });
      },
      { threshold: 0.3 } // Trigger when at least 30% visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [sectionName]);

  return ref;
}
