import { motion } from "framer-motion";

export const SectionHeading = ({ index, label, title, testId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mb-12"
      data-testid={testId}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-sm text-[#00FFA3]">{index}</span>
        <span className="mono-label text-[11px] text-zinc-500">{label}</span>
        <span className="h-px w-24 bg-white/10 sm:w-40" />
      </div>
      <h2 className="heading-font text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </motion.div>
  );
};
