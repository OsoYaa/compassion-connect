import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Heart, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { donationDetails } from "@/lib/donation";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Brandon Forever 22 Legacy" },
      { name: "description", content: "Support Brandon Forever 22 Legacy with a bank transfer in LEK or EUR. Find our Intesa Sanpaolo Bank Albania account details." },
      { property: "og:title", content: "Donate — Brandon Forever 22 Legacy" },
      { property: "og:description", content: "Make a donation by bank transfer in LEK or EUR to support Brandon Forever 22 Legacy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DonatePage,
});

function Account({ currency, iban }: { currency: string; iban: string }) {
  const { lang } = useT();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(iban);
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <article className="min-w-0 rounded-md border border-border bg-card p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold text-foreground">{lang === "sq" ? "Llogaria në" : "Account in"} {currency}</h3>
        <Landmark className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-6 text-xs font-semibold text-muted-foreground">IBAN</p>
      <p className="mt-2 break-all font-mono text-base leading-relaxed text-foreground sm:text-lg">{iban}</p>
      <Button variant="outline" className="mt-5 h-11 w-full gap-2" onClick={copy} aria-label={`${lang === "sq" ? "Kopjo" : "Copy"} ${currency} IBAN`}>
        {copied ? <Check /> : <Copy />}
        {copied ? (lang === "sq" ? "U kopjua" : "Copied") : (lang === "sq" ? "Kopjo IBAN" : "Copy IBAN")}
      </Button>
      <p role="status" className="mt-2 min-h-5 text-xs text-muted-foreground">{error ? (lang === "sq" ? "Kopjimi nuk u krye. Zgjidhni dhe kopjoni IBAN-in më sipër." : "Copy failed. Select and copy the IBAN above.") : ""}</p>
    </article>
  );
}

function DonatePage() {
  const { lang, t } = useT();
  const albanian = lang === "sq";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Heart className="h-4 w-4" aria-hidden="true" />
          <span>Brandon Forever 22 Legacy</span>
        </div>
        <h1 className="mt-5 font-serif text-4xl font-semibold sm:text-5xl">{albanian ? "Bëni një dhurim" : "Make a donation"}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{albanian ? "Mbështesni misionin tonë humanitar." : "Support our humanitarian mission."}</p>
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-serif text-2xl font-semibold">{albanian ? "Dhurime me transfertë bankare" : "Bank transfer donations"}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {donationDetails.accounts.map((account) => <Account key={account.currency} {...account} />)}
          </div>
          <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">{albanian ? "Emri i llogarisë" : "Account name"}</dt>
              <dd className="mt-2 font-semibold">{donationDetails.accountName}</dd>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{albanian ? "Adresa" : "Address"}: {donationDetails.organizationAddress}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">SWIFT / BIC</dt>
              <dd className="mt-2 font-mono font-semibold">{donationDetails.swift}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-muted-foreground">{t("donate.bankName")}</dt>
              <dd className="mt-2 font-semibold">{donationDetails.bankName}</dd>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{donationDetails.bankAddress}</dd>
            </div>
          </dl>
        </div>
        {/* Organizata/Adresa blocks moved: the address now sits under the account name. */}
        <p className="mt-10 font-handwriting text-3xl text-primary">{t("donate.thanks")}</p>
      </main>
      <SiteFooter />
    </div>
  );
}