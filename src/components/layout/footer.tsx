import { DiscordLogo, InstagramLogo, YoutubeLogo } from "@phosphor-icons/react";
import { IMAGES, NAV_LINKS, SOCIAL_LINKS, CONTACT_EMAIL, scrollToSection } from "@/lib/site-config.ts";

const SOCIALS = [
  { name: "YouTube", href: SOCIAL_LINKS.youtube, Icon: YoutubeLogo },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramLogo },
  { name: "Discord", href: SOCIAL_LINKS.discord, Icon: DiscordLogo },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-black/70">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary via-secondary to-transparent shadow-[0_0_18px_oklch(0.63_0.25_25/65%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-14 lg:px-10 lg:py-16">
        <div className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="inline-flex cursor-pointer items-center gap-3 text-left"
            aria-label="RTX ARHAN home"
          >
            <img
              src={IMAGES.logo}
              alt=""
              className="h-12 w-12 rounded-xl object-cover shadow-[0_0_18px_oklch(0.63_0.25_25/40%)]"
            />
            <span className="font-display text-base font-black tracking-[0.1em] text-foreground">
              RTX <span className="text-primary">ARHAN</span>
            </span>
          </button>
          <p className="max-w-sm pt-5 font-sans text-lg text-muted-foreground">
            {"Gaming Is Not Just A Game, It's A Passion."}
          </p>
          <div className="flex items-center gap-3 pt-6">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-primary/25 bg-card text-primary shadow-[0_0_14px_oklch(0.63_0.25_25/15%)] transition-all hover:border-secondary/70 hover:text-accent hover:shadow-[0_0_22px_oklch(0.75_0.17_225/35%)]"
              >
                <Icon size={19} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Quick Navigation
          </h2>
          <nav className="grid grid-cols-2 gap-x-5 gap-y-3 pt-5" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="cursor-pointer text-left font-sans text-base text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Get In Touch
          </h2>
          <p className="pt-5 font-sans text-base text-muted-foreground">
            For collaborations, gaming projects, and community questions.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-flex cursor-pointer break-all font-mono text-sm text-primary transition-colors hover:text-accent"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-5 text-center sm:px-8">
        <p className="font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground sm:text-xs">
          Copyright © {new Date().getFullYear()} RTX ARHAN. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
