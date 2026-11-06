import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { YoutubeLogo } from "@phosphor-icons/react";
import { IMAGES, NAV_LINKS, SOCIAL_LINKS, scrollToSection } from "@/lib/site-config.ts";
import type { SectionId } from "@/lib/site-config.ts";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [{ id, section }] : [];
    });
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
        const currentId = visibleSections[0]?.target.id;
        if (currentId && NAV_LINKS.some((link) => link.id === currentId)) {
          setActiveSection(currentId as SectionId);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );

    sections.forEach(({ section }) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateToSection = (id: SectionId) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-primary/40 bg-black/80 shadow-[0_4px_28px_oklch(0.63_0.25_25/12%)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigateToSection("home")}
          className="flex shrink-0 cursor-pointer items-center gap-2.5 text-left"
          aria-label="RTX ARHAN home"
        >
          <img
            src={IMAGES.logo}
            alt=""
            className="h-10 w-10 rounded-xl object-cover shadow-[0_0_18px_oklch(0.63_0.25_25/35%)] sm:h-12 sm:w-12"
          />
          <span className="font-display text-sm font-black tracking-[0.08em] text-foreground sm:text-base">
            RTX <span className="text-primary">ARHAN</span>
          </span>
        </button>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => navigateToSection(link.id)}
              aria-current={activeSection === link.id ? "page" : undefined}
              className={`group relative cursor-pointer py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors xl:text-sm ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {link.label}
              <motion.span
                layoutId="navbar-active-underline"
                className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_10px_oklch(0.63_0.25_25/75%)] ${
                  activeSection === link.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[0_0_20px_oklch(0.63_0.25_25/40%)] transition-all hover:shadow-[0_0_28px_oklch(0.63_0.25_25/70%)] sm:inline-flex"
          >
            <YoutubeLogo size={18} weight="fill" />
            Subscribe
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative z-50 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-primary/30 bg-black/40 text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 px-6 pb-10 pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <nav className="flex w-full max-w-sm flex-col items-center" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => navigateToSection(link.id)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`w-full cursor-pointer border-b border-border/70 py-3.5 text-center font-display text-lg font-bold uppercase tracking-[0.18em] transition-colors ${
                    activeSection === link.id ? "text-primary" : "text-foreground hover:text-accent"
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: index * 0.045, ease: "easeOut" }}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_0_24px_oklch(0.63_0.25_25/45%)]"
              >
                <YoutubeLogo size={20} weight="fill" />
                Subscribe on YouTube
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
