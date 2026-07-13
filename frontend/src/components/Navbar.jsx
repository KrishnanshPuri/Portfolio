import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const links = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid="navbar"
      className={`fixed left-0 right-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-[#050505]/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-white"
        >
          <Terminal className="h-5 w-5 text-[#00FFA3]" />
          <span>krishnansh<span className="text-[#00FFA3]">.dev</span></span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className="group relative font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00FFA3] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            data-testid="nav-contact-cta"
            onClick={() => go("contact")}
            className="border border-[#00FFA3] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00FFA3] transition-colors duration-300 hover:bg-[#00FFA3] hover:text-black"
          >
            Get in touch
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="border-t border-white/10 bg-[#050505] px-6 py-4 md:hidden"
        >
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-mobile-link-${l.id}`}
              onClick={() => go(l.id)}
              className="block w-full py-3 text-left font-mono text-sm uppercase tracking-widest text-zinc-300"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </motion.header>
  );
};
