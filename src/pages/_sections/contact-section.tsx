import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Send, Timer } from "lucide-react";
import NeonBorderCard from "@/components/neon-border-card.tsx";
import SectionHeading from "@/components/section-heading.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { CONTACT_EMAIL } from "@/lib/site-config.ts";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

const INFO_ROWS = [
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Timer, label: "Response Time", value: "Within 24-48 hours" },
  { icon: MapPin, label: "Open For", value: "Collabs, Sponsorships & Fan Mail" },
];

const fieldClass =
  "h-12 border-border/80 bg-background/60 font-sans text-base focus-visible:border-primary focus-visible:ring-primary/30";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  // Opens the visitor's email app with the message pre-filled, so it lands directly in RTX ARHAN's inbox
  const onSubmit = (values: ContactValues) => {
    const subject = encodeURIComponent(`Message from ${values.name} via RTX ARHAN website`);
    const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name}\nEmail: ${values.email}`);
    window.location.assign(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
    toast.success("Opening your email app to send the message!");
    reset();
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 -z-10 size-96 rounded-full bg-primary/15 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Get In Touch" title="CONTACT ME" />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
              {"Let's "}
              <span className="text-primary">Team Up</span>
            </h3>
            <p className="font-sans text-lg leading-relaxed text-muted-foreground">
              Brand deal, collab idea, or just want to say hi? Drop a message and RTX ARHAN will get back to you.
            </p>
            <div className="space-y-3">
              {INFO_ROWS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 rounded-xl border border-border/70 bg-card/70 p-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/30">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="cursor-pointer break-all font-sans text-base font-semibold text-foreground transition-colors hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans text-base font-semibold text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <NeonBorderCard innerClassName="p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Name
                  </label>
                  <Input id="contact-name" placeholder="John Smith" aria-invalid={!!errors.name} className={fieldClass} {...register("name")} />
                  {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </label>
                  <Input id="contact-email" type="email" placeholder="example@gmail.com" aria-invalid={!!errors.email} className={fieldClass} {...register("email")} />
                  {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Hey RTX ARHAN, let's collab on..."
                    aria-invalid={!!errors.message}
                    className="min-h-36 border-border/80 bg-background/60 font-sans text-base focus-visible:border-primary focus-visible:ring-primary/30"
                    {...register("message")}
                  />
                  {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_0_24px_oklch(0.63_0.25_25/40%)] transition-all duration-500 hover:bg-right hover:shadow-[0_0_36px_oklch(0.55_0.25_300/60%)]"
                >
                  <Send className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  Send Message
                </button>
              </form>
            </NeonBorderCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
