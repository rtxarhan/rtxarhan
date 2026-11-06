import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DiscordLogo, InstagramLogo, YoutubeLogo } from "@phosphor-icons/react";
import NeonBorderCard from "@/components/neon-border-card.tsx";
import SectionHeading from "@/components/section-heading.tsx";
import { SOCIAL_HANDLES, SOCIAL_LINKS } from "@/lib/site-config.ts";
import { cn } from "@/lib/utils.ts";

const SOCIALS = [
  {
    name: "YouTube",
    handle: SOCIAL_HANDLES.youtube,
    action: "Subscribe",
    description: "Gameplay, highlights and live streams every week.",
    href: SOCIAL_LINKS.youtube,
    Icon: YoutubeLogo,
    iconClass: "bg-[#ff0033] text-white shadow-[0_0_34px_rgba(255,0,51,0.55)] group-hover:shadow-[0_0_54px_rgba(255,0,51,0.85)]",
  },
  {
    name: "Instagram",
    handle: SOCIAL_HANDLES.instagram,
    action: "Follow",
    description: "Behind the scenes, clips and setup updates.",
    href: SOCIAL_LINKS.instagram,
    Icon: InstagramLogo,
    iconClass: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-[0_0_34px_rgba(214,41,118,0.55)] group-hover:shadow-[0_0_54px_rgba(214,41,118,0.85)]",
  },
  {
    name: "Discord",
    handle: SOCIAL_HANDLES.discord,
    action: "Join Server",
    description: "Squad up, chat and play with the community.",
    href: SOCIAL_LINKS.discord,
    Icon: DiscordLogo,
    iconClass: "bg-[#5865f2] text-white shadow-[0_0_34px_rgba(88,101,242,0.55)] group-hover:shadow-[0_0_54px_rgba(88,101,242,0.85)]",
  },
];

export default function SocialSection() {
  return (
    <section id="social" className="relative isolate overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/4 -z-10 size-96 rounded-full bg-accent/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Join The Squad" title="MY SOCIAL MEDIA" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SOCIALS.map(({ name, handle, action, description, href, Icon, iconClass }, index) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${action} RTX ARHAN on ${name}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group block cursor-pointer"
            >
              <NeonBorderCard innerClassName="flex h-full flex-col items-center gap-5 px-6 py-10 text-center">
                <div
                  className={cn(
                    "flex size-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                    iconClass,
                  )}
                >
                  <Icon size={42} weight="fill" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">{name}</h3>
                  <p className="pt-1 font-mono text-sm text-accent">{handle}</p>
                </div>
                <p className="font-sans text-base text-muted-foreground">{description}</p>
                <span className="mt-auto inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {action}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </NeonBorderCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
