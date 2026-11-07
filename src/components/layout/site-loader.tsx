import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSiteContent } from "@/hooks/use-site-content.ts";

export default function SiteLoader() {
  const { images, hero } = useSiteContent();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          role="status"
          aria-label="Loading gaming universe"
        >
          <div className="flex w-full max-w-sm flex-col items-center text-center">
            <motion.img
              src={images.logo}
              alt="Logo"
              className="h-24 w-24 rounded-2xl object-cover shadow-[0_0_34px_oklch(0.63_0.25_25/55%)] sm:h-28 sm:w-28"
              animate={{ scale: [1, 1.045, 1], boxShadow: ["0 0 24px oklch(0.63 0.25 25 / 35%)", "0 0 42px oklch(0.63 0.25 25 / 75%)", "0 0 24px oklch(0.63 0.25 25 / 35%)"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="pt-7 font-display text-2xl font-black uppercase tracking-[0.16em] text-foreground sm:text-3xl">
              {hero.titleTop} <span className="text-primary">{hero.titleBottom}</span>
            </p>
            <div className="mt-9 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_18px_oklch(0.63_0.25_25/75%)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
            <p className="pt-4 font-mono text-xs font-semibold tracking-[0.24em] text-muted-foreground sm:text-sm">
              LOADING GAMING UNIVERSE...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
