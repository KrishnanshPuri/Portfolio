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
import { SnakePreview } from "./preview/SnakePreview";
import { GraphPreview } from "./preview/GraphPreview";


const PREVIEWS = {
  "Autonomous Snake AI": SnakePreview,
  "Graph Algorithm Simulator": GraphPreview,
};

const ProjectCard = ({ project, index }) => {
  const Preview = PREVIEWS[project.name];
  const isFeatured = !!project.featured;
  
  
  const detailsLeft = index % 2 === 0;

  
  const colSpan = isFeatured || Preview ? "md:col-span-2" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={colSpan}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.08}
        glareColor="#00FFA3"
        tiltMaxAngleX={Preview ? 3 : 6} 
        tiltMaxAngleY={Preview ? 3 : 6}
        className="h-full"
      >
        {Preview ? (
         
          <div className="group grid h-full grid-cols-1 items-start gap-8 border border-white/10 bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-[#00FFA3]/40 lg:grid-cols-2 lg:gap-10 lg:p-8">
            
            
            <div className={`flex h-full flex-col justify-between ${!detailsLeft ? "lg:order-2 lg:pl-4" : "lg:pr-4"}`}>
              <ProjectText project={project} />
            </div>

           
            <div className={`flex justify-center ${!detailsLeft ? "lg:order-1" : ""}`}>
              <div className="w-full max-w-[520px]">
                <Preview />
              </div>
            </div>

          </div>
        ) : (
          
          <div className="group flex h-full flex-col justify-between border border-white/10 bg-[#0A0A0A] p-8 transition-all duration-300 hover:border-[#00FFA3]/40">
            <div>
              <ProjectText project={project} />

             
            {isFeatured && project.video && (
                <div className="mt-8 flex flex-col overflow-hidden border border-white/10 bg-[#050505] shadow-2xl transition-all duration-300 group-hover:border-[#00FFA3]/30">
                  
                  {/* Window Chrome (Matches Snake and Graph Previews exactly) */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0A0A] px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500">
                      {project.name.toLowerCase().replace(/\s+/g, "_")}_demo.mp4
                    </div>
                  </div>

                 {/* Video Container with Hover Effects */}
                  <div className="relative overflow-hidden bg-[#0A0A0A]">
                    {/* Inner shadow to blend video edges */}
                    <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]"></div>
                    
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="block max-h-[400px] w-full scale-[1.03] object-cover object-top opacity-85 grayscale-[30%] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Tilt>
    </motion.div>
  );
};


const ProjectText = ({ project }) => (
  <>
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

    <h3 className="group-hover:text-[#00FFA3] flex items-center gap-2 text-3xl font-bold text-white transition">
      {project.name}
      <ArrowUpRight className="h-5 w-5 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100" />
    </h3>

    <p className="mt-2 font-mono text-zinc-500">{project.subtitle}</p>

    <p className="mt-6 max-w-5xl font-mono leading-8 text-zinc-400">
      {project.description}
    </p>

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
  </>
);

export const Projects = () => {
  return (
    <section id="projects" className="relative py-24">
     
      <div className="glow-secondary absolute right-0 top-1/3 z-0 h-[380px] w-[380px] blur-3xl opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="03" label="things i built" title="Featured Projects" />

        <div className="grid items-start gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};