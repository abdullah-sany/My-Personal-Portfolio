import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', interactions: 65, views: 120 },
  { name: 'Feb', interactions: 80, views: 156 },
  { name: 'Mar', interactions: 105, views: 210 },
  { name: 'Apr', interactions: 130, views: 245 },
  { name: 'May', interactions: 175, views: 320 },
  { name: 'Jun', interactions: 240, views: 410 },
];

export const AnalyticsData = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 relative w-full px-6" id="analytics">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 md:p-10 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2 font-display">
                Engagement Metrics
              </h2>
              <p className="text-muted-text/80 max-w-xl">
                A real-time visualization of digital interactions and portfolio engagement over the past 6 months.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(0,122,255,0.5)]"></div>
                <span className="text-sm font-medium text-muted-text">Interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                <span className="text-sm font-medium text-muted-text">Views</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] md:h-[400px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.5)" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }} 
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '14px' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#007AFF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorInteractions)" 
                  activeDot={{ r: 6, fill: '#007AFF', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
