import { v, type Infer } from "convex/values";

// Only this signed-in, verified email can edit the website.
export const ADMIN_EMAIL = "rtxarhangaming@gmail.com";

const MAX_TEXT_LENGTH = 2000;
const MAX_LIST_ITEMS = 24;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const statKeyValidator = v.union(
  v.literal("subscribers"),
  v.literal("views"),
  v.literal("videos"),
  v.literal("streams"),
);

const socialValidator = v.object({
  url: v.string(),
  handle: v.string(),
  action: v.string(),
  description: v.string(),
});

export const siteContentValidator = v.object({
  images: v.object({
    logo: v.string(),
    heroBg: v.string(),
    setup: v.string(),
    videoFallback: v.string(),
  }),
  hero: v.object({
    badge: v.string(),
    titleTop: v.string(),
    titleBottom: v.string(),
    tagline: v.string(),
    description: v.string(),
    primaryCta: v.string(),
    secondaryCta: v.string(),
  }),
  about: v.object({
    eyebrow: v.string(),
    title: v.string(),
    statusBadge: v.string(),
    paragraphs: v.array(v.string()),
    profileRows: v.array(v.object({ label: v.string(), value: v.string() })),
    skills: v.array(v.object({ label: v.string(), value: v.number() })),
  }),
  content: v.object({
    eyebrow: v.string(),
    title: v.string(),
    items: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        live: v.boolean(),
      }),
    ),
  }),
  videos: v.object({
    eyebrow: v.string(),
    title: v.string(),
    buttonText: v.string(),
    items: v.array(
      v.object({
        title: v.string(),
        category: v.string(),
        duration: v.string(),
        views: v.string(),
        url: v.string(),
        thumbnail: v.string(),
      }),
    ),
  }),
  stats: v.object({
    eyebrow: v.string(),
    title: v.string(),
    items: v.array(
      v.object({
        key: statKeyValidator,
        label: v.string(),
        value: v.number(),
        suffix: v.string(),
      }),
    ),
  }),
  social: v.object({
    eyebrow: v.string(),
    title: v.string(),
    youtube: socialValidator,
    instagram: socialValidator,
    discord: socialValidator,
  }),
  contact: v.object({
    eyebrow: v.string(),
    title: v.string(),
    heading: v.string(),
    headingHighlight: v.string(),
    description: v.string(),
    email: v.string(),
    responseTime: v.string(),
    openFor: v.string(),
    buttonText: v.string(),
  }),
  footer: v.object({
    tagline: v.string(),
    contactText: v.string(),
  }),
});

export type SiteContent = Infer<typeof siteContentValidator>;

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

// Walks the whole content object so every text field and list is size-limited.
function hasOversizedValue(value: unknown): boolean {
  if (typeof value === "string") return value.length > MAX_TEXT_LENGTH;
  if (Array.isArray(value)) {
    return value.length > MAX_LIST_ITEMS || value.some(hasOversizedValue);
  }
  if (value !== null && typeof value === "object") {
    return Object.values(value).some(hasOversizedValue);
  }
  return false;
}

/** Returns a user-friendly error message, or null when the content is valid. */
export function validateSiteContent(content: SiteContent): string | null {
  if (hasOversizedValue(content)) {
    return `Text fields can be up to ${MAX_TEXT_LENGTH} characters and lists up to ${MAX_LIST_ITEMS} items.`;
  }
  if (!content.hero.titleTop.trim() && !content.hero.titleBottom.trim()) {
    return "Hero title cannot be empty.";
  }

  const links: Array<[string, string]> = [
    ["Logo image", content.images.logo],
    ["Hero background image", content.images.heroBg],
    ["About image", content.images.setup],
    ["Video fallback image", content.images.videoFallback],
    ["YouTube link", content.social.youtube.url],
    ["Instagram link", content.social.instagram.url],
    ["Discord link", content.social.discord.url],
  ];
  content.videos.items.forEach((video, index) => {
    links.push([`Video ${index + 1} link`, video.url]);
    if (video.thumbnail.trim()) {
      links.push([`Video ${index + 1} image`, video.thumbnail]);
    }
  });
  const invalidLink = links.find(([, url]) => !isHttpUrl(url.trim()));
  if (invalidLink) {
    return `${invalidLink[0]} must be a valid link starting with https://`;
  }

  if (!EMAIL_PATTERN.test(content.contact.email.trim())) {
    return "Contact email is not valid.";
  }
  if (
    content.about.skills.some(
      (skill) => !Number.isFinite(skill.value) || skill.value < 0 || skill.value > 100,
    )
  ) {
    return "Skill values must be between 0 and 100.";
  }
  if (content.stats.items.some((stat) => !Number.isFinite(stat.value) || stat.value < 0)) {
    return "Stat numbers cannot be negative.";
  }
  return null;
}
