import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
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
  id, label, type = "text", as = "input", required, options, placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}) {
  const cls =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={id} required={required} rows={4} className={cls} />
      ) : as === "select" ? (
        <select id={id} name={id} required={required} defaultValue="" className={cls}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={id} type={type} required={required} className={cls} />
      )}
    </div>
  );
}

function ContactPage() {
  const { t } = useT();

  const onSubmit = (formType: "need" | "vol") => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const isNeed = formType === "need";
    const subject = isNeed
      ? `[People in Need] Request from ${fd.get("need-name") || ""}`
      : `[Volunteer] ${fd.get("vol-name") || ""}`;

    let rows: { label: string; value: string }[];
    let replyTo: string | undefined;
    if (isNeed) {
      rows = [
        { label: "Name", value: String(fd.get("need-name") || "") },
        { label: "Phone", value: String(fd.get("need-phone") || "") },
        { label: "Message", value: String(fd.get("need-msg") || "") },
      ];
    } else {
      replyTo = String(fd.get("vol-email") || "") || undefined;
      rows = [
        { label: "Name", value: String(fd.get("vol-name") || "") },
        { label: "Phone", value: String(fd.get("vol-phone") || "") },
        { label: "Email", value: String(fd.get("vol-email") || "") },
        { label: "Country / City", value: String(fd.get("vol-location") || "") },
        { label: "Profession / Skills", value: String(fd.get("vol-profession") || "") },
        { label: "Contribution Field", value: String(fd.get("vol-field") || "") },
        { label: "Availability", value: String(fd.get("vol-availability") || "") },
        { label: "Message / Idea", value: String(fd.get("vol-message") || "") },
      ];
    }

    try {
      const res = await fetch("/api/public/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, rows, replyTo }),
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

          <div className="mt-14 mx-auto max-w-3xl">
            {/* Bëhu vullnetar — big outer box */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] sm:p-10">
              <h2 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                {t("volunteer.intro.p1")}
              </h2>

              <h3 className="mt-6 text-lg font-semibold text-foreground sm:text-xl">
                {t("volunteer.intro.benefitsTitle")}
              </h3>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">{t("volunteer.intro.b1Title")}: </strong>
                    {t("volunteer.intro.b1Text")}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="text-foreground">{t("volunteer.intro.b2Title")}: </strong>
                    {t("volunteer.intro.b2Text")}
                  </span>
                </li>
              </ul>

              <p className="mt-8 text-base leading-relaxed text-foreground">
                {t("volunteer.intro.join")}
              </p>

              {/* Inner smaller box with the form */}
              <form
                onSubmit={onSubmit("vol")}
                className="mt-5 rounded-xl border border-border bg-background p-6 shadow-sm sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">{t("contact.volTitle")}</h3>
                </div>
                {t("contact.volDesc") && (
                  <p className="mt-2 text-sm text-muted-foreground">{t("contact.volDesc")}</p>
                )}
                <div className="mt-5 space-y-4">
                  <Field id="vol-name" label={t("form.volName")} required />
                  <Field id="vol-phone" label={t("form.phone")} type="tel" required />
                  <Field id="vol-email" label={t("form.email")} type="email" required />
                  <Field id="vol-location" label={t("form.location")} required />
                  <Field id="vol-profession" label={t("form.profession")} required />
                  <Field
                    id="vol-field"
                    label={t("form.contributionField")}
                    as="select"
                    required
                    placeholder={t("form.select")}
                    options={[
                      { value: t("form.field.events"), label: t("form.field.events") },
                      { value: t("form.field.social"), label: t("form.field.social") },
                      { value: t("form.field.media"), label: t("form.field.media") },
                      { value: t("form.field.education"), label: t("form.field.education") },
                      { value: t("form.field.organization"), label: t("form.field.organization") },
                      { value: t("form.field.other"), label: t("form.field.other") },
                    ]}
                  />
                  <Field
                    id="vol-availability"
                    label={t("form.availability")}
                    as="select"
                    required
                    placeholder={t("form.select")}
                    options={[
                      { value: t("form.avail.weekly"), label: t("form.avail.weekly") },
                      { value: t("form.avail.weekend"), label: t("form.avail.weekend") },
                      { value: t("form.avail.online"), label: t("form.avail.online") },
                      { value: t("form.avail.onNeed"), label: t("form.avail.onNeed") },
                    ]}
                  />
                  <Field id="vol-message" label={t("form.messageIdea")} as="textarea" />
                </div>
                <p className="text-xs text-muted-foreground">{t("form.requiredNote")}</p>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t("form.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
