import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea';

export default function GamingCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const interactiveRef = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const ringX = useSpring(pointerX, { stiffness: 420, damping: 32, mass: 0.35 });
  const ringY = useSpring(pointerY, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerCapability = () => setHasFinePointer(mediaQuery.matches);

    updatePointerCapability();
    mediaQuery.addEventListener("change", updatePointerCapability);
    return () => mediaQuery.removeEventListener("change", updatePointerCapability);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const followPointer = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setHasMoved(true);

      const target = event.target;
      const nextIsInteractive =
        target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;
      if (interactiveRef.current !== nextIsInteractive) {
        interactiveRef.current = nextIsInteractive;
        setIsInteractive(nextIsInteractive);
      }
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => window.removeEventListener("pointermove", followPointer);
  }, [hasFinePointer, pointerX, pointerY]);

  if (!hasFinePointer) return null;

  const visibilityClass = hasMoved ? "opacity-100" : "opacity-0";
  const ringColorClass = isInteractive
    ? "border-secondary text-accent shadow-[0_0_24px_oklch(0.75_0.17_225/65%)]"
    : "border-primary text-primary shadow-[0_0_18px_oklch(0.63_0.25_25/55%)]";

  return (
    <div className={`pointer-events-none fixed inset-0 z-[90] ${visibilityClass}`} aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_oklch(0.63_0.25_25/85%)]"
        style={{ x: pointerX, y: pointerY }}
      />
      <motion.div
        className={`fixed left-0 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-transparent transition-colors duration-200 ${ringColorClass}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isInteractive ? 1.45 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span className="h-1 w-1 rounded-full bg-current opacity-70" />
        <span className="absolute -top-1 h-2 w-px bg-current" />
        <span className="absolute -bottom-1 h-2 w-px bg-current" />
        <span className="absolute -left-1 h-px w-2 bg-current" />
        <span className="absolute -right-1 h-px w-2 bg-current" />
      </motion.div>
    </div>
  );
}
