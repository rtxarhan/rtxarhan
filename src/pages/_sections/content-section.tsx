import { motion } from "motion/react";
import { ArrowUpRight, Gamepad2, Laugh, Radio, Target, Trophy } from "lucide-react";
import NeonBorderCard from "@/components/neon-border-card.tsx";
import SectionHeading from "@/components/section-heading.tsx";
import { SOCIAL_LINKS } from "@/lib/site-config.ts";

const contentTypes = [
  {
    number: "01",
    title: "Gameplay",
    description: "High-stakes matches, clutch plays, and the moments that make every win count.",
    icon: Gamepad2,
    color: "primary",
  },
  {
    number: "02",
    title: "Highlights",
    description: "The best plays, biggest surprises, and unforgettable rounds—cut straight to the action.",
    icon: Trophy,
    color: "secondary",
  },
  {
    number: "03",
    title: "Funny Moments",
    description: "Unexpected chaos, squad banter, and gaming moments you have to see to believe.",
    icon: Laugh,
    color: "accent",
  },
  {
    number: "04",
    title: "Challenges",
    description: "Wild rules, bold goals, and fresh ways to put gaming skills to the test.",
    icon: Target,
    color: "primary",
  },
  {
    number: "05",
    title: "Live Streams",
    description: "Jump into the action live and be part of the next big community moment.",
    icon: Radio,
    color: "secondary",
    live: true,
  },
] as const;

const colorStyles = {
  primary: {
    border: "group-hover:border-primary/50",
    glow: "group-hover:shadow-[0_0_34px_oklch(0.63_0.25_25/18%)]",
    icon: "bg-primary/10 text-primary ring-primary/25 group-hover:bg-primary/15 group-hover:shadow-[0_0_24px_oklch(0.63_0.25_25/28%)]",
    number: "text-primary/10",
    explore: "text-primary",
  },
  secondary: {
    border: "group-hover:border-secondary/50",
    glow: "group-hover:shadow-[0_0_34px_oklch(0.55_0.25_300/18%)]",
    icon: "bg-secondary/10 text-secondary ring-secondary/25 group-hover:bg-secondary/15 group-hover:shadow-[0_0_24px_oklch(0.55_0.25_300/28%)]",
    number: "text-secondary/10",
    explore: "text-secondary",
  },
  accent: {
    border: "group-hover:border-accent/50",
    glow: "group-hover:shadow-[0_0_34px_oklch(0.75_0.17_225/18%)]",
    icon: "bg-accent/10 text-accent ring-accent/25 group-hover:bg-accent/15 group-hover:shadow-[0_0_24px_oklch(0.75_0.17_225/28%)]",
    number: "text-accent/10",
    explore: "text-accent",
  },
};

export default function ContentSection() {
  return (
    <section id="content" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 size-96 rounded-full bg-primary/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="What I Create" title="MY GAMING CONTENT" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {contentTypes.map((item, index) => {
            const { number, title, description, icon: Icon, color } = item;
            const live = "live" in item;
            const styles = colorStyles[color];
            const spanClass = index < 2 ? "lg:col-span-3" : "lg:col-span-2";

            return (
              <motion.a
                key={number}
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Explore ${title} on YouTube`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -7 }}
                className={`group block cursor-pointer ${spanClass}`}
              >
                <NeonBorderCard className={`h-full rounded-2xl transition-shadow duration-500 ${styles.glow}`} innerClassName={`relative flex h-full min-h-64 flex-col overflow-hidden rounded-[calc(1rem-1.5px)] border border-border/70 bg-card/80 p-6 transition-colors duration-300 sm:p-7 ${styles.border}`}>
                  <span aria-hidden="true" className={`pointer-events-none absolute -right-1 -top-8 font-display text-[8rem] font-black leading-none tracking-tighter ${styles.number}`}>
                    {number}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <div className={`flex size-14 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:rotate-6 ${styles.icon}`}>
                      <Icon aria-hidden="true" className="size-7" strokeWidth={1.8} />
                    </div>
                    {live ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-primary">
                        <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_10px_oklch(0.63_0.25_25)]" />
                        LIVE
                      </span>
                    ) : null}
                  </div>

                  <div className="relative mt-auto pt-10">
                    <p className="font-mono text-[10px] font-semibold tracking-[0.24em] text-muted-foreground">
                      CONTENT / {number}
                    </p>
                    <h3 className="pt-2 font-display text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
                      {title}
                    </h3>
                    <p className="pt-2 font-sans text-base leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    <div className={`flex items-center gap-2 pt-5 font-mono text-xs font-bold uppercase tracking-[0.18em] ${styles.explore}`}>
                      Explore
                      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </NeonBorderCard>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
