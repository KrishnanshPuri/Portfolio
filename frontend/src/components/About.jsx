import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { about, achievements } from "../data/portfolio";

export const About = () => {
  return (
    <section id="about" data-testid="about-section" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="01" label="who am i" title="About Me" testId="about-heading" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Bio + education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-5">
              {about.bio.map((p, i) => (
                <p key={i} className="font-mono text-sm leading-relaxed text-zinc-400">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 border border-white/10 bg-[#0A0A0A] p-6">
              <div className="flex items-start gap-4">
                <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-[#00FFA3]" />
                <div>
                  <h3 className="heading-font text-lg font-bold text-white">{about.education.degree}</h3>
                  <p className="mt-1 font-mono text-sm text-zinc-400">{about.education.institution}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-500">
                    <span>{about.education.period}</span>
                    <span className="text-[#00FFA3]">CGPA {about.education.cgpa}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Jalandhar, India</span>
                  </div>
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-3" data-testid={`about-achievement-${i}`}>
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#4F46E5]" />
                  <span className="font-mono text-sm leading-relaxed text-zinc-400">{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-white/10 bg-[#0A0A0A] shadow-xl shadow-black/50"
            data-testid="about-terminal"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-zinc-500">bash — krishnansh@nitj</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-relaxed">
              {about.terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i }}
                  className={
                    line.startsWith("$")
                      ? "text-[#00FFA3]"
                      : line.startsWith(">")
                      ? "text-zinc-500"
                      : "text-zinc-300"
                  }
                >
                  {line}
                </motion.p>
              ))}
              <span className="text-[#00FFA3] animate-blink">█</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
