import { ConvexError } from "convex/values";
import type { UserIdentity } from "convex/server";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import {
  ADMIN_EMAIL,
  siteContentValidator,
  validateSiteContent,
} from "./shared/siteContent";

const CONTENT_KEY = "main";

function isAdminIdentity(identity: UserIdentity | null): boolean {
  if (!identity) return false;
  const email = identity.email?.trim().toLowerCase();
  return email === ADMIN_EMAIL && identity.emailVerified !== false;
}

async function getContentDoc(ctx: QueryCtx | MutationCtx) {
  return await ctx.db
    .query("siteContent")
    .withIndex("by_key", (q) => q.eq("key", CONTENT_KEY))
    .unique();
}

async function requireAdmin(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError({ code: "UNAUTHENTICATED", message: "Please sign in first" });
  }
  if (!isAdminIdentity(identity)) {
    throw new ConvexError({ code: "FORBIDDEN", message: "Only the site owner can edit content" });
  }
}

/** Public: the saved website content, or null when the defaults are in use. */
export const get = query({
  args: {},
  handler: async (ctx) => {
    const doc = await getContentDoc(ctx);
    return doc ? doc.content : null;
  },
});

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    return isAdminIdentity(await ctx.auth.getUserIdentity());
  },
});

export const save = mutation({
  args: { content: siteContentValidator },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const error = validateSiteContent(args.content);
    if (error) {
      throw new ConvexError({ code: "BAD_REQUEST", message: error });
    }
    const updatedAt = new Date().toISOString();
    const existing = await getContentDoc(ctx);
    if (existing) {
      await ctx.db.patch("siteContent", existing._id, { content: args.content, updatedAt });
    } else {
      await ctx.db.insert("siteContent", { key: CONTENT_KEY, content: args.content, updatedAt });
    }
    return null;
  },
});

/** Deletes saved content so the website goes back to its original text. */
export const reset = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const existing = await getContentDoc(ctx);
    if (existing) {
      await ctx.db.delete("siteContent", existing._id);
    }
    return null;
  },
});
