import type { SiteContent } from "@/convex/shared/siteContent.ts";
import { IMAGES } from "./site-config.ts";

const YOUTUBE = "https://www.youtube.com/@RTXARHAN";
const CHANNEL_VIDEOS = `${YOUTUBE}/videos`;

// Original website content. Shown until the admin saves changes at /admin,
// and restored by "Reset to original".
export const DEFAULT_CONTENT: SiteContent = {
  images: {
    logo: IMAGES.logo,
    heroBg: IMAGES.heroBg,
    setup: IMAGES.setup,
    videoFallback: IMAGES.battle,
  },
  hero: {
    badge: "// CONTENT CREATOR • YOUTUBE GAMER",
    titleTop: "RTX",
    titleBottom: "ARHAN",
    tagline: "Welcome to My Gaming Universe 🎮",
    description:
      "I'm RTX ARHAN, a passionate gaming content creator. Join me on my journey through epic gameplay, intense battles, exciting challenges and unforgettable gaming moments.",
    primaryCta: "Watch My Videos",
    secondaryCta: "Contact Me",
  },
  about: {
    eyebrow: "Who I Am",
    title: "ABOUT RTX ARHAN",
    statusBadge: "ONLINE • READY TO PLAY",
    paragraphs: [
      "I’m RTX ARHAN — a passionate YouTube gaming creator who lives for clutch plays, unexpected moments, and sharing the excitement with you.",
      "From intense battle royale matchups to open-world adventures and high-speed races, every video is made to bring the fun of gaming to the whole community.",
    ],
    profileRows: [
      { label: "Main Platform", value: "YouTube" },
      { label: "Play Style", value: "Aggressive & Fun" },
      { label: "Favorite Genres", value: "Battle Royale / Open World / Racing" },
      { label: "Mission", value: "Entertain the Gaming Community" },
    ],
    skills: [
      { label: "Gameplay Skill", value: 95 },
      { label: "Entertainment", value: 98 },
      { label: "Consistency", value: 90 },
      { label: "Community Vibes", value: 100 },
    ],
  },
  content: {
    eyebrow: "What I Create",
    title: "MY GAMING CONTENT",
    items: [
      {
        title: "Gameplay",
        description: "High-stakes matches, clutch plays, and the moments that make every win count.",
        live: false,
      },
      {
        title: "Highlights",
        description: "The best plays, biggest surprises, and unforgettable rounds—cut straight to the action.",
        live: false,
      },
      {
        title: "Funny Moments",
        description: "Unexpected chaos, squad banter, and gaming moments you have to see to believe.",
        live: false,
      },
      {
        title: "Challenges",
        description: "Wild rules, bold goals, and fresh ways to put gaming skills to the test.",
        live: false,
      },
      {
        title: "Live Streams",
        description: "Jump into the action live and be part of the next big community moment.",
        live: true,
      },
    ],
  },
  videos: {
    eyebrow: "Watch Now",
    title: "FEATURED VIDEOS",
    buttonText: "View All Videos on YouTube",
    items: [
      { title: "INSANE 20 Kill Clutch in Ranked", category: "Gameplay", duration: "18:42", views: "120K", url: CHANNEL_VIDEOS, thumbnail: IMAGES.battle },
      { title: "Top 10 Plays of the Month", category: "Highlights", duration: "10:18", views: "145K", url: CHANNEL_VIDEOS, thumbnail: IMAGES.heroBg },
      { title: "Boss Fight Gone WRONG (Funny Moments)", category: "Funny Moments", duration: "09:31", views: "210K", url: CHANNEL_VIDEOS, thumbnail: IMAGES.monster },
      { title: "Neon City Night Drift Challenge", category: "Challenges", duration: "12:05", views: "86K", url: CHANNEL_VIDEOS, thumbnail: IMAGES.racing },
      { title: "Late Night Squad Grind (Full Stream)", category: "Live Stream", duration: "2:41:09", views: "64K", url: `${YOUTUBE}/streams`, thumbnail: IMAGES.setup },
      { title: "Solo vs Squad: Can I Survive?", category: "Gameplay", duration: "15:27", views: "98K", url: CHANNEL_VIDEOS, thumbnail: IMAGES.battle },
    ],
  },
  stats: {
    eyebrow: "Player Stats",
    title: "GAMING STATS",
    items: [
      { key: "subscribers", label: "YouTube Subscribers", value: 50000, suffix: "+" },
      { key: "views", label: "Total Views", value: 2500000, suffix: "+" },
      { key: "videos", label: "Total Videos", value: 350, suffix: "+" },
      { key: "streams", label: "Live Streams", value: 120, suffix: "+" },
    ],
  },
  social: {
    eyebrow: "Join The Squad",
    title: "MY SOCIAL MEDIA",
    youtube: {
      url: YOUTUBE,
      handle: "@RTXARHAN",
      action: "Subscribe",
      description: "Gameplay, highlights and live streams every week.",
    },
    instagram: {
      url: "https://www.instagram.com/rtxarhan",
      handle: "@rtxarhan",
      action: "Follow",
      description: "Behind the scenes, clips and setup updates.",
    },
    discord: {
      url: "https://discord.gg/rtxarhan",
      handle: "RTX ARHAN Squad",
      action: "Join Server",
      description: "Squad up, chat and play with the community.",
    },
  },
  contact: {
    eyebrow: "Get In Touch",
    title: "CONTACT ME",
    heading: "Let's",
    headingHighlight: "Team Up",
    description:
      "Brand deal, collab idea, or just want to say hi? Drop a message and RTX ARHAN will get back to you.",
    email: "rtxarhangaming@gmail.com",
    responseTime: "Within 24-48 hours",
    openFor: "Collabs, Sponsorships & Fan Mail",
    buttonText: "Send Message",
  },
  footer: {
    tagline: "Gaming Is Not Just A Game, It's A Passion.",
    contactText: "For collaborations, gaming projects, and community questions.",
  },
};
