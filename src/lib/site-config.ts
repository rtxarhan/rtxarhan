// Fixed site settings. All editable text, links, videos and stats live in
// default-content.ts and can be changed from the admin panel at /admin.
import type { SiteContent } from "@/convex/shared/siteContent.ts";

export const IMAGES = {
  logo: "https://hercules-cdn.com/file_BkWzHTTExQ6fg65ofUShlIRH",
  logoOriginal: "https://hercules-cdn.com/file_7fKHdjIxAP4foFd3s4Z8s5LV",
  heroBg:
    "https://hercules-cdn.com/cdn-cgi/image/w=2048,quality=85,fit=scale-down,format=auto/file_4Io3R2l3qFII4Jwy6ZpDnjJa",
  setup:
    "https://hercules-cdn.com/cdn-cgi/image/w=1400,quality=85,fit=scale-down,format=auto/file_wjKW0gziA8WYUuqYJPOq2oQ1",
  battle:
    "https://hercules-cdn.com/cdn-cgi/image/w=1200,quality=85,fit=scale-down,format=auto/file_WZz0LW3l66Q32D12w4peLIvi",
  racing:
    "https://hercules-cdn.com/cdn-cgi/image/w=1200,quality=85,fit=scale-down,format=auto/file_sLXg4R3WYUVxCixfwvQzSnv7",
  monster:
    "https://hercules-cdn.com/cdn-cgi/image/w=1200,quality=85,fit=scale-down,format=auto/file_ahav54xhfuWu43TS2ZLsS5tW",
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "content", label: "Content" },
  { id: "videos", label: "Videos" },
  { id: "stats", label: "Stats" },
  { id: "social", label: "Social" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof NAV_LINKS)[number]["id"];

export type FeaturedVideo = SiteContent["videos"]["items"][number];
export type StatKey = SiteContent["stats"]["items"][number]["key"];

// Supports watch?v=, youtu.be/, /shorts/, /live/ and /embed/ links
function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/live\/|\/embed\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

// Real YouTube thumbnail when the link is a video, otherwise the custom or fallback image.
export function getVideoThumbnail(video: FeaturedVideo, fallback: string): string {
  const id = getYoutubeId(video.url);
  if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return video.thumbnail.trim() || fallback;
}

export function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
