import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { profile } from "../data/portfolio";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

const contactInfo = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
];

export const Contact = () => {
    console.log(import.meta.env.VITE_BACKEND_URL);
console.log(API);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 lg:py-32">
      <div className="glow-primary absolute left-1/4 top-1/4 z-0 h-[360px] w-[360px] blur-3xl opacity-50" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="05" label="say hello" title="Get In Touch" testId="contact-heading" />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm leading-relaxed text-zinc-400">
              I'm currently open to internships and interesting collaborations. Whether you have a
              question or just want to say hi, my inbox is always open.
            </p>
            <div className="mt-8 space-y-4">
              {contactInfo.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <div className="flex items-center gap-4 border border-white/10 bg-[#0A0A0A] p-4 transition-colors duration-300 hover:border-[#00FFA3]/40">
                    <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-[#00FFA3]" />
                    </div>
                    <div>
                      <div className="mono-label text-[10px] text-zinc-500">{c.label}</div>
                      <div className="font-mono text-sm text-white">{c.value}</div>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} data-testid={`contact-info-${c.label.toLowerCase()}`}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} data-testid={`contact-info-${c.label.toLowerCase()}`}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="border border-white/10 bg-[#0A0A0A] p-7 lg:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mono-label mb-2 block text-[10px] text-zinc-500">Name *</label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  data-testid="contact-name-input"
                  className="rounded-none border-white/10 bg-[#050505] font-mono text-white placeholder:text-zinc-600 focus-visible:ring-[#00FFA3]"
                />
              </div>
              <div>
                <label className="mono-label mb-2 block text-[10px] text-zinc-500">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@email.com"
                  data-testid="contact-email-input"
                  className="rounded-none border-white/10 bg-[#050505] font-mono text-white placeholder:text-zinc-600 focus-visible:ring-[#00FFA3]"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="mono-label mb-2 block text-[10px] text-zinc-500">Subject</label>
              <Input
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="What's this about?"
                data-testid="contact-subject-input"
                className="rounded-none border-white/10 bg-[#050505] font-mono text-white placeholder:text-zinc-600 focus-visible:ring-[#00FFA3]"
              />
            </div>
            <div className="mt-5">
              <label className="mono-label mb-2 block text-[10px] text-zinc-500">Message *</label>
              <Textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Tell me about your idea..."
                rows={5}
                data-testid="contact-message-input"
                className="rounded-none border-white/10 bg-[#050505] font-mono text-white placeholder:text-zinc-600 focus-visible:ring-[#00FFA3]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit-btn"
              className="mt-7 flex w-full items-center justify-center gap-2 border border-[#00FFA3] bg-[#00FFA3] px-6 py-3.5 font-mono text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send message <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
