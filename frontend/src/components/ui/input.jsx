import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full rounded-none border border-white/10 bg-[#050505] px-3 py-2 font-mono text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-[#00FFA3] ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";