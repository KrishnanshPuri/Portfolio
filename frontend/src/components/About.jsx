import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { about, achievements } from "../data/portfolio";

export const About = () => {
  const [history, setHistory] = useState(() => 
    about.terminalLines.map((line) => ({ text: line }))
  );
  const [input, setInput] = useState("");
  
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      
      if (!cmd) return;

      const newHistory = [...history, { text: `$ ${cmd}` }];
      const baseCmd = lowerCmd.split(" ")[0];

      switch (baseCmd) {
        case "help":
          newHistory.push(
            { text: "> commands: ls, pwd, whoami, skills, contact, clear, sudo" }
          );
          break;
        case "ls":
          newHistory.push({ text: "about.txt   resume.pdf   projects/   src/" });
          break;
        case "pwd":
          newHistory.push({ text: "/home/krishnansh/portfolio" });
          break;
        case "whoami":
          newHistory.push({ text: "> krishnansh — cs undergrad & branch gold medalist" });
          break;
        case "skills":
          newHistory.push(
            { text: "> languages: C++, JavaScript, TypeScript, Python" },
            { text: "> core: DSA, Competitive Programming (Codeforces Specialist, LeetCode Knight)" },
            { text: "> full-stack: React, Node.js, Express, MongoDB" },
            { text: "> systems: Networking, Computer Architecture" }
          );
          break;
        case "contact":
          newHistory.push(
            { text: "> email: krishnanshpuri@gmail.com" },
            { text: "> phone no.: 9530677487" }
          );
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "sudo":
          newHistory.push({ text: "bash: permission denied." });
          break;
        default:
          newHistory.push({ text: `bash: ${baseCmd}: command not found. type 'help'` });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <section id="about" data-testid="about-section" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="01" label="who am i" title="About Me" testId="about-heading" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Bio + education (Completely untouched) */}
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
            className="flex flex-col border border-white/10 bg-[#0A0A0A] shadow-xl shadow-black/50"
            data-testid="about-terminal"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-zinc-500">bash — krishnansh@nitj</span>
            </div>
            
            <div className="custom-scrollbar h-[360px] overflow-y-auto p-6 font-mono text-[13px] leading-relaxed">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.text.startsWith("$")
                      ? "text-[#00FFA3]"
                      : line.text.startsWith(">")
                      ? "text-zinc-500"
                      : "text-zinc-300"
                  }
                >
                  {line.text}
                </div>
              ))}
              
              <div className="mt-1 flex items-center">
                <span className="text-[#00FFA3]">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="ml-2 flex-1 bg-transparent text-zinc-300 outline-none caret-[#00FFA3]"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};