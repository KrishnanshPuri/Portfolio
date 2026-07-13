import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  FolderGit2,
} from "lucide-react";

import { SectionHeading } from "./SectionHeading";
import { projects } from "../data/portfolio";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.08}
        glareColor="#00FFA3"
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        className="h-full"
      >
        <div className="group border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:border-[#00FFA3]/40">

          {/* Header */}
          <div className="mb-6 flex items-start justify-between">

            <FolderGit2 className="h-10 w-10 text-[#00FFA3]" />

            <div className="flex gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition hover:text-[#00FFA3]"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition hover:text-[#00FFA3]"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>

          </div>

          {project.featured && (
            <p className="mb-2 font-mono text-xs tracking-widest text-indigo-500">
              Featured Project
            </p>
          )}

          <h3 className="flex items-center gap-2 text-3xl font-bold text-white transition group-hover:text-[#00FFA3]">
            {project.name}

            <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </h3>

          <p className="mt-2 font-mono text-zinc-500">
            {project.subtitle}
          </p>

          <p className="mt-6 max-w-5xl font-mono leading-8 text-zinc-400">
            {project.description}
          </p>

          {/* Demo Video */}
          {project.featured && project.video && (
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10">

              {/* Browser Header */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-5 py-3">

                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>

                <span className="ml-5 font-mono text-xs text-zinc-500">
                  Live Demo
                </span>

              </div>

              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="
                  block
                  w-full
                  max-h-[500px]
                  object-cover
                  object-top
                  scale-[1.03]
                "
              >
                <source src={project.video} type="video/mp4" />
              </video>

            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">

            {project.tech.map((tech) => (
              <span
                key={tech}
                className="border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;

export const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-24"
    >
      <div className="glow-secondary absolute right-0 top-1/3 z-0 h-[380px] w-[380px] blur-3xl opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        <SectionHeading
          index="03"
          label="things i built"
          title="Featured Projects"
        />

       
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};