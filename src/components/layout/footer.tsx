import { Link } from "react-router-dom";
import { DiscordLogo, InstagramLogo, YoutubeLogo } from "@phosphor-icons/react";
import { NAV_LINKS, scrollToSection } from "@/lib/site-config.ts";
import { useSiteContent } from "@/hooks/use-site-content.ts";

export default function Footer() {
  const { images, social, contact, footer, hero } = useSiteContent();
  const brand = `${hero.titleTop} ${hero.titleBottom}`.trim();
  const socials = [
    { name: "YouTube", href: social.youtube.url, Icon: YoutubeLogo },
    { name: "Instagram", href: social.instagram.url, Icon: InstagramLogo },
    { name: "Discord", href: social.discord.url, Icon: DiscordLogo },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-black/70">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_oklch(0.63_0.25_25/65%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-14 lg:px-10 lg:py-16">
        <div className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="inline-flex cursor-pointer items-center gap-3 text-left"
            aria-label={`${brand} home`}
          >
            <img
              src={images.logo}
              alt=""
              className="h-12 w-12 rounded-xl object-cover shadow-[0_0_18px_oklch(0.63_0.25_25/40%)]"
            />
            <span className="font-display text-base font-black uppercase tracking-[0.1em] text-foreground">
              {hero.titleTop} <span className="text-primary">{hero.titleBottom}</span>
            </span>
          </button>
          <p className="max-w-sm pt-5 font-sans text-lg text-muted-foreground">{footer.tagline}</p>
          <div className="flex items-center gap-3 pt-6">
            {socials.map(({ name, href, Icon }) => (
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
          <p className="pt-5 font-sans text-base text-muted-foreground">{footer.contactText}</p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-4 inline-flex cursor-pointer break-all font-mono text-sm text-primary transition-colors hover:text-accent"
          >
            {contact.email}
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 border-t border-border/60 px-5 py-5 text-center sm:flex-row sm:gap-4 sm:px-8">
        <p className="font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground sm:text-xs">
          Copyright © {new Date().getFullYear()} {brand}. All Rights Reserved.
        </p>
        <Link
          to="/admin"
          className="cursor-pointer font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground/50 transition-colors hover:text-primary sm:text-xs"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
