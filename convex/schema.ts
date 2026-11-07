import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { siteContentValidator } from "./shared/siteContent";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  // One document (key "main") holds all editable website content.
  siteContent: defineTable({
    key: v.literal("main"),
    content: siteContentValidator,
    updatedAt: v.string(),
  }).index("by_key", ["key"]),
});
