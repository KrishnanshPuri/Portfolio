import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ExternalLink, Github, ArrowUpRight, FolderGit2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { projects } from "../data/portfolio";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={project.featured ? "md:col-span-2 md:row-span-2" : ""}
      data-testid={`project-card-${index}`}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.1}
        glareColor="#00FFA3"
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        className="h-full"
      >
        <div className="group flex h-full flex-col justify-between border border-white/10 bg-[#0A0A0A] p-7 transition-colors duration-300 hover:border-[#00FFA3]/40">
          <div>
            <div className="mb-5 flex items-start justify-between">
              <FolderGit2 className="h-9 w-9 text-[#00FFA3]" />
              <div className="flex items-center gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`project-github-${index}`}
                    aria-label={`${project.name} GitHub`}
                    className="text-zinc-500 transition-colors hover:text-[#00FFA3]"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`project-demo-${index}`}
                    aria-label={`${project.name} live demo`}
                    className="text-zinc-500 transition-colors hover:text-[#00FFA3]"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

            {project.featured && (
              <span className="mono-label mb-3 inline-block text-[10px] text-[#4F46E5]">Featured project</span>
            )}
            <h3 className="heading-font flex items-center gap-2 text-xl font-bold text-white transition-colors group-hover:text-[#00FFA3]">
              {project.name}
              <ArrowUpRight className="h-5 w-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-500">{project.subtitle}</p>
            <p className={`mt-4 font-mono leading-relaxed text-zinc-400 ${project.featured ? "text-sm" : "text-xs"}`}>
              {project.description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="border border-white/10 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" data-testid="projects-section" className="relative py-24 lg:py-32">
      <div className="glow-secondary absolute right-0 top-1/3 z-0 h-[380px] w-[380px] blur-3xl opacity-60" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="03" label="things i built" title="Featured Projects" testId="projects-heading" />
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
