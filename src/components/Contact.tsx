import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useEngagementTracker } from "../hooks/useEngagementTracker";

export function Contact() {
  const sectionRef = useEngagementTracker("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email protocol is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email protocol format";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Payload string is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 relative z-10 px-6 w-full max-w-full box-border overflow-hidden mx-auto"
    >
      <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-app-text break-words">
          Initialize Connection
        </h2>
        <p className="text-muted-text font-light break-words">
          Open a secure channel for collaborations or inquiries.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-8 md:p-12 rounded-3xl border-app-border relative overflow-hidden max-w-4xl mx-auto w-full box-border"
      >
        <div className="hidden md:block absolute -top-40 -right-40 w-80 h-80 bg-electric-blue/10 blur-[40px] md:blur-[100px] rounded-full pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-text/80 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-app-card border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-app-text ${errors.name ? "border-red-500/50 focus:border-red-500/50" : "border-app-border"}`}
              />
              {errors.name && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-text/80 uppercase tracking-wider">
                Email Protocol
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-app-card border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-app-text ${errors.email ? "border-red-500/50 focus:border-red-500/50" : "border-app-border"}`}
              />
              {errors.email && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-text/80 uppercase tracking-wider">
              Payload String
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full bg-app-card border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-app-text resize-none ${errors.message ? "border-red-500/50 focus:border-red-500/50" : "border-app-border"}`}
            />
            {errors.message && (
              <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-app-text text-app-bg font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            Transmit Signal
            <Mail className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  Signal transmitted successfully. Awaiting response sequence.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      <div className="mt-20 flex justify-center gap-8">
        {[
          {
            Icon: Github,
            href: "https://github.com/mdabdulllahsany-ai",
            label: "GitHub",
          },
          {
            Icon: Linkedin,
            href: "https://www.linkedin.com/in/md-abdullah-sany-1449363b5",
            label: "LinkedIn",
          },
          {
            Icon: Twitter,
            href: "https://x.com/ma_sany_01",
            label: "X (Twitter)",
          },
        ].map(({ Icon, href, label }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-4 rounded-full glass-card hover:border-electric-blue/40 text-muted-text hover:text-white hover:bg-electric-blue/10 transition-all focus:outline-none focus:ring-2 focus:ring-electric-blue"
          >
            <Icon className="w-6 h-6" />
          </a>
        ))}
      </div>
    </section>
  );
}
