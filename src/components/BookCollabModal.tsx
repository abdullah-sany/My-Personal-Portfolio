import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface BookCollabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookCollabModal({ isOpen, onClose }: BookCollabModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({
          name: "",
          email: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-app-bg/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-app-card border border-electric-blue/30 rounded-[2rem] shadow-[0_0_50px_rgba(0,122,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between p-6 border-b border-app-border">
              <div>
                <h3 className="text-2xl font-semibold text-app-text">
                  Initiate Collaboration
                </h3>
                <p className="text-sm text-muted-text mt-1">
                  Configure project parameters and establish connection.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-text hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative z-10 p-6 overflow-y-auto hide-scrollbar flex-1 modal-content">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-app-text">
                    Collaboration Request Transmitted Successfully
                  </h4>
                  <p className="text-muted-text max-w-md">
                    Our systems have received your project parameters. A secure
                    communication channel will be established shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-muted-text/80 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-app-bg/50 border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-sm text-app-text ${errors.name ? "border-red-500/50" : "border-app-border"}`}
                        placeholder="e.g. Jane Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-muted-text/80 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-app-bg/50 border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-sm text-app-text ${errors.email ? "border-red-500/50" : "border-app-border"}`}
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-muted-text/80 uppercase tracking-wider">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-app-bg/50 border border-app-border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-sm text-app-text appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="bg-app-card text-muted-text"
                        >
                          Select classification...
                        </option>
                        <option
                          value="web"
                          className="bg-app-card text-app-text"
                        >
                          Full-Stack Web App
                        </option>
                        <option
                          value="ai"
                          className="bg-app-card text-app-text"
                        >
                          AI Integration / Agent
                        </option>
                        <option
                          value="automation"
                          className="bg-app-card text-app-text"
                        >
                          Workflow Automation
                        </option>
                        <option
                          value="consulting"
                          className="bg-app-card text-app-text"
                        >
                          Technical Consulting
                        </option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-muted-text/80 uppercase tracking-wider">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-app-bg/50 border border-app-border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-sm text-app-text appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="bg-app-card text-muted-text"
                        >
                          Select allocation...
                        </option>
                        <option
                          value="small"
                          className="bg-app-card text-app-text"
                        >
                          &lt; $5,000
                        </option>
                        <option
                          value="medium"
                          className="bg-app-card text-app-text"
                        >
                          $5,000 - $15,000
                        </option>
                        <option
                          value="large"
                          className="bg-app-card text-app-text"
                        >
                          $15,000 - $50,000
                        </option>
                        <option
                          value="enterprise"
                          className="bg-app-card text-app-text"
                        >
                          $50,000+
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-muted-text/80 uppercase tracking-wider">
                      Project Scope / Payload
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-app-bg/50 border border-app-border rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue/50 transition-colors text-sm text-app-text resize-none"
                      placeholder="Describe the objectives and requirements..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-white font-medium transition-all shadow-[0_0_20px_rgba(0,122,255,0.4)] hover:shadow-[0_0_30px_rgba(0,122,255,0.6)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 ml-1" />
                          Initialize Project
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
