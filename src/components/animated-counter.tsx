import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { formatCompactNumber } from "@/lib/format.ts";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export default function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (latest) => setCount(latest),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={counterRef} className={cn("tabular-nums", className)}>
      {formatCompactNumber(count)}
      {suffix}
    </span>
  );
}
