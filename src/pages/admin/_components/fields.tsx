import { useId } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { cn } from "@/lib/utils.ts";

const LABEL_CLASS = "font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";
const FIELD_CLASS = "border-border/80 bg-background/60 text-base focus-visible:border-primary focus-visible:ring-primary/30";
const ICON_BUTTON_CLASS =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  multiline?: boolean;
};

export function TextField({ label, value, onChange, placeholder, hint, multiline }: TextFieldProps) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn("min-h-24", FIELD_CLASS)}
        />
      ) : (
        <Input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn("h-10", FIELD_CLASS)}
        />
      )}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function NumberField({ label, value, onChange, min, max }: NumberFieldProps) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(Number.isFinite(next) ? next : 0);
        }}
        className={cn("h-10", FIELD_CLASS)}
      />
    </div>
  );
}

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

export function ImageField({ label, value, onChange, hint }: ImageFieldProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_7rem] sm:items-end">
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        placeholder="https://..."
        hint={hint ?? "Paste an image link (for example from Files & Media)."}
      />
      <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-muted/40">
        {value.trim() ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-muted-foreground">No image</span>
        )}
      </div>
    </div>
  );
}

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 cursor-pointer accent-primary"
      />
      {label}
    </label>
  );
}

type FormCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function FormCard({ title, description, children }: FormCardProps) {
  return (
    <section className="space-y-5 rounded-xl border border-border/70 bg-card/70 p-5 sm:p-6">
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">{title}</h3>
        {description ? <p className="pt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type ListEditorProps<T> = {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  itemLabel: (item: T, index: number) => string;
  renderItem: (item: T, update: (next: T) => void) => React.ReactNode;
  addLabel: string;
  max?: number;
};

// Editable list with add, remove and reorder controls.
export function ListEditor<T>({
  title,
  items,
  onChange,
  createItem,
  itemLabel,
  renderItem,
  addLabel,
  max = 24,
}: ListEditorProps<T>) {
  const move = (from: number, to: number) => {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <FormCard title={title}>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing here yet. Add the first item below.</p>
      ) : null}
      {items.map((item, index) => (
        <div key={index} className="space-y-4 rounded-lg border border-border/60 bg-background/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {itemLabel(item, index)}
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
                className={ICON_BUTTON_CLASS}
              >
                <ArrowUp className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={index === items.length - 1}
                onClick={() => move(index, index + 1)}
                className={ICON_BUTTON_CLASS}
              >
                <ArrowDown className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className={cn(ICON_BUTTON_CLASS, "hover:border-destructive/60 hover:text-destructive")}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          {renderItem(item, (next) => onChange(items.map((current, i) => (i === index ? next : current))))}
        </div>
      ))}
      <button
        type="button"
        disabled={items.length >= max}
        onClick={() => onChange([...items, createItem()])}
        className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-primary/50 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" />
        {addLabel}
      </button>
    </FormCard>
  );
}
