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

const WAVE_COLOR = "#0b2545";

// Single, centralized bank card data
const bankAccount = { bankName: "Bank Name", holder: "Account Holder", iban: "IBAN", swift: "SWIFT / BIC" };

// Future-proof resolved cases. Add/edit/remove items here.
// youtubeId: paste the YouTube video id (e.g. "dQw4w9WgXcQ"). Leave empty to keep placeholder.
type CaseItem = { key: string; youtubeId: string; image?: string };
const RESOLVED_CASES: CaseItem[] = [
  { key: "article1", youtubeId: "" },
  { key: "article2", youtubeId: "" },
  { key: "article3", youtubeId: "" },
];




function WaveUp({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`block h-20 min-h-[64px] w-full sm:h-28 md:h-32 ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,80 C240,0 480,120 720,80 C960,40 1200,0 1440,80 L1440,0 L0,0 Z"
        fill={WAVE_COLOR}
      />
    </svg>
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[var(--shadow-elevated)]">
      <div className="flex flex-col items-center gap-3 text-white/80">
        <PlayCircle className="h-14 w-14 text-white" strokeWidth={1.5} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}

function CaseCard({ item }: { item: CaseItem }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const title = t(`cases.${item.key}.title`);
  const excerpt = t(`cases.${item.key}.excerpt`);
  const body = t(`cases.${item.key}.body`);

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex aspect-[16/10] w-full items-center justify-center bg-secondary/60"
          aria-label={title}
        >
          {item.image ? (
            <img src={item.image} alt={title} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground/60" strokeWidth={1.5} />
          )}
        </button>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline"
          >
            {t("cases.readMore")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl">{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-secondary/60">
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
                <PlayCircle className="h-14 w-14 text-primary/70" strokeWidth={1.5} />
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
        className="group flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-[#0b2545]/85 p-4 text-left text-white shadow-[var(--shadow-elevated)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/40"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
            <span
              aria-hidden="true"
              className={`text-white/70 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`grid transition-all duration-300 ease-out ${
              open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="overflow-hidden text-xs leading-relaxed text-white/85">{text}</p>
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

      {/* HERO — split layout */}
      <section className="relative overflow-hidden min-h-screen px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-24">
        <Link
          to="/"
          className="absolute left-4 top-20 z-20 flex items-center justify-center transition duration-300 hover:scale-[1.03] sm:top-24 md:left-[46px] md:top-[32px]"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto object-contain sm:h-28 md:h-64 lg:h-80"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={brandonPortraitMobile} />
            <img
              src={brandonPortrait}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-slate-950/55" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col justify-center md:mx-0 md:ml-[5%] md:max-w-[65%] md:pr-8">
          {/* LEFT: text content */}
          <div className="animate-fade-up flex flex-col text-center md:text-left text-white">
            <h1 className="mt-32 font-serif text-3xl font-bold leading-[1.1] text-white sm:mt-44 sm:text-5xl md:mt-72 md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:mx-0 md:mt-6 md:text-lg">
              <span dangerouslySetInnerHTML={{ __html: t("hero.subtitle") }} />
            </p>
            <p className="mt-6 font-serif text-xl font-semibold uppercase tracking-[0.18em] text-white sm:mt-8 sm:text-3xl md:text-4xl">
              {t("hero.slogan")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <a
                href="https://gofundme.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold tracking-wider text-white shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-0.5 hover:brightness-110 whitespace-nowrap"
                style={{ backgroundColor: "#c8102e" }}
              >
                <Heart className="h-4 w-4" fill="currentColor" /> {t("hero.donate")}
              </a>
              <a
                href="#about"
                className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold tracking-wider text-white transition-all hover:-translate-y-0.5 hover:brightness-110 whitespace-nowrap"
                style={{ backgroundColor: "#0e6b66" }}
              >
                {t("hero.learn")}
              </a>
              <a
                href="#partners"
                className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-md border-2 border-white bg-transparent px-6 py-3.5 text-sm font-semibold tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 whitespace-nowrap"
              >
                {t("hero.partners")}
              </a>
            </div>

            {/* Expandable pillar grid — titles only, click to reveal */}
            <ul className="mt-8 grid w-full grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 md:max-w-2xl">
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

      {/* ABOUT (dark blue band) */}
      <section id="about" style={{ backgroundColor: WAVE_COLOR }} className="text-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl text-white">{t("about.kicker")}</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl text-white/70">
              {t("about.headline")}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
              <span dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            <VideoPlaceholder label={t("about.video1")} />
            <VideoPlaceholder label={t("about.video2")} />
          </div>
        </div>
      </section>

      {/* Wave transition out of dark blue band */}
      <div className="bg-secondary/40 leading-[0]">
        <WaveUp />
      </div>

      {/* PROGRAMS */}
      <section id="programs" className="bg-secondary/40 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("programs.headline")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{t("programs.subheading")}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:gap-8">
            {[
              { Icon: BookHeart, title: t("programs.p1.title"), text: t("programs.p1.text") },
              { Icon: HandHeart, title: t("programs.p2.title"), text: t("programs.p2.text") },
              { Icon: GraduationCap, title: t("programs.p3.title"), text: t("programs.p3.text") },
              { Icon: Megaphone, title: t("programs.p4.title"), text: t("programs.p4.text") },
            ].map(({ Icon, title, text }, i) => (
              <article
                key={i}
                className="group rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INVOLVEMENT PILLARS */}
      <section id="involve" className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("involve.headline")}</h2>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {[
              { Icon: Heart, title: t("involve.i1.title"), text: t("involve.i1.text") },
              { Icon: Gift, title: t("involve.i2.title"), text: t("involve.i2.text") },
              { Icon: Share2, title: t("involve.i3.title"), text: t("involve.i3.text") },
              { Icon: TrendingUp, title: t("involve.i4.title"), text: t("involve.i4.text") },
            ].map(({ Icon, title, text }, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Notebook-style callout */}
          <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl border-l-4 border-primary bg-[repeating-linear-gradient(transparent,transparent_31px,hsl(var(--border))_31px,hsl(var(--border))_32px)] bg-card p-8 shadow-[var(--shadow-card)] sm:p-10">
            <p className="font-serif text-lg italic leading-loose text-foreground sm:text-xl">
              {t("involve.callout")}
            </p>
          </div>
        </div>
      </section>

      {/* RESOLVED CASES */}
      <section id="cases" className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("cases.headline")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{t("cases.subheading")}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {RESOLVED_CASES.map((item) => (
              <CaseCard key={item.key} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="border-t border-border bg-secondary/30 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("events.headline")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{t("events.subheading")}</p>
          </div>

          {/* Featured event */}
          <article className="mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] md:grid md:grid-cols-5">
            <div className="relative flex aspect-[16/10] items-center justify-center bg-secondary/60 md:col-span-2 md:aspect-auto">
              <ImageIcon className="h-12 w-12 text-muted-foreground/60" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 sm:p-10 md:col-span-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {t("events.featuredTag")}
              </span>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">{t("events.featured.title")}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{t("events.featured.desc")}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {t("events.featured.date")}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {t("events.featured.time")}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {t("events.featured.location")}</span>
              </div>
            </div>
          </article>

          {/* Upcoming list */}
          <h3 className="mt-16 text-center text-2xl font-bold sm:text-3xl">{t("events.upcoming")}</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <article
                key={n}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Calendar className="h-4 w-4" /> {t(`events.e${n}.date`)}
                </div>
                <h4 className="mt-3 text-xl font-semibold text-foreground">{t(`events.e${n}.title`)}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(`events.e${n}.desc`)}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> {t(`events.e${n}.location`)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="border-t border-border bg-secondary/40 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("donate.headline")}</h2>
            <a
              href="https://gofundme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <Heart className="h-4 w-4" /> {t("donate.gofundme")}
            </a>
          </div>

          {/* Single, centralized bank card */}
          <article className="group relative mx-auto mt-12 overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] sm:p-10">
            <div className="absolute inset-x-0 top-0 h-1" style={{ background: "var(--gradient-primary)" }} />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("donate.bankName")}</p>
            <h3 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">{bankAccount.bankName}</h3>

            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("donate.holder")}</dt>
                <dd className="mt-1 text-base text-foreground">{bankAccount.holder}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("donate.iban")}</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-3">
                  <code className="rounded-md bg-secondary px-2.5 py-1.5 font-mono text-sm tracking-wide text-foreground">
                    {bankAccount.iban}
                  </code>
                  <CopyIban iban={bankAccount.iban} />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("donate.swift")}</dt>
                <dd className="mt-1 font-mono text-base text-foreground">{bankAccount.swift}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-secondary/40 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("contact.headline")}</h2>
          </div>

          <div className="mx-auto mt-12 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("contact.phoneLabel")}</p>
                  <p className="mt-1 text-base text-muted-foreground">—</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("contact.emailLabel")}</p>
                  <a href="mailto:brandonforever22legacy@gmail.com" className="mt-1 block break-all text-base text-foreground hover:text-primary">
                    brandonforever22legacy@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{t("contact.socialLabel")}:</span>
                <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("contact.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <blockquote className="mx-auto mt-10 max-w-2xl text-center font-serif text-lg italic text-primary sm:text-xl">
            "{t("contact.calloutQuote")}"
          </blockquote>
        </div>
      </section>



      {/* OUR PARTNERS */}
      <section id="partners" className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{t("partners.headline")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{t("partners.subheading")}</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
            {[{ src: googleLogo, alt: "Google" }, ...Array.from({ length: 7 }, () => null)].map((partner, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-card text-sm text-muted-foreground shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                {partner ? (
                  <img src={partner.src} alt={partner.alt} className="h-3/4 w-auto object-contain" />
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
