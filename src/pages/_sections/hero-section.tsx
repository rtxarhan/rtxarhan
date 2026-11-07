import { motion } from "motion/react";
import { Mouse, Play } from "lucide-react";
import { scrollToSection } from "@/lib/site-config.ts";
import type { StatKey } from "@/lib/site-config.ts";
import { formatCompactNumber } from "@/lib/format.ts";
import { useSiteContent } from "@/hooks/use-site-content.ts";

const TITLE_DELAY = 1.8;

// Short labels for the hero badges. Numbers come from the Stats section content.
const HERO_LABELS: Partial<Record<StatKey, string>> = {
  subscribers: "Subs",
  views: "Views",
  videos: "Videos",
};

export default function HeroSection() {
  const { hero, images, stats } = useSiteContent();
  const titleTop = Array.from(hero.titleTop);
  const titleBottom = Array.from(hero.titleBottom);
  const quickStats = stats.items.flatMap((stat) => {
    const label = HERO_LABELS[stat.key];
    return label ? [{ value: `${formatCompactNumber(stat.value)}${stat.suffix}`, label }] : [];
  });

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background px-5 pb-8 pt-28 sm:px-8 lg:px-12"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={images.heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(oklch(0.63_0.25_25/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(0.63_0.25_25/0.08)_1px,transparent_1px)] bg-[size:54px_54px] opacity-50" />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[110px]"
        animate={{ x: [0, 28, 0], y: [0, -24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[15%] -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-[110px]"
        animate={{ x: [0, -24, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] right-[28%] -z-10 h-56 w-56 rounded-full bg-accent/15 blur-[100px]"
        animate={{ x: [0, 22, 0], y: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/3 top-0 z-0 h-full w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent"
        animate={{ x: ["0vw", "180vw"] }}
        transition={{ duration: 12, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-primary/[0.05] to-transparent"
        animate={{ y: ["-10vh", "100vh"] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
      />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:py-12">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: TITLE_DELAY, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-background/60 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.63_0.25_25/90%)]" />
            </span>
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground/80 sm:text-xs sm:tracking-[0.24em]">
              {hero.badge}
            </span>
          </motion.div>

          <h1 className="pt-7 font-display text-[clamp(3rem,12vw,8rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:pt-8 lg:pt-9">
            <span className="sr-only">{`${hero.titleTop} ${hero.titleBottom}`}</span>
            <span aria-hidden="true" className="block whitespace-nowrap">
              {titleTop.map((letter, index) => (
                <motion.span
                  key={`top-${index}-${letter}`}
                  initial={{ opacity: 0, y: 42, rotateX: -70, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.72,
                    delay: TITLE_DELAY + 0.16 + index * 0.09,
                    ease: "easeOut",
                  }}
                  className="inline-block bg-gradient-to-br from-primary via-primary/80 to-primary bg-clip-text pr-[0.025em] text-transparent [text-shadow:0_0_34px_oklch(0.63_0.25_25/55%)]"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
            <span aria-hidden="true" className="block whitespace-nowrap text-foreground">
              {titleBottom.map((letter, index) => (
                <motion.span
                  key={`bottom-${index}-${letter}`}
                  initial={{ opacity: 0, y: 42, rotateX: -70, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.72,
                    delay: TITLE_DELAY + 0.48 + index * 0.075,
                    ease: "easeOut",
                  }}
                  className="inline-block pr-[0.025em]"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: TITLE_DELAY + 0.95, ease: "easeOut" }}
            className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text pt-6 font-display text-lg font-bold tracking-wide text-transparent sm:text-2xl lg:text-[1.7rem]"
          >
            {hero.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: TITLE_DELAY + 1.1, ease: "easeOut" }}
            className="max-w-xl pt-4 font-sans text-base leading-relaxed text-foreground/70 sm:text-lg lg:text-xl"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: TITLE_DELAY + 1.28, ease: "easeOut" }}
            className="flex w-full flex-col justify-center gap-3 pt-7 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollToSection("videos")}
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-md bg-primary px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_0_24px_oklch(0.63_0.25_25/38%)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_oklch(0.63_0.25_25/65%)] sm:px-7 sm:text-sm"
            >
              <Play className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" />
              {hero.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer rounded-md border border-secondary/60 bg-background/30 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/10 hover:shadow-[0_0_22px_oklch(0.55_0.25_300/30%)] sm:px-7 sm:text-sm"
            >
              {hero.secondaryCta}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: TITLE_DELAY + 0.35, ease: "easeOut" }}
          className="relative mx-auto flex aspect-square w-[min(78vw,25rem)] items-center justify-center lg:w-[min(44vw,35rem)]"
        >
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-primary/20 blur-[72px]" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-[5%] rounded-full border border-primary/50 shadow-[0_0_42px_oklch(0.63_0.25_25/22%),inset_0_0_30px_oklch(0.63_0.25_25/12%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-[1%] rounded-full border border-dashed border-accent/45"
            animate={{ rotate: -360 }}
            transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-[13%] border border-secondary/50 bg-secondary/[0.035] [clip-path:polygon(25%_4%,75%_4%,100%_50%,75%_96%,25%_96%,0_50%)]"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-[5%]"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_oklch(0.63_0.25_25/90%)]" />
            <span className="absolute bottom-[14%] right-[5%] h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_oklch(0.75_0.17_225/90%)]" />
            <span className="absolute bottom-[14%] left-[5%] h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_16px_oklch(0.55_0.25_300/90%)]" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-[66%] w-[66%] items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-background/35 p-3 shadow-[0_0_58px_oklch(0.63_0.25_25/22%)] backdrop-blur-sm sm:p-5"
          >
            <img
              src={images.logo}
              alt={`${hero.titleTop} ${hero.titleBottom} logo`}
              className="h-full w-full rounded-full object-contain drop-shadow-[0_0_30px_oklch(0.63_0.25_25/38%)]"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-foreground/10 pt-5 sm:flex-row sm:gap-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: TITLE_DELAY + 1.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start sm:gap-3"
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-full border border-foreground/10 bg-background/45 px-3.5 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-foreground/75 backdrop-blur-md sm:px-4 sm:text-xs"
            >
              <span className="text-primary">{stat.value}</span> {stat.label}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: TITLE_DELAY + 1.6, ease: "easeOut" }}
          className="hidden items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-foreground/40 sm:flex"
        >
          <Mouse className="h-4 w-4 animate-bounce text-primary/80" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
