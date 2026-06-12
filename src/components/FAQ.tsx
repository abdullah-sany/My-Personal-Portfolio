import { motion, AnimatePresence } from 'motion/react';
import { Activity, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const faqs = [
    {
      q: "What is your main structural stack?",
      a: "I primarily architect applications using Next.js (App Router), Node.js, and MongoDB, heavily enhanced with modern styling frameworks like Tailwind CSS and Framer Motion for cinematic interaction."
    },
    {
      q: "How do you integrate AI into products?",
      a: "I integrate state-of-the-art LLMs (like GPT-4 and Gemini) to enable intelligent search, automated workflows, and generative interfaces. This involves advanced prompt engineering and secure server-side proxy configurations."
    },
    {
      q: "Do you design or just engineer?",
      a: "Both. I believe world-class engineering means nothing without premium UI/UX. I apply a minimal, futuristic, Apple-inspired aesthetic to all of my technical implementations."
    },
    {
      q: "Are you available for freelance collaboration?",
      a: "Yes. I frequently partner on cinematic SaaS products and AI-powered automation platforms. Use the contact console below to establish a secure connection."
    }
  ];

  return (
    <section className="py-24 relative z-10 px-6 max-w-3xl mx-auto">
      <div className="mb-16 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-semibold text-app-text">System Diagnostics (FAQ)</h2>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: any, index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden"
    >
      <button 
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-medium text-app-text">{faq.q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-text transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.3 }}
           >
             <div className="px-6 pb-5 text-sm text-muted-text leading-relaxed font-light">
               {faq.a}
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
