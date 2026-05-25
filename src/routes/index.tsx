import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Copy, Check, PlayCircle, ArrowRight, Megaphone, BookHeart, HandHeart,
  GraduationCap, Phone, Mail, Facebook, Instagram, Heart, Gift, Share2, TrendingUp, ImageIcon,
  Calendar, MapPin, Clock,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import brandonPortrait from "@/assets/unnamed.jpg";
import brandonPortraitMobile from "@/assets/brandon-portrait-mobile.jpg";
import googleLogo from "@/assets/google transparent.png";
import { Toaster } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Index,
});

const bankAccount = { bankName: "Bank Name", holder: "Account Holder", iban: "IBAN", swift: "SWIFT / BIC" };

type CaseItem = { key: string; youtubeId: string; image?: string };
const RESOLVED_CASES: CaseItem[] = [
  { key: "article1", youtubeId: "" },
  { key: "article2", youtubeId: "" },
  { key: "article3", youtubeId: "" },
];

// Tiny shared atoms ----------------------------------------------------------

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-[0.32em] ${
        light ? "text-white/60" : "text-navy"
      }`}
    >
      {children}
    </span>
  );
}

function Rule({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px w-12 ${light ? "bg-white/30" : "bg-border"}`}
    />
  );
}

function CopyIban({ iban }: { iban: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useT();
  const onCopy = async () => {
    await navigator.clipboard.writeText(iban.replace(/\s/g, ""));
    setCopied(true);
    toast.success(t("donate.copy"));
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={onCopy}
      aria-label="Copy IBAN"
      className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-navy transition-colors hover:border-navy hover:text-navy"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function VideoFrame({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden border border-white/15 bg-white/[0.04]">
      <div className="flex flex-col items-center gap-3 text-white/75">
        <PlayCircle className="h-12 w-12" strokeWidth={1.25} />
        <span className="text-xs font-medium uppercase tracking-[0.24em]">{label}</span>
      </div>
    </div>
  );
}

function CaseCard({ item, index }: { item: CaseItem; index: number }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const title = t(`cases.${item.key}.title`);
  const excerpt = t(`cases.${item.key}.excerpt`);
  const body = t(`cases.${item.key}.body`);

  return (
    <>
      <article className="group flex flex-col border-t border-border pt-8">
        <span className="font-mono text-xs tracking-widest text-navy">
          {String(index + 1).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-secondary"
          aria-label={title}
        >
          {item.image ? (
            <img src={item.image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground/50" strokeWidth={1.25} />
          )}
        </button>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-navy">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.2em] text-navy hover:text-navy"
        >
          {t("cases.readMore")} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl sm:text-3xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden bg-secondary">
            {item.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <PlayCircle className="h-14 w-14 text-navy/60" strokeWidth={1.25} />
              </div>
            )}
          </div>
          <p className="mt-2 text-base leading-relaxed text-foreground">{body}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PillarTile({
  index,
  Icon,
  title,
  text,
}: {
  index: number;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-start gap-3 border border-white/15 bg-navy/60 p-4 text-left text-white backdrop-blur-sm transition-colors hover:border-white/50"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/30 text-white">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]">{title}</h3>
            <span
              aria-hidden="true"
              className={`text-white/80 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`grid transition-all duration-300 ease-out ${
              open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="overflow-hidden text-xs leading-relaxed text-white/80">{text}</p>
          </div>
        </div>
      </button>
    </li>
  );
}

function Index() {
  const { t } = useT();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <SiteHeader />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden min-h-screen px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-24">
        <Link
          to="/"
          className="absolute left-1/2 top-12 z-20 flex -translate-x-1/2 items-center justify-center transition duration-300 hover:scale-[1.03] md:left-[4%] md:top-24 md:translate-x-0 md:translate-y-[10%]"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-[14.2rem] w-auto object-contain sm:h-[16.7rem] md:h-40 lg:h-[11.25rem]"
          />
        </Link>

        {/* Background image + gradient fade (replaces wavy divider) */}
        <div className="pointer-events-none absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={brandonPortraitMobile} />
            <img
              src={brandonPortrait}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
            />
          </picture>
          {/* Navy wash for contrast */}
          <div className="absolute inset-0 bg-navy/65" />
          {/* Smooth fade into next (navy) section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--navy)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col justify-center md:mx-0 md:ml-[2%] md:max-w-[65%] md:justify-start md:pt-[11rem] lg:pt-[13rem] md:pr-8">
          <div className="animate-fade-up flex flex-col text-center md:text-left text-white">
            <h1 className="mt-[12.5rem] font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:mt-[15.5rem] sm:text-6xl md:mt-0 md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:mx-0 md:text-lg">
              <span dangerouslySetInnerHTML={{ __html: t("hero.subtitle") }} />
            </p>
            <p className="mt-8 font-serif text-lg italic tracking-[0.04em] text-white/90 sm:text-2xl md:text-3xl">
              {t("hero.slogan")}
            </p>

            {/* Two-button layout: teal primary + white outline ghost */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <a
                href="https://gofundme.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[12rem] items-center justify-center gap-2 bg-accent-red px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:brightness-110 whitespace-nowrap"
              >
                <Heart className="h-4 w-4" fill="currentColor" /> {t("hero.donate")}
              </a>
              <a
                href="#about"
                className="inline-flex min-w-[12rem] items-center justify-center gap-2 bg-teal px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-teal-deep whitespace-nowrap"
              >
                {t("hero.learn")}
              </a>
              <a
                href="#partners"
                className="inline-flex min-w-[12rem] items-center justify-center gap-2 border border-white/80 bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-navy whitespace-nowrap"
              >
                {t("hero.partners")}
              </a>
            </div>


            {/* Expandable pillar grid — titles only */}
            <ul className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-2xl">
              {[
                { Icon: Heart, title: t("involve.i1.title"), text: t("involve.i1.text") },
                { Icon: Gift, title: t("involve.i2.title"), text: t("involve.i2.text") },
                { Icon: Share2, title: t("involve.i3.title"), text: t("involve.i3.text") },
                { Icon: TrendingUp, title: t("involve.i4.title"), text: t("involve.i4.text") },
              ].map((p, i) => (
                <PillarTile key={i} index={i} Icon={p.Icon} title={p.title} text={p.text} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ ABOUT (Navy band, no cards) ============ */}
      <section id="about" className="bg-navy text-white py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4 flex flex-col gap-5">
              <Eyebrow light>{t("about.kicker")}</Eyebrow>
              <Rule light />
              <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {t("about.headline")}
              </h2>
            </div>
            <div className="md:col-span-8 md:border-l md:border-white/15 md:pl-12">
              <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                <span dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 md:gap-10">
            <VideoFrame label={t("about.video1")} />
            <VideoFrame label={t("about.video2")} />
          </div>
        </div>
      </section>

      {/* ============ PROGRAMS (alternating editorial list) ============ */}
      <section id="programs" className="bg-background py-28 sm:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>{t("programs.subheading")}</Eyebrow>
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("programs.headline")}
            </h2>
          </div>

          <ol className="mt-20 flex flex-col">
            {[
              { Icon: BookHeart, title: t("programs.p1.title"), text: t("programs.p1.text") },
              { Icon: HandHeart, title: t("programs.p2.title"), text: t("programs.p2.text") },
              { Icon: GraduationCap, title: t("programs.p3.title"), text: t("programs.p3.text") },
              { Icon: Megaphone, title: t("programs.p4.title"), text: t("programs.p4.text") },
            ].map(({ Icon, title, text }, i) => {
              const reverse = i % 2 === 1;
              return (
                <li
                  key={i}
                  className={`group grid items-start gap-6 border-t border-border py-12 md:grid-cols-12 md:gap-12 ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="md:col-span-4 flex items-center gap-4">
                    <span className="font-mono text-xs tracking-widest text-navy">
                      0{i + 1}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                    <Icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {text}
                    </p>
                  </div>
                </li>
              );
            })}
            <li className="border-t border-border" />
          </ol>
        </div>
      </section>

      {/* ============ INVOLVEMENT — full-width teal wash chapter ============ */}
      <section id="involve" className="bg-teal py-28 sm:py-36 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow light>{t("involve.headline")}</Eyebrow>
            <Rule light />
            <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("involve.headline")}
            </h2>
          </div>

          <ul className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {[
              { Icon: Heart, title: t("involve.i1.title"), text: t("involve.i1.text") },
              { Icon: Gift, title: t("involve.i2.title"), text: t("involve.i2.text") },
              { Icon: Share2, title: t("involve.i3.title"), text: t("involve.i3.text") },
              { Icon: TrendingUp, title: t("involve.i4.title"), text: t("involve.i4.text") },
            ].map(({ Icon, title, text }, i) => (
              <li key={i} className="flex gap-5 border-l border-white/30 pl-6">
                <div>
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/80">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <blockquote className="mx-auto mt-20 max-w-3xl text-center font-serif text-2xl italic leading-snug text-white sm:text-3xl">
            "{t("involve.callout")}"
          </blockquote>
        </div>
      </section>

      {/* ============ RESOLVED CASES ============ */}
      <section id="cases" className="bg-background py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>{t("cases.subheading")}</Eyebrow>
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("cases.headline")}
            </h2>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {RESOLVED_CASES.map((item, i) => (
              <CaseCard key={item.key} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ EVENTS ============ */}
      <section id="events" className="bg-navy text-white py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow light>{t("events.subheading")}</Eyebrow>
            <Rule light />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {t("events.headline")}
            </h2>
          </div>

          <article className="mt-20 grid border border-white/15 md:grid-cols-5">
            <div className="relative flex aspect-[16/10] items-center justify-center bg-white/5 md:col-span-2 md:aspect-auto">
              <ImageIcon className="h-12 w-12 text-white/40" strokeWidth={1.25} />
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12 md:col-span-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                {t("events.featuredTag")}
              </span>
              <h3 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                {t("events.featured.title")}
              </h3>
              <p className="text-base leading-relaxed text-white/75">{t("events.featured.desc")}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-white/70" /> {t("events.featured.date")}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-white/70" /> {t("events.featured.time")}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-white/70" /> {t("events.featured.location")}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ============ DONATE — Red reserved for final CTA ============ */}
      <section id="donate" className="bg-background py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>{t("donate.bankName")}</Eyebrow>
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("donate.headline")}
            </h2>
            <a
              href="https://gofundme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-accent-red px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              <Heart className="h-4 w-4" fill="currentColor" /> {t("donate.gofundme")}
            </a>
          </div>

          {/* Flat bank panel */}
          <article className="mt-16 border border-border p-8 sm:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-navy">{t("donate.bankName")}</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-navy">{bankAccount.bankName}</h3>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("donate.holder")}</dt>
                <dd className="mt-2 text-base text-navy">{bankAccount.holder}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("donate.swift")}</dt>
                <dd className="mt-2 font-mono text-base text-navy">{bankAccount.swift}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("donate.iban")}</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <code className="border border-border bg-secondary px-3 py-1.5 font-mono text-sm tracking-wide text-navy">
                    {bankAccount.iban}
                  </code>
                  <CopyIban iban={bankAccount.iban} />
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="bg-teal py-28 sm:py-36 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow light>{t("contact.headline")}</Eyebrow>
            <Rule light />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("contact.headline")}
            </h2>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            <div className="flex items-start gap-4 border-l border-white/30 pl-5">
              <Phone className="h-5 w-5 text-white" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">{t("contact.phoneLabel")}</p>
                <p className="mt-2 text-base text-white">—</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-l border-white/30 pl-5">
              <Mail className="h-5 w-5 text-white" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">{t("contact.emailLabel")}</p>
                <a href="mailto:brandonforever22legacy@gmail.com" className="mt-2 block break-all text-base text-white hover:text-white/80">
                  brandonforever22legacy@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/30 pt-8 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">{t("contact.socialLabel")}</span>
              <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-navy">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-navy">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-navy transition-colors hover:bg-white/90"
            >
              {t("contact.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <blockquote className="mx-auto mt-16 max-w-2xl text-center font-serif text-xl italic text-white sm:text-2xl">
            "{t("contact.calloutQuote")}"
          </blockquote>
        </div>
      </section>

      {/* ============ OUR PARTNERS ============ */}
      <section id="partners" className="bg-background py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>{t("partners.subheading")}</Eyebrow>
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("partners.headline")}
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 md:grid-cols-4">
            {[{ src: googleLogo, alt: "Google" }, ...Array.from({ length: 7 }, () => null)].map((partner, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center border-b border-r border-border bg-background text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-teal-wash"
              >
                {partner ? (
                  <img src={partner.src} alt={partner.alt} className="h-2/3 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
                ) : (
                  t("partners.placeholder")
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
