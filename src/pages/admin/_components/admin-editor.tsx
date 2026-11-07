import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { ExternalLink, LogOut, RotateCcw, Save } from "lucide-react";
import { api } from "@/convex/_generated/api.js";
import { validateSiteContent, type SiteContent } from "@/convex/shared/siteContent.ts";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { DEFAULT_CONTENT } from "@/lib/default-content.ts";
import { cn } from "@/lib/utils.ts";
import { AboutForm, ContentForm, HeroForm, ImagesForm } from "./section-forms.tsx";
import { ContactForm, FooterForm, SocialForm, StatsForm, VideosForm } from "./more-section-forms.tsx";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "content", label: "Content" },
  { id: "videos", label: "Videos" },
  { id: "stats", label: "Stats" },
  { id: "social", label: "Social" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
  { id: "images", label: "Images" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof ConvexError && typeof error.data?.message === "string" ? error.data.message : fallback;
}

type AdminEditorProps = {
  initial: SiteContent;
  onSignOut: () => void;
};

export default function AdminEditor({ initial, onSignOut }: AdminEditorProps) {
  const save = useMutation(api.siteContent.save);
  const reset = useMutation(api.siteContent.reset);
  const [draft, setDraft] = useState<SiteContent>(initial);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState<TabId>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const hasChanges = JSON.stringify(draft) !== savedJson;

  const update = <K extends keyof SiteContent>(key: K) => (next: SiteContent[K]) =>
    setDraft((current) => ({ ...current, [key]: next }));

  const handleSave = async () => {
    const problem = validateSiteContent(draft);
    if (problem) {
      toast.error(problem);
      return;
    }
    setIsSaving(true);
    try {
      await save({ content: draft });
      setSavedJson(JSON.stringify(draft));
      toast.success("Website updated!");
    } catch (error) {
      toast.error(errorMessage(error, "Could not save changes"));
    } finally {
      setIsSaving(false);
    }
  };

  // First click asks for confirmation, second click resets.
  const handleReset = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setConfirmReset(false);
    setIsSaving(true);
    try {
      await reset({});
      setDraft(DEFAULT_CONTENT);
      setSavedJson(JSON.stringify(DEFAULT_CONTENT));
      toast.success("Website restored to original content");
    } catch (error) {
      toast.error(errorMessage(error, "Could not reset content"));
    } finally {
      setIsSaving(false);
    }
  };

  const forms: Record<TabId, React.ReactNode> = {
    hero: <HeroForm value={draft.hero} onChange={update("hero")} />,
    about: <AboutForm value={draft.about} onChange={update("about")} />,
    content: <ContentForm value={draft.content} onChange={update("content")} />,
    videos: <VideosForm value={draft.videos} onChange={update("videos")} />,
    stats: <StatsForm value={draft.stats} onChange={update("stats")} />,
    social: <SocialForm value={draft.social} onChange={update("social")} />,
    contact: <ContactForm value={draft.contact} onChange={update("contact")} />,
    footer: <FooterForm value={draft.footer} onChange={update("footer")} />,
    images: <ImagesForm value={draft.images} onChange={update("images")} />,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-primary/30 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={draft.images.logo} alt="" className="size-9 rounded-lg object-cover" />
            <div>
              <p className="font-display text-sm font-black uppercase tracking-[0.12em]">
                Admin <span className="text-primary">Panel</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {hasChanges ? "Unsaved changes" : "All changes saved"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <ExternalLink />
                View site
              </Link>
            </Button>
            <Button
              variant={confirmReset ? "destructive" : "secondary"}
              size="sm"
              disabled={isSaving}
              onClick={handleReset}
              onBlur={() => setConfirmReset(false)}
              className="cursor-pointer"
            >
              <RotateCcw />
              {confirmReset ? "Click again to confirm" : "Reset to original"}
            </Button>
            <Button size="sm" disabled={isSaving || !hasChanges} onClick={handleSave} className="cursor-pointer">
              {isSaving ? <Spinner /> : <Save />}
              Save changes
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Sign out" onClick={onSignOut} className="cursor-pointer">
              <LogOut />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[12rem_1fr] md:py-10">
        <nav
          aria-label="Sections"
          className="flex gap-2 overflow-x-auto pb-1 md:sticky md:top-24 md:flex-col md:self-start md:overflow-visible"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "shrink-0 cursor-pointer rounded-md px-4 py-2.5 text-left font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors",
                tab === id
                  ? "bg-primary text-primary-foreground shadow-[0_0_18px_oklch(0.63_0.25_25/35%)]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <main className="min-w-0 space-y-6 pb-16">{forms[tab]}</main>
      </div>
    </div>
  );
}
