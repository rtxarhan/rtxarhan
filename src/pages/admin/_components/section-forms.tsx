import type { SiteContent } from "@/convex/shared/siteContent.ts";
import { CheckboxField, FormCard, ImageField, ListEditor, NumberField, TextField } from "./fields.tsx";

type FormProps<K extends keyof SiteContent> = {
  value: SiteContent[K];
  onChange: (next: SiteContent[K]) => void;
};

export function ImagesForm({ value, onChange }: FormProps<"images">) {
  return (
    <FormCard title="Images" description="Logo and background pictures used across the website.">
      <ImageField label="Logo" value={value.logo} onChange={(logo) => onChange({ ...value, logo })} />
      <ImageField label="Hero background" value={value.heroBg} onChange={(heroBg) => onChange({ ...value, heroBg })} />
      <ImageField label="About section photo" value={value.setup} onChange={(setup) => onChange({ ...value, setup })} />
      <ImageField
        label="Default video image"
        value={value.videoFallback}
        onChange={(videoFallback) => onChange({ ...value, videoFallback })}
        hint="Used for a video that has no YouTube link or custom image."
      />
    </FormCard>
  );
}

export function HeroForm({ value, onChange }: FormProps<"hero">) {
  return (
    <FormCard title="Hero (top of page)">
      <TextField label="Small badge text" value={value.badge} onChange={(badge) => onChange({ ...value, badge })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Title line 1 (red)"
          value={value.titleTop}
          onChange={(titleTop) => onChange({ ...value, titleTop })}
        />
        <TextField
          label="Title line 2 (white)"
          value={value.titleBottom}
          onChange={(titleBottom) => onChange({ ...value, titleBottom })}
        />
      </div>
      <TextField label="Tagline" value={value.tagline} onChange={(tagline) => onChange({ ...value, tagline })} />
      <TextField
        label="Description"
        multiline
        value={value.description}
        onChange={(description) => onChange({ ...value, description })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Main button text"
          value={value.primaryCta}
          onChange={(primaryCta) => onChange({ ...value, primaryCta })}
        />
        <TextField
          label="Second button text"
          value={value.secondaryCta}
          onChange={(secondaryCta) => onChange({ ...value, secondaryCta })}
        />
      </div>
    </FormCard>
  );
}

export function AboutForm({ value, onChange }: FormProps<"about">) {
  return (
    <div className="space-y-6">
      <FormCard title="About section">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Small heading" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
          <TextField label="Section title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
        </div>
        <TextField
          label="Photo badge"
          value={value.statusBadge}
          onChange={(statusBadge) => onChange({ ...value, statusBadge })}
          hint="Leave empty to hide the badge."
        />
      </FormCard>
      <ListEditor
        title="Paragraphs"
        items={value.paragraphs}
        onChange={(paragraphs) => onChange({ ...value, paragraphs })}
        createItem={() => ""}
        itemLabel={(_, index) => `Paragraph ${index + 1}`}
        addLabel="Add paragraph"
        renderItem={(paragraph, update) => (
          <TextField label="Text" multiline value={paragraph} onChange={update} />
        )}
      />
      <ListEditor
        title="Profile rows"
        items={value.profileRows}
        onChange={(profileRows) => onChange({ ...value, profileRows })}
        createItem={() => ({ label: "", value: "" })}
        itemLabel={(row, index) => row.label || `Row ${index + 1}`}
        addLabel="Add row"
        renderItem={(row, update) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={row.label} onChange={(label) => update({ ...row, label })} />
            <TextField label="Value" value={row.value} onChange={(text) => update({ ...row, value: text })} />
          </div>
        )}
      />
      <ListEditor
        title="Skill bars"
        items={value.skills}
        onChange={(skills) => onChange({ ...value, skills })}
        createItem={() => ({ label: "", value: 80 })}
        itemLabel={(skill, index) => skill.label || `Skill ${index + 1}`}
        addLabel="Add skill"
        renderItem={(skill, update) => (
          <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
            <TextField label="Skill name" value={skill.label} onChange={(label) => update({ ...skill, label })} />
            <NumberField
              label="Percent (0-100)"
              min={0}
              max={100}
              value={skill.value}
              onChange={(percent) => update({ ...skill, value: percent })}
            />
          </div>
        )}
      />
    </div>
  );
}

export function ContentForm({ value, onChange }: FormProps<"content">) {
  return (
    <div className="space-y-6">
      <FormCard title="Content section">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Small heading" value={value.eyebrow} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
          <TextField label="Section title" value={value.title} onChange={(title) => onChange({ ...value, title })} />
        </div>
      </FormCard>
      <ListEditor
        title="Content cards"
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        createItem={() => ({ title: "", description: "", live: false })}
        itemLabel={(item, index) => item.title || `Card ${index + 1}`}
        addLabel="Add card"
        renderItem={(item, update) => (
          <>
            <TextField label="Title" value={item.title} onChange={(title) => update({ ...item, title })} />
            <TextField
              label="Description"
              multiline
              value={item.description}
              onChange={(description) => update({ ...item, description })}
            />
            <CheckboxField label="Show LIVE badge" checked={item.live} onChange={(live) => update({ ...item, live })} />
          </>
        )}
      />
    </div>
  );
}
