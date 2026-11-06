// Edit everything about the site here: links, videos, stats.

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

export const CONTACT_EMAIL = "rtxarhangaming@gmail.com";

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@RTXARHAN",
  instagram: "https://www.instagram.com/rtxarhan",
  discord: "https://discord.gg/rtxarhan",
} as const;

// Handles shown on the social cards. Update together with SOCIAL_LINKS.
export const SOCIAL_HANDLES = {
  youtube: "@RTXARHAN",
  instagram: "@rtxarhan",
  discord: "RTX ARHAN Squad",
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

export type FeaturedVideo = {
  title: string;
  category: string;
  duration: string;
  views: string;
  // Paste the full YouTube video link here
  url: string;
  thumbnail: string;
};

// To update: replace `url` with a real video link. Thumbnail can be any image URL.
export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    title: "INSANE 20 Kill Clutch in Ranked",
    category: "Gameplay",
    duration: "18:42",
    views: "120K",
    url: "https://www.youtube.com/@RTXARHAN/videos",
    thumbnail: IMAGES.battle,
  },
  {
    title: "Neon City Night Drift Challenge",
    category: "Challenges",
    duration: "12:05",
    views: "86K",
    url: "https://www.youtube.com/@RTXARHAN/videos",
    thumbnail: IMAGES.racing,
  },
  {
    title: "Boss Fight Gone WRONG (Funny Moments)",
    category: "Funny Moments",
    duration: "09:31",
    views: "210K",
    url: "https://www.youtube.com/@RTXARHAN/videos",
    thumbnail: IMAGES.monster,
  },
];

export type StatKey = "subscribers" | "views" | "videos" | "streams";

export type Stat = {
  key: StatKey;
  label: string;
  value: number;
  suffix: string;
};

// Edit these numbers to update the animated counters.
export const STATS: Stat[] = [
  { key: "subscribers", label: "YouTube Subscribers", value: 50000, suffix: "+" },
  { key: "views", label: "Total Views", value: 2500000, suffix: "+" },
  { key: "videos", label: "Total Videos", value: 350, suffix: "+" },
  { key: "streams", label: "Live Streams", value: 120, suffix: "+" },
];

export function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
