import { motion } from 'motion/react';
import { Terminal, Database, ShieldCheck, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Stats() {
  const stats = [
    { label: 'Projects Completed', value: 42, icon: Terminal },
    { label: 'AI Systems Built', value: 15, icon: Cpu },
    { label: 'Happy Clients', value: 36, icon: ShieldCheck },
    { label: 'Database Architectures', value: 24, icon: Database },
  ];

  return (
    <section className="py-24 relative z-10 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-app-text">Live System Metrics</h2>
        <p className="text-muted-text font-light text-lg">Real-time operational statistics of the Sany OS.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: any, index: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= stat.value) {
        clearInterval(interval);
        current = stat.value;
      }
      setCount(current);
    }, 50);
    return () => clearInterval(interval);
  }, [stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 text-center group"
    >
      <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
        <stat.icon className="w-6 h-6" />
      </div>
      <div className="text-4xl md:text-5xl font-mono text-app-text mb-2">{count}</div>
      <p className="text-sm font-light text-muted-text/80 uppercase tracking-wider">{stat.label}</p>
    </motion.div>
  );
}
