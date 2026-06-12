import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing AI Systems...');

  useEffect(() => {
    const sequences = [
      { p: 20, t: 'Loading Neural Interface...' },
      { p: 50, t: 'Compiling Digital Experience...' },
      { p: 80, t: 'Launching Portfolio OS...' },
      { p: 100, t: 'System Online.' }
    ];

    let currentSeq = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= sequences[currentSeq]?.p) {
          setText(sequences[currentSeq].t);
          currentSeq++;
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-app-bg text-app-text"
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-64 space-y-6">
        <div className="h-0.5 w-full bg-glass-panel rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(0,122,255,0.8)]"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>
        <div className="flex justify-between items-center font-mono text-xs text-blue-400">
          <motion.span 
            key={text}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="tracking-wider"
          >
            {text}
          </motion.span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
