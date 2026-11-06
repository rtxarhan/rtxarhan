import { motion } from "motion/react";
import { Activity, Crosshair, Gamepad2, Radio } from "lucide-react";
import NeonBorderCard from "@/components/neon-border-card.tsx";
import SectionHeading from "@/components/section-heading.tsx";
import { IMAGES } from "@/lib/site-config.ts";

const profileRows = [
  { label: "Main Platform", value: "YouTube", icon: Radio },
  { label: "Play Style", value: "Aggressive & Fun", icon: Crosshair },
  { label: "Favorite Genres", value: "Battle Royale / Open World / Racing", icon: Gamepad2 },
  { label: "Mission", value: "Entertain the Gaming Community", icon: Activity },
];

const skills = [
  { label: "Gameplay Skill", value: 95, color: "from-primary to-secondary" },
  { label: "Entertainment", value: 98, color: "from-secondary to-accent" },
  { label: "Consistency", value: 90, color: "from-accent to-primary" },
  { label: "Community Vibes", value: 100, color: "from-primary via-secondary to-accent" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,transparent_49.5%,oklch(1_0_0/3%)_50%,transparent_50.5%)] bg-[size:34px_34px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 size-96 rounded-full bg-secondary/15 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Who I Am" title="ABOUT RTX ARHAN" />

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <NeonBorderCard className="aspect-[4/4.3]" innerClassName="h-full overflow-hidden">
              <img
                src={IMAGES.setup}
                alt="RTX ARHAN's immersive gaming setup"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />
              <div aria-hidden="true" className="absolute inset-4">
                <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-primary shadow-[0_0_12px_oklch(0.63_0.25_25/55%)]" />
                <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-accent shadow-[0_0_12px_oklch(0.75_0.17_225/55%)]" />
                <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-accent shadow-[0_0_12px_oklch(0.75_0.17_225/55%)]" />
                <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-primary shadow-[0_0_12px_oklch(0.63_0.25_25/55%)]" />
              </div>
            </NeonBorderCard>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="absolute -left-2 top-5 flex items-center gap-2 rounded-md border border-primary/50 bg-background/90 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.16em] text-foreground shadow-[0_0_22px_oklch(0.63_0.25_25/22%)] backdrop-blur-md sm:-left-5 sm:px-4 sm:text-xs"
            >
              <span className="size-2 animate-pulse rounded-full bg-primary shadow-[0_0_12px_oklch(0.63_0.25_25)]" />
              ONLINE <span className="text-muted-foreground">•</span> READY TO PLAY
            </motion.div>

            <div className="absolute -bottom-5 right-4 flex size-[4.5rem] items-center justify-center rounded-xl border border-accent/40 bg-card/95 p-2 shadow-[0_0_28px_oklch(0.75_0.17_225/20%)] backdrop-blur-md sm:right-8">
              <img src={IMAGES.logo} alt="RTX ARHAN logo" className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              <p className="font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
                I’m <span className="font-bold text-primary">RTX ARHAN</span> — a passionate YouTube gaming creator
                who lives for clutch plays, unexpected moments, and sharing the excitement with you.
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
                From intense <span className="font-semibold text-accent">battle royale</span> matchups to open-world
                adventures and high-speed races, every video is made to bring the <span className="font-semibold text-secondary">fun of gaming</span>{" "}
                to the whole community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="overflow-hidden rounded-xl border border-border/70 bg-card/70"
            >
              {profileRows.map(({ label, value, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`flex items-start gap-3 px-4 py-3.5 sm:items-center sm:gap-4 sm:px-5 ${index < profileRows.length - 1 ? "border-b border-border/60" : ""}`}
                >
                  <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary sm:mt-0">
                    <Icon aria-hidden="true" className="size-4" />
                  </div>
                  <span className="min-w-28 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:min-w-32 sm:text-xs">
                    {label}
                  </span>
                  <span className="ml-auto text-right font-sans text-sm font-semibold text-foreground sm:text-base">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-35px" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
                    <span className="text-muted-foreground">{skill.label}</span>
                    <span className="text-foreground">{skill.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true, margin: "-35px" }}
                      transition={{ duration: 1.05, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_14px_oklch(0.63_0.25_25/45%)]`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
