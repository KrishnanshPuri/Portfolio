import { Github, Linkedin, Code2, Terminal, ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";

const iconMap = { github: Github, linkedin: Linkedin, code: Code2, terminal: Terminal };

export const Footer = () => {
  return (
    <footer data-testid="footer" className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 lg:flex-row lg:px-10">
        <div className="text-center lg:text-left">
          <div className="heading-font text-lg font-bold text-white">
            krishnansh<span className="text-[#00FFA3]">.dev</span>
          </div>
          <p className="mt-1 font-mono text-xs text-zinc-500">
            Designed & built by Krishnansh Puri · {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex items-center gap-5">
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon] || Code2;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-testid={`footer-social-${s.label.toLowerCase()}`}
                className="text-zinc-500 transition-colors duration-300 hover:-translate-y-1 hover:text-[#00FFA3]"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
          <button
            data-testid="footer-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors duration-300 hover:border-[#00FFA3] hover:text-[#00FFA3]"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
