"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Github, Linkedin } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Try emailing directly.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Reset after 5s
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-[128px] max-w-[1280px] mx-auto px-6 md:px-12 relative">
      <SectionLabel number="04" label="CONTACT" />

      <h2 className="font-display font-bold text-h1 md:text-5xl text-[var(--text-primary)] mb-6">
        Let's Build Together
      </h2>
      <p className="font-body text-xl text-[var(--text-secondary)] mb-16 md:mb-24 max-w-2xl">
        Available for freelance projects, collaborations, and internship opportunities.
      </p>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* LEFT (50%) */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <p className="font-body text-body-lg md:text-xl text-[var(--text-primary)] leading-relaxed mb-12 max-w-lg">
              I'm currently taking on freelance web development work. If you have a project in mind — or just want to talk tech — reach out.
            </p>
            
            <div className="mb-12">
              <span className="block font-mono text-xs tracking-widest text-[var(--text-secondary)] mb-4">EMAIL</span>
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-display text-2xl md:text-3xl text-[var(--text-primary)] transition-colors hover:text-[var(--accent-500)] hover:text-glow"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <span className="block font-mono text-xs tracking-widest text-[var(--text-secondary)] mb-4">SOCIALS</span>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/amaan-exe" 
                target="_blank" 
                rel="noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/md-amanullah-79523224b/" 
                target="_blank" 
                rel="noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-500)] transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT (50%) */}
        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative group/input">
              <input 
                type="text" 
                name="name" 
                id="name"
                required 
                minLength={2}
                className="block px-4 pb-2.5 pt-6 w-full text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--bg-border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-500)] focus:shadow-[var(--glow-sm)] peer transition-all duration-300"
                placeholder=" "
              />
              <label 
                htmlFor="name" 
                className="absolute text-sm text-[var(--text-secondary)] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--accent-500)] cursor-text"
              >
                Name
              </label>
            </div>

            <div className="relative group/input">
              <input 
                type="email" 
                name="email" 
                id="email"
                required 
                className="block px-4 pb-2.5 pt-6 w-full text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--bg-border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-500)] focus:shadow-[var(--glow-sm)] peer transition-all duration-300"
                placeholder=" "
              />
              <label 
                htmlFor="email" 
                className="absolute text-sm text-[var(--text-secondary)] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--accent-500)] cursor-text"
              >
                Email
              </label>
            </div>

            <div className="relative group/input">
              <input 
                type="text" 
                name="subject" 
                id="subject"
                required 
                className="block px-4 pb-2.5 pt-6 w-full text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--bg-border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-500)] focus:shadow-[var(--glow-sm)] peer transition-all duration-300"
                placeholder=" "
              />
              <label 
                htmlFor="subject" 
                className="absolute text-sm text-[var(--text-secondary)] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--accent-500)] cursor-text"
              >
                Subject
              </label>
            </div>

            <div className="relative group/input">
              <textarea 
                name="message" 
                id="message"
                required 
                minLength={20}
                rows={5}
                className="block px-4 pb-2.5 pt-6 w-full text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--bg-border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-500)] focus:shadow-[var(--glow-sm)] peer transition-all duration-300 resize-none"
                placeholder=" "
              ></textarea>
              <label 
                htmlFor="message" 
                className="absolute text-sm text-[var(--text-secondary)] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--accent-500)] cursor-text"
              >
                Message
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || status === "success"}
              className={`w-full py-4 px-6 border transition-all duration-300 font-mono tracking-widest text-sm flex items-center justify-center ${
                status === "success" 
                  ? "bg-[var(--success)]/10 border-[var(--success)] text-[var(--success)]"
                  : status === "error"
                  ? "bg-[var(--error)]/10 border-[var(--error)] text-[var(--error)]"
                  : "bg-transparent border-[var(--accent-500)] text-[var(--accent-500)] hover:bg-[var(--accent-500)] hover:text-[#050508] hover:shadow-[var(--glow-md)]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : status === "success" ? (
                "Sent ✓"
              ) : (
                "Send Message →"
              )}
            </button>
            
            {status === "error" && (
              <p className="text-[var(--error)] text-sm mt-2">{message}</p>
            )}
            {status === "success" && (
              <p className="text-[var(--success)] text-sm mt-2">Message sent! I'll reply soon.</p>
            )}
          </form>
        </div>
      </div>

      {/* Toast Notification for top-right as per spec */}
      {status !== "idle" && (
        <div 
          className="fixed top-24 right-6 z-[200] animate-slide-in-right"
          style={{ animationFillMode: "both" }}
        >
          <div className={`px-6 py-4 border rounded shadow-lg backdrop-blur-md font-mono text-sm ${
            status === "success" 
              ? "bg-[var(--success)]/10 border-[var(--success)] text-[var(--success)]"
              : "bg-[var(--error)]/10 border-[var(--error)] text-[var(--error)]"
          }`}>
            {status === "success" ? "Message sent! I'll reply soon." : "Something went wrong. Try emailing directly."}
          </div>
        </div>
      )}
    </section>
  );
}
