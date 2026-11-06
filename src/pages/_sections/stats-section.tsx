import { motion } from "motion/react";
import { Eye, Film, Radio, Users } from "lucide-react";
import AnimatedCounter from "@/components/animated-counter.tsx";
import NeonBorderCard from "@/components/neon-border-card.tsx";
import SectionHeading from "@/components/section-heading.tsx";
import { STATS } from "@/lib/site-config.ts";
import type { StatKey } from "@/lib/site-config.ts";
import { cn } from "@/lib/utils.ts";

const STAT_STYLES: Record<StatKey, { icon: typeof Users; color: string; glow: string }> = {
  subscribers: {
    icon: Users,
    color: "text-primary bg-primary/10 ring-primary/30",
    glow: "[text-shadow:0_0_24px_oklch(0.63_0.25_25/60%)]",
  },
  views: {
    icon: Eye,
    color: "text-accent bg-accent/10 ring-accent/30",
    glow: "[text-shadow:0_0_24px_oklch(0.75_0.17_225/60%)]",
  },
  videos: {
    icon: Film,
    color: "text-secondary bg-secondary/10 ring-secondary/30",
    glow: "[text-shadow:0_0_24px_oklch(0.55_0.25_300/60%)]",
  },
  streams: {
    icon: Radio,
    color: "text-primary bg-primary/10 ring-primary/30",
    glow: "[text-shadow:0_0_24px_oklch(0.63_0.25_25/60%)]",
  },
};

export default function StatsSection() {
  return (
    <section id="stats" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(oklch(0.55_0.25_300/0.06)_1px,transparent_1px),linear-gradient(90deg,oklch(0.55_0.25_300/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Player Stats" title="GAMING STATS" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, index) => {
            const { icon: Icon, color, glow } = STAT_STYLES[stat.key];
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <NeonBorderCard className="h-full" innerClassName="flex flex-col items-center gap-4 px-6 py-9 text-center">
                  <div className={cn("flex size-14 items-center justify-center rounded-xl ring-1", color)}>
                    <Icon aria-hidden="true" className="size-7" strokeWidth={1.8} />
                  </div>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className={cn("font-display text-4xl font-black text-foreground sm:text-5xl", glow)}
                  />
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                  {stat.key === "streams" ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                      <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                      LIVE STREAMING
                    </span>
                  ) : null}
                </NeonBorderCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
