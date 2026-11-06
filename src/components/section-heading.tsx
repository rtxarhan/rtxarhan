import { motion } from "motion/react";
import { cn } from "@/lib/utils.ts";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

// Shared section title with neon underline used by every section.
export default function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mx-auto max-w-3xl pb-12 text-center md:pb-16", className)}
    >
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.35em] text-accent">
        {"// "}
        {eyebrow}
      </p>
      <h2 className="pt-3 font-display text-3xl font-black uppercase tracking-wider text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_18px_oklch(0.63_0.25_25/70%)]" />
    </motion.div>
  );
}
