import { motion } from "motion/react";
import { ArrowUpRight, Eye, Play } from "lucide-react";
import { YoutubeLogo } from "@phosphor-icons/react";
import NeonBorderCard from "@/components/neon-border-card.tsx";
import SectionHeading from "@/components/section-heading.tsx";
import { FEATURED_VIDEOS, SOCIAL_LINKS, getVideoThumbnail } from "@/lib/site-config.ts";

export default function VideosSection() {
  return (
    <section id="videos" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_oklch(0.63_0.25_25/12%),_transparent_68%)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Watch Now" title="FEATURED VIDEOS" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_VIDEOS.map((video, index) => (
            <motion.a
              key={video.title}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${video.title} on YouTube`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: "easeOut" }}
              className="group cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <NeonBorderCard className="h-full" innerClassName="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-video shrink-0 overflow-hidden rounded-t-[calc(1rem-1.5px)]">
                  <img
                    src={getVideoThumbnail(video)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25" />

                  <span className="absolute left-4 top-4 rounded-sm border border-primary/50 bg-black/70 px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary shadow-[0_0_18px_oklch(0.63_0.25_25/22%)]">
                    {video.category}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-sm border border-white/15 bg-black/75 px-2.5 py-1 font-mono text-xs font-semibold tracking-wider text-white">
                    {video.duration}
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_32px_oklch(0.63_0.25_25/65%)] transition-transform duration-300 group-hover:scale-110 sm:h-[4.5rem] sm:w-[4.5rem]">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-2 animate-pulse rounded-full border border-primary/70"
                      />
                      <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" />
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <h3 className="line-clamp-2 min-h-[3.5rem] font-display text-lg font-bold uppercase leading-snug tracking-wide text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {video.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      <Eye className="h-4 w-4 text-accent" />
                      {video.views} views
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors group-hover:text-primary">
                      Watch on YouTube
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </NeonBorderCard>
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center pt-12 md:pt-16">
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-md border border-primary/60 bg-primary px-6 py-4 text-center font-display text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_0_24px_oklch(0.63_0.25_25/35%)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_oklch(0.63_0.25_25/60%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:px-8 sm:text-sm"
          >
            <YoutubeLogo weight="fill" className="h-5 w-5 shrink-0" />
            View All Videos on YouTube
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
