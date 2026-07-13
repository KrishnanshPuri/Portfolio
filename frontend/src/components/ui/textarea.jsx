import React from "react";

export const Textarea = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded-none border border-white/10 bg-[#050505] px-3 py-2 font-mono text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-[#00FFA3] ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";