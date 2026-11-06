import { Link } from "react-router-dom";
import { House } from "lucide-react";
import { IMAGES } from "@/lib/site-config.ts";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div className="flex max-w-md flex-col items-center text-center">
        <img
          src={IMAGES.logo}
          alt="RTX ARHAN logo"
          className="size-20 rounded-2xl object-cover shadow-[0_0_34px_oklch(0.63_0.25_25/50%)]"
        />
        <p className="pt-8 font-mono text-sm font-semibold uppercase tracking-[0.35em] text-accent">
          {"// Error 404"}
        </p>
        <h1 className="pt-3 font-display text-5xl font-black uppercase tracking-wider sm:text-6xl">
          Game <span className="text-primary">Over</span>
        </h1>
        <p className="pt-4 font-sans text-lg text-muted-foreground">
          This level does not exist. Respawn at home base and keep playing.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_0_24px_oklch(0.63_0.25_25/40%)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_oklch(0.63_0.25_25/65%)]"
        >
          <House className="size-4" />
          Respawn Home
        </Link>
      </div>
    </main>
  );
}
