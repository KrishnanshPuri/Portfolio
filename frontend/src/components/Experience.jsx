import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { experience } from "../data/portfolio";

export const Experience = () => {
  return (
    <section id="experience" data-testid="experience-section" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="04" label="my journey" title="Experience & Impact" testId="experience-heading" />

        <div className="relative pl-8 md:pl-10">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 md:left-[11px]" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.org}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative"
                data-testid={`experience-item-${i}`}
              >
                {/* node */}
                <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center md:-left-10">
                  <span className="h-4 w-4 rounded-full border-2 border-[#00FFA3] bg-[#050505]" />
                  <span className="absolute h-2 w-2 rounded-full bg-[#00FFA3]" />
                </span>

                <div className="border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-[#00FFA3]/40">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="heading-font flex items-center gap-2 text-lg font-bold text-white">
                        <Briefcase className="h-4 w-4 text-[#00FFA3]" />
                        {exp.role}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-[#00FFA3]">{exp.org}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-xs text-zinc-500">{exp.date}</span>
                      <span className="border border-[#4F46E5]/40 bg-[#4F46E5]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#a5a0f0]">
                        {exp.badge}
                      </span>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-2 font-mono text-xs leading-relaxed text-zinc-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#00FFA3]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
