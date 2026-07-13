import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowDown, Download, Github, Linkedin, Code2, Terminal as TerminalIcon } from "lucide-react";
import { profile, stats } from "../data/portfolio";

const iconMap = { github: Github, linkedin: Linkedin, code: Code2, terminal: TerminalIcon };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Hero = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
    >
      <div className="grid-bg-pan absolute inset-0 z-0 opacity-70" />
      <div className="glow-primary absolute -left-40 top-10 z-0 h-[420px] w-[420px] blur-3xl" />
      <div className="glow-secondary absolute right-0 top-40 z-0 h-[360px] w-[360px] blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FFA3]" />
            <span className="mono-label text-[10px] text-zinc-300">Available for internships</span>
          </motion.div>

          <motion.p variants={item} className="mb-4 font-mono text-sm text-[#00FFA3]">
            {"> "}Hi, my name is
          </motion.p>

          <motion.h1
            variants={item}
            className="heading-font text-5xl font-black leading-[0.95] tracking-tighter text-white sm:text-6xl lg:text-7xl"
          >
            Krishnansh
            <br />
            <span className="text-[#00FFA3] text-glow">Puri.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="heading-font mt-4 text-2xl font-bold tracking-tight text-zinc-500 sm:text-3xl"
          >
            I build things for the web & train AI.
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-zinc-400">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              data-testid="hero-view-work-btn"
              onClick={() => go("projects")}
              className="group flex items-center gap-2 border border-[#00FFA3] bg-[#00FFA3] px-6 py-3 font-mono text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <a
              data-testid="hero-resume-btn"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-white/20 px-6 py-3 font-mono text-sm font-semibold text-white transition-colors duration-300 hover:border-[#00FFA3] hover:text-[#00FFA3]"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center gap-5">
            {profile.socials.map((s) => {
              const Icon = iconMap[s.icon] || Code2;
              return (
                <a
                  key={s.label}
                  data-testid={`hero-social-${s.label.toLowerCase()}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-zinc-500 transition-colors duration-300 hover:-translate-y-1 hover:text-[#00FFA3]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* 3D tilt code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <Tilt
            glareEnable
            glareMaxOpacity={0.15}
            glareColor="#00FFA3"
            glarePosition="all"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            className="animate-float-slow"
          >
            <div
              data-testid="hero-code-card"
              className="border border-white/10 bg-[#0A0A0A] shadow-2xl shadow-black/60"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs text-zinc-500">developer.ts</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed">
  <span className="text-muted-foreground">const </span>
  <span className="text-primary">dev</span>
  <span className="text-foreground"> = {"{"}</span>
  {"\n  "}
  <span className="text-primary">name</span>
  <span className="text-foreground">: </span>
  <span className="text-amber-300">"Krishnansh Puri"</span>
  <span className="text-foreground">,</span>
  {"\n  "}
  <span className="text-primary">role</span>
  <span className="text-foreground">: </span>
  <span className="text-amber-300">"Software Developer"</span>
  <span className="text-foreground">,</span>
  {"\n  "}
  <span className="text-primary">stack</span>
  <span className="text-foreground">: [</span>
  <span className="text-amber-300">"React"</span>
  <span className="text-foreground">, </span>
  <span className="text-amber-300">"Node"</span>
  <span className="text-foreground">, </span>
  <span className="text-amber-300">"PyTorch"</span>
  <span className="text-foreground">],</span>
  {"\n  "}
  <span className="text-primary">cgpa</span>
  <span className="text-foreground">: </span>
  <span className="text-[#4F46E5]">9.63</span>
  <span className="text-foreground">,</span>
  {"\n  "}
  <span className="text-primary">focus</span>
  <span className="text-foreground">: </span>
  <span className="text-amber-300">"full-stack + AI"</span>
  <span className="text-foreground">,</span>
  {"\n  "}
  <span className="text-primary">openToWork</span>
  <span className="text-foreground">: </span>
  <span className="text-primary">true</span>
  {"\n"}
  <span className="text-foreground">{"};"}</span>
  {"\n"}
  <span className="text-muted-foreground animate-blink">_</span>
</pre>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        data-testid="hero-stats"
        className="relative z-10 mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-px border border-white/10 bg-white/10 px-6 lg:mx-10 lg:mt-24 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-[#050505] p-6" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
            <div className="heading-font text-4xl font-black text-white">
              {s.value}
              <span className="ml-1 text-base font-medium text-[#00FFA3]">{s.suffix}</span>
            </div>
            <div className="mono-label mt-2 text-[10px] text-zinc-500">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
