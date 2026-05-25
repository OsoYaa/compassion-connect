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
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("contact.intro")}</p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-10">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {t("volunteer.intro.p1")}
            </p>
            <h2 className="mt-6 text-lg font-semibold text-foreground sm:text-xl">
              {t("volunteer.intro.benefitsTitle")}
            </h2>
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
          </div>


          <div className="mt-14 mx-auto max-w-2xl">


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
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
