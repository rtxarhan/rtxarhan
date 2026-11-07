import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { SiteContent } from "@/convex/shared/siteContent.ts";
import { DEFAULT_CONTENT } from "@/lib/default-content.ts";

// Saved content from the admin panel, or the original content until something is saved.
export function useSiteContent(): SiteContent {
  const stored = useQuery(api.siteContent.get, {});
  return stored ?? DEFAULT_CONTENT;
}
