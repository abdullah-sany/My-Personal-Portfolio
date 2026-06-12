import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const toggleSound = () => {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    if (newState) {
      initAudio();
    }
  };

  const playTone = useCallback((freq: number, sweep: number, type: OscillatorType, duration: number, vol: number) => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (sweep) {
        osc.frequency.exponentialRampToValueAtTime(sweep, ctx.currentTime + duration);
    }
    
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [isSoundEnabled]);

  const playHover = useCallback(() => {
    playTone(300, 400, 'sine', 0.1, 0.05);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(600, 800, 'sine', 0.1, 0.1);
  }, [playTone]);

  useEffect(() => {
    if (!isSoundEnabled) return;

    let lastTarget: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('button, a, .glass-card, .glass-panel, .cursor-pointer') as HTMLElement | null;
      
      if (interactiveEl && interactiveEl !== lastTarget) {
         playHover();
         lastTarget = interactiveEl;
      } else if (!interactiveEl) {
         lastTarget = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;
  
        if (
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer')
        ) {
           playClick();
        }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleClick);
    
    return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mousedown', handleClick);
    }
  }, [isSoundEnabled, playHover, playClick]);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playHover, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
