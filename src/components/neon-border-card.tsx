import { motion } from "motion/react";
import { cn } from "@/lib/utils.ts";

type NeonBorderCardProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

// Card with an animated rotating red/purple/blue neon border.
export default function NeonBorderCard({ children, className, innerClassName }: NeonBorderCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl p-[1.5px]", className)}>
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,oklch(0.63_0.25_25)_15%,transparent_30%,oklch(0.55_0.25_300)_50%,transparent_65%,oklch(0.75_0.17_225)_80%,transparent_100%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className={cn("relative h-full rounded-[calc(1rem-1.5px)] bg-card", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
