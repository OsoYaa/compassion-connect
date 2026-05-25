import { createFileRoute } from "@tanstack/react-router";
import { Heart, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader, SiteFooter, SOCIAL_LINKS } from "@/components/site-chrome";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Forever Brandon Legacy" },
      { name: "description", content: "Reach out for help or to volunteer." },
      { property: "og:title", content: "Contact — Forever Brandon Legacy" },
      { property: "og:description", content: "Reach out for help or to volunteer." },
    ],
  }),
  component: ContactPage,
});

function Field({
  id, label, type = "text", as = "input", required,
}: { id: string; label: string; type?: string; as?: "input" | "textarea"; required?: boolean }) {
  const cls =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      {as === "textarea" ? (
        <textarea id={id} name={id} required={required} rows={4} className={cls} />
      ) : (
        <input id={id} name={id} type={type} required={required} className={cls} />
      )}
    </div>
  );
}

function ContactPage() {
  const { t } = useT();

  const RECIPIENT = "brandonforever22legacy@gmail.com";

  const onSubmit = (formType: "need" | "vol") => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const isNeed = formType === "need";
    const subject = isNeed
      ? `[People in Need] Request from ${fd.get("need-name") || ""}`
      : `[Volunteer] ${fd.get("vol-name") || ""}`;

    const payload: Record<string, string> = {
      _subject: subject,
      _template: "table",
      _captcha: "false",
    };
    if (isNeed) {
      payload.Name = String(fd.get("need-name") || "");
      payload.Phone = String(fd.get("need-phone") || "");
      payload.Message = String(fd.get("need-msg") || "");
    } else {
      payload.Name = String(fd.get("vol-name") || "");
      payload.Email = String(fd.get("vol-email") || "");
      payload["How they can help"] = String(fd.get("vol-help") || "");
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Send failed");
      toast.success(t("form.thanks"));
      form.reset();
    } catch {
      toast.error("Could not send. Please try again.");
    }
  };


  return (
    <main className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <SiteHeader />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("contact.headline")}</h1>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.phoneLabel")}</p>
                <p className="mt-2 text-base text-foreground">—</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.emailLabel")}</p>
                <a href="mailto:brandonforever22legacy@gmail.com" className="mt-2 block break-all text-base text-foreground hover:text-primary">
                  brandonforever22legacy@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm font-medium text-foreground">{t("contact.followUs") ?? "Follow us"}</p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* People in Need */}
            <form onSubmit={onSubmit("need")} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] sm:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{t("contact.peopleTitle")}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t("contact.peopleDesc")}</p>
              <div className="mt-6 space-y-4">
                <Field id="need-name" label={t("form.fullName")} required />
                <Field id="need-phone" label={t("form.phone")} type="tel" required />
                <Field id="need-msg" label={t("form.message")} as="textarea" required />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("form.submit")}
              </button>
            </form>

            {/* Volunteers */}
            <form onSubmit={onSubmit("vol")} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] sm:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{t("contact.volTitle")}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t("contact.volDesc")}</p>
              <div className="mt-6 space-y-4">
                <Field id="vol-name" label={t("form.fullName")} required />
                <Field id="vol-email" label={t("form.email")} type="email" required />
                <Field id="vol-help" label={t("form.howHelp")} as="textarea" required />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("form.submit")}
              </button>
            </form>
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-10">
            <blockquote className="font-serif text-lg italic text-primary sm:text-xl">
              “{t("contact.calloutQuote")}”
            </blockquote>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.phoneLabel")}</p>
                <p className="mt-2 text-base text-foreground">—</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.emailLabel")}</p>
                <a href="mailto:brandonforever22legacy@gmail.com" className="mt-2 block break-all text-base text-foreground hover:text-primary">
                  brandonforever22legacy@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm font-medium text-foreground">{t("contact.followUs") ?? "Follow us"}</p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
