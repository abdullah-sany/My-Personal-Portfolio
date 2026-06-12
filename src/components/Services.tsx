import { motion } from 'motion/react';
import { Code, Server, Bot, MonitorPlay } from 'lucide-react';

export function Services() {
  const services = [
    {
      title: "AI Website Development",
      description: "Next-generation web interfaces powered by responsive AI elements and context-aware layouts.",
      icon: MonitorPlay,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Full Stack Systems",
      description: "Robust, scalable architectures leveraging Node.js, Express, and modern persistent databases.",
      icon: Server,
      color: "from-cyan-500 to-emerald-500"
    },
    {
      title: "Automation & AI Flows",
      description: "Intelligent workflows integrating LLMs and custom APIs to optimize digital operations.",
      icon: Bot,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Creative Prompt Engineering",
      description: "Precision-crafted instructions maximizing model outputs for generative content and logic.",
      icon: Code,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="py-24 relative z-10 px-6 w-full max-w-full box-border overflow-hidden mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-app-text break-words">System Capabilities</h2>
          <p className="text-muted-text font-light text-lg max-w-2xl break-words">Deploying elite technical solutions for modern challenges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {services.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-colors"
          >
            <div className={`hidden md:block absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${svc.color} opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} p-[1px] mb-8`}>
                <div className="w-full h-full bg-app-card rounded-2xl flex items-center justify-center">
                  <svc.icon className="w-7 h-7 text-app-text" />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-app-text mb-4">{svc.title}</h3>
              <p className="text-muted-text font-light leading-relaxed">
                {svc.description}
              </p>
            </div>
            
            {/* Hover scanline effect */}
            <div className="hidden md:block absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,122,255,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
