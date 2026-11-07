import type { SiteContent } from "@/convex/shared/siteContent.ts";
import { FormCard, ImageField, ListEditor, NumberField, TextField } from "./fields.tsx";

type FormProps<K extends keyof SiteContent> = {
  value: SiteContent[K];
  onChange: (next: SiteContent[K]) => void;
};

export function VideosForm({ value, onChange }: FormProps<"videos">) {
  return (
    <div className="space-y-6">
      <FormCard title="Videos section">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Small heading" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
          <TextField label="Section title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
        </div>
        <TextField
          label="Bottom button text"
          value={value.buttonText}
          onChange={(buttonText) => onChange({ ...value, buttonText })}
        />
      </FormCard>
      <ListEditor
        title="Featured videos"
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({ title: "", category: "Gameplay", duration: "", views: "", url: "", thumbnail: "" })}
        itemLabel={(video, index) => video.title || `Video ${index + 1}`}
        addLabel="Add video"
        renderItem={(video, update) => (
          <>
            <TextField
              label="YouTube link"
              value={video.url}
              placeholder="https://www.youtube.com/watch?v=..."
              hint="With a real video link, the YouTube thumbnail shows automatically."
              onChange={(url) => update({ ...video, url })}
            />
            <TextField label="Title" value={video.title} onChange={(title) => update({ ...video, title })} />
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField label="Category" value={video.category} onChange={(category) => update({ ...video, category })} />
              <TextField
                label="Duration"
                value={video.duration}
                placeholder="12:30"
                onChange={(duration) => update({ ...video, duration })}
              />
              <TextField label="Views" value={video.views} placeholder="120K" onChange={(views) => update({ ...video, views })} />
            </div>
            <ImageField
              label="Custom image (optional)"
              value={video.thumbnail}
              hint="Only used when the link is not a single YouTube video."
              onChange={(thumbnail) => update({ ...video, thumbnail })}
            />
          </>
        )}
      />
    </div>
  );
}

export function StatsForm({ value, onChange }: FormProps<"stats">) {
  return (
    <FormCard title="Stats section" description="These numbers also show as badges at the top of the page.">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Small heading" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Section title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
      </div>
      {value.items.map((stat, index) => {
        const update = (next: typeof stat) =>
          onChange({ ...value, items: value.items.map((current, i) => (i === index ? next : current)) });
        return (
          <div key={stat.key} className="grid gap-4 rounded-lg border border-border/60 bg-background/40 p-4 sm:grid-cols-[1fr_10rem_5rem]">
            <TextField label="Label" value={stat.label} onChange={(label) => update({ ...stat, label })} />
            <NumberField label="Number" min={0} value={stat.value} onChange={(number) => update({ ...stat, value: number })} />
            <TextField label="After" value={stat.suffix} placeholder="+" onChange={(suffix) => update({ ...stat, suffix })} />
          </div>
        );
      })}
    </FormCard>
  );
}

const PLATFORMS = [
  { key: "youtube", name: "YouTube" },
  { key: "instagram", name: "Instagram" },
  { key: "discord", name: "Discord" },
] as const;

export function SocialForm({ value, onChange }: FormProps<"social">) {
  return (
    <div className="space-y-6">
      <FormCard title="Social section">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Small heading" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
          <TextField label="Section title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
        </div>
      </FormCard>
      {PLATFORMS.map(({ key, name }) => {
        const platform = value[key];
        const update = (next: typeof platform) => onChange({ ...value, [key]: next });
        return (
          <FormCard key={key} title={name}>
            <TextField label="Link" value={platform.url} placeholder="https://..." onChange={(url) => update({ ...platform, url })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Handle" value={platform.handle} onChange={(handle) => update({ ...platform, handle })} />
              <TextField label="Button text" value={platform.action} onChange={(action) => update({ ...platform, action })} />
            </div>
            <TextField
              label="Description"
              value={platform.description}
              onChange={(description) => update({ ...platform, description })}
            />
          </FormCard>
        );
      })}
    </div>
  );
}

export function ContactForm({ value, onChange }: FormProps<"contact">) {
  return (
    <FormCard title="Contact section">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Small heading" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Section title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
        <TextField label="Heading" value={value.heading} onChange={(heading) => onChange({ ...value, heading })} />
        <TextField
          label="Heading (red part)"
          value={value.headingHighlight}
          onChange={(headingHighlight) => onChange({ ...value, headingHighlight })}
        />
      </div>
      <TextField
        label="Description"
        multiline
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
      />
      <TextField
        label="Contact email"
        value={value.email}
        placeholder="example@gmail.com"
        hint="Messages from the contact form go to this email."
        onChange={(email) => onChange({ ...value, email })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Response time"
          value={value.responseTime}
          onChange={(responseTime) => onChange({ ...value, responseTime })}
        />
        <TextField label="Open for" value={value.openFor} onChange={(openFor) => onChange({ ...value, openFor })} />
      </div>
      <TextField label="Send button text" value={value.buttonText} onChange={(buttonText) => onChange({ ...value, buttonText })} />
    </FormCard>
  );
}

export function FooterForm({ value, onChange }: FormProps<"footer">) {
  return (
    <FormCard title="Footer">
      <TextField label="Tagline" value={value.tagline} onChange={(tagline) => onChange({ ...value, tagline })} />
      <TextField
        label="Contact text"
        value={value.contactText}
        onChange={(contactText) => onChange({ ...value, contactText })}
      />
    </FormCard>
  );
}
