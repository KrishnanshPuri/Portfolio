import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import MarqueeModule from "react-fast-marquee";

const Marquee = MarqueeModule.default;
import { Code2, Layers, Database } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { skillGroups, marqueeStack } from "../data/portfolio";

const iconMap = { "code-2": Code2, layers: Layers, database: Database };
export const Skills = () => {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="02" label="my toolkit" title="Skills & Technologies" testId="skills-heading" />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = iconMap[group.icon] || Code2;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: gi * 0.12 }}
                data-testid={`skill-group-${gi}`}
              >
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.12}
                  glareColor="#00FFA3"
                  tiltMaxAngleX={7}
                  tiltMaxAngleY={7}
                  className="h-full"
                >
                  <div className="group h-full border border-white/10 bg-[#0A0A0A] p-8 transition-colors duration-300 hover:border-[#00FFA3]/40">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-[#00FFA3]/50">
                      <Icon className="h-6 w-6 text-[#00FFA3]" />
                    </div>
                    <h3 className="heading-font text-lg font-bold text-white">{group.title}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors duration-200 hover:border-[#00FFA3]/50 hover:text-[#00FFA3]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Infinite marquee of tech stack */}
      <div className="mt-16 border-y border-white/10 bg-[#0A0A0A]/60 py-6" data-testid="skills-marquee">
        <Marquee gradient gradientColor="#050505" gradientWidth={120} speed={40}>
          {marqueeStack.map((t, i) => (
            <span key={i} className="mx-8 heading-font text-2xl font-bold text-zinc-700 transition-colors hover:text-[#00FFA3]">
              {t}
              <span className="ml-8 text-[#00FFA3]">/</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
