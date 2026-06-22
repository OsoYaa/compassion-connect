import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Copy, Check, ArrowRight, Mic, BookHeart, HandHeart,
  GraduationCap, Phone, Mail, Heart, ImageIcon,
  ChevronDown, Sparkles, Telescope, Crosshair,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import brandonPortrait from "@/assets/unnamed.jpg";
import brandonPortraitMobile from "@/assets/brandon-portrait-mobile.jpg";
// import googleLogo from "@/assets/google transparent.png"; // hidden — Google partner removed
// Partner logos
import bashkiaTiraneLogo from "@/assets/partners/bashkia-tirane-njesite.png";
import bashkiaDurresLogo from "@/assets/partners/bashkia-durres.png";
import bashkiaElbasanLogo from "@/assets/partners/bashkia-elbasan.png";
import bashkiaKamezLogo from "@/assets/partners/bashkia-kamez.png";
import bashkiaCerrikLogo from "@/assets/partners/bashkia-cerrik-2.jpg";
import bashkiaGramshLogo from "@/assets/partners/bashkia-gramsh-2.png";
import bashkiaBelshLogo from "@/assets/partners/bashkia-belsh.png";
import strehheShpreseLogo from "@/assets/partners/strehe-shprese-2.jpg";
import eventi1Image from "@/assets/events/eventi-1-xheko.png";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader, SiteFooter, SOCIAL_LINKS } from "@/components/site-chrome";
import { useT } from "@/lib/i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  component: Index,
});

const bankAccount = { bankName: "Bank Name", holder: "Account Holder", iban: "IBAN", swift: "SWIFT / BIC" };

// Replace IDs with real YouTube video IDs. First entry is the featured (main)
// video, the rest are shown under "Previous videos" (capped at 10 older items).
const HUMAN_STORY_VIDEOS: string[] = ["NpEaa2P7qZI", "NpEaa2P7qZI", "NpEaa2P7qZI", "NpEaa2P7qZI", "NpEaa2P7qZI"];
const PODCAST_VIDEOS: string[] = ["NpEaa2P7qZI", "NpEaa2P7qZI", "NpEaa2P7qZI", "NpEaa2P7qZI", "NpEaa2P7qZI"];
const MAX_PREVIOUS_VIDEOS = 10;

// Tiny shared atoms ----------------------------------------------------------

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-block text-base font-semibold uppercase tracking-[0.06em] ${
        light ? "text-white/80" : "text-navy"
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function VideoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-border bg-secondary">
      {id ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-navy/50">
          <ImageIcon className="h-10 w-10" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}

function VideoCategory({ title, videos }: { title: string; videos: string[] }) {
  const { t } = useT();
  const [expanded, setExpanded] = useState(false);
  const [featured, ...rest] = videos;
  const previous = rest.slice(0, MAX_PREVIOUS_VIDEOS);

  return (
    <div>
      <h3 className="font-serif text-2xl font-semibold text-navy sm:text-3xl">{title}</h3>

      {/* Featured video */}
      <div className="mt-6">
        <VideoEmbed id={featured ?? ""} title={`${title} — ${t("cases.featured")}`} />
      </div>

      {previous.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="mt-6 inline-flex items-center gap-2 border-b border-navy/40 pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-navy transition-colors hover:border-navy"
          >
            {expanded ? t("cases.seeLess") : t("cases.previousVideos")}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>

          <div
            className={`grid transition-all duration-500 ease-out ${
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {previous.map((id, i) => (
                  <VideoEmbed key={i} id={id} title={`${title} ${i + 2}`} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============= EVENTS / ARTICLES =============
type EventArticle = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  isFeatured?: boolean;
};

function EventArticleCard({
  article,
  onOpen,
  compact = false,
}: {
  article: EventArticle;
  onOpen: () => void;
  compact?: boolean;
}) {
  const { t } = useT();
  if (compact) {
    return (
      <article className="flex flex-col border border-white/20 bg-white/[0.04]">
        <div className="relative flex items-center justify-center bg-white/[0.06] overflow-hidden w-full max-w-[600px]">
          {article.image ? (
            <img src={article.image} alt={article.title} className="w-full h-auto object-contain" />
          ) : (
            <ImageIcon className="h-10 w-10 text-white/70" strokeWidth={1.25} />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-serif text-xl font-semibold leading-snug text-white">{article.title}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-white/85">{article.excerpt}</p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-auto inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-white/80"
          >
            {t("events.readMore")} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </article>
    );
  }
  return (
    <article className="grid items-start border border-white/20 md:grid-cols-[minmax(0,48%)_minmax(0,1fr)] lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)]">
      <div className="relative flex items-center justify-center overflow-hidden w-full self-start bg-white/[0.03]">
        {article.image ? (
          <img src={article.image} alt={article.title} className="w-full h-auto object-contain" />
        ) : (
          <ImageIcon className="h-12 w-12 text-white/70" strokeWidth={1.25} />
        )}
      </div>
      <div className="flex flex-col justify-between gap-4 p-6 md:p-5 lg:p-6">
        <h3 className="font-serif text-2xl font-semibold leading-tight text-white lg:text-[1.9rem]">
          {article.title}
        </h3>
        <p className="text-base leading-relaxed text-white/85 lg:text-[1.05rem]">{article.excerpt}</p>
        {(article.date || article.time || article.location) && (
          <div className="flex flex-wrap gap-3 text-sm text-white/70 lg:gap-4 lg:text-base">
            {article.date && <span>{article.date}</span>}
            {article.time && <span>{article.time}</span>}
            {article.location && <span>{article.location}</span>}
          </div>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="mt-2 inline-flex items-center gap-2 self-start bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-teal transition-colors hover:bg-white/90"
        >
          {t("events.readMore")} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function EventsSection() {
  const { t } = useT();
  const [expanded, setExpanded] = useState(false);
  const [openArticle, setOpenArticle] = useState<EventArticle | null>(null);

  const featured: EventArticle = {
    id: "featured",
    title: t("events.featured.title"),
    excerpt: t("events.featured.desc"),
    body: t("events.featured.body"),
    date: t("events.featured.date"),
    time: t("events.featured.time"),
    location: t("events.featured.location"),
    image: eventi1Image,
    isFeatured: true,
  };

  // Placeholder older articles — replace with real ones later.
  const placeholders: EventArticle[] = Array.from({ length: 4 }, (_, i) => ({
    id: `placeholder-${i}`,
    title: t("events.placeholder.title"),
    excerpt: t("events.placeholder.excerpt"),
    body: t("events.placeholder.body"),
  }));

  return (
    <section id="events" className="bg-teal py-28 sm:py-36 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <Rule light />
          <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("events.headline")}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t("events.subheading")}
          </p>
        </div>

        <div className="mt-20">
          <EventArticleCard article={featured} onOpen={() => setOpenArticle(featured)} />
        </div>

        <div
          className={`grid transition-all duration-500 ease-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {placeholders.map((a) => (
                <EventArticleCard key={a.id} article={a} compact onOpen={() => setOpenArticle(a)} />
              ))}
            </div>
          </div>
        </div>

        {/* Hidden: "Shiko më shumë evente" button — uncomment to restore
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
          >
            {expanded ? t("events.seeLess") : t("events.seeMore")}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
        */}

        <Dialog open={!!openArticle} onOpenChange={(o) => !o && setOpenArticle(null)}>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl sm:text-3xl">
                {openArticle?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full max-w-[600px] overflow-hidden mx-auto">
              {openArticle?.image ? (
                <img src={openArticle.image} alt={openArticle.title} className="w-full h-auto object-contain" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-navy/50">
                  <ImageIcon className="h-12 w-12" strokeWidth={1.25} />
                </div>
              )}
            </div>
            <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-foreground">
              {openArticle?.body}
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
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
            className="h-[16.3rem] w-auto object-contain sm:h-[19.2rem] md:h-46 lg:h-[13rem]"
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
          {/* Navy wash for contrast (mobile: full) */}
          <div className="absolute inset-0 bg-navy/65 md:hidden" />
          {/* Desktop: navy wash that fades out toward the right side */}
          <div
            className="absolute inset-0 hidden bg-navy/65 md:block"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 30%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, black 0%, black 30%, transparent 100%)",
            }}
          />
          {/* Smooth fade into next (navy) section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--navy)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-4xl flex-col justify-center md:mx-0 md:ml-[2%] md:max-w-[65%] md:justify-start md:pt-[13rem] lg:pt-[15rem] md:pr-8">
          <div className="animate-fade-up flex flex-col text-center md:text-left text-white">
            <h1 className="mt-[14.5rem] font-serif text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:mt-[17.5rem] sm:text-5xl md:mt-0 md:text-6xl">
              <span className="block whitespace-nowrap sm:whitespace-normal" dangerouslySetInnerHTML={{ __html: t("hero.title.l1") }} />
              <span className="block whitespace-nowrap sm:whitespace-normal" dangerouslySetInnerHTML={{ __html: t("hero.title.l2") }} />
              <span className="block" dangerouslySetInnerHTML={{ __html: t("hero.title.l3") }} />
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:mx-0 md:text-lg">
              <span dangerouslySetInnerHTML={{ __html: t("hero.subtitle") }} />
            </p>

            {/* Three primary actions */}
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

            <p className="mt-10 font-serif text-lg italic tracking-[0.04em] text-white/90 sm:text-xl md:text-2xl">
              <span dangerouslySetInnerHTML={{ __html: t("hero.slogan") }} />
            </p>

          </div>
        </div>
      </section>

      {/* ============ ABOUT (Navy band, no cards) ============ */}
      <section id="about" className="bg-navy text-white py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          {/* Full-width header */}
          <div className="flex flex-col gap-5">
            <Rule light />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {t("about.headline")}
            </h2>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/15">
            {/* Left: intro */}
            <div className="flex flex-col gap-6 lg:pr-12">
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                <span dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
              </p>
            </div>

            {/* Right: mission / vision / focus + quote */}
            <div className="flex flex-col gap-7 lg:pl-12">
              {[
                { Icon: Sparkles, title: t("about.misioni.title"), text: t("about.misioni.text") },
                { Icon: Telescope, title: t("about.vizioni.title"), text: t("about.vizioni.text") },
                { Icon: Crosshair, title: t("about.fokusi.title"), text: t("about.fokusi.text") },
              ].map(({ Icon, title, text }, i) => (
                <div key={i} className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white">{title}</h3>
                    <p
                      className="mt-1 text-sm leading-relaxed text-white/85 sm:text-base"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </div>
                </div>
              ))}
              <blockquote className="mt-2 border-l-2 border-gold pl-4 font-serif text-lg italic text-white/90 sm:text-xl">
                "{t("about.quote")}"
              </blockquote>
            </div>
          </div>

          {/* Videos: Himni & Historia e Brandon-it (textless, aligned with columns above) */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-12">
              <VideoEmbed id="eOXhzgdP134" title={t("about.video1")} />
            </div>
            {/* Hidden: "Historia e Brandon-it" video — uncomment to restore
            <div className="lg:pl-12">
              <VideoEmbed id="" title={t("about.video2")} />
            </div>
            */}
          </div>
        </div>
      </section>

      {/* ============ PROGRAMI (flush divider between About and Multimedia) ============ */}
      <section id="programs" className="bg-secondary border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              {t("programs.headline")}
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("programs.subheading")}
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: BookHeart, title: t("programs.p2.title"), text: t("programs.p2.text") },
              { Icon: HandHeart, title: t("programs.p3.title"), text: t("programs.p3.text") },
              { Icon: Mic, title: t("programs.p1.title"), text: t("programs.p1.text") },
              { Icon: GraduationCap, title: t("programs.p4.title"), text: t("programs.p4.text") },
            ].map(({ Icon, title, text }, i) => (
              <li key={i} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-serif text-base font-semibold leading-snug text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ============ MULTIMEDIA (hidden — uncomment to restore) ============
      <section id="cases" className="bg-background py-28 sm:py-36 text-navy">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("cases.headline")}
            </h2>
            <p className="mt-4 font-serif text-xl italic text-navy/80 sm:text-2xl">
              {t("cases.tagline")}
            </p>
          </div>

          <div className="mt-16 grid gap-16 md:grid-cols-2">
            <VideoCategory title={t("cases.cat1.title")} videos={HUMAN_STORY_VIDEOS} />
            <VideoCategory title={t("cases.cat2.title")} videos={PODCAST_VIDEOS} />
          </div>
        </div>
      </section>
      */}

      {/* ============ EVENTS ============ */}
      <EventsSection />

      {/* ============ CONTACT ============ */}
      <section id="contact" className="bg-background py-28 sm:py-36">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("nav.contact")}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("contact.intro")}</p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            <div className="flex items-start gap-4 border-l border-border pl-5">
              <Phone className="h-5 w-5 text-navy" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.phoneLabel")}</p>
                <a href="tel:+355698028222" className="mt-2 block text-base text-navy hover:text-navy/80">+355 69 802 8222</a>
              </div>
            </div>
            <div className="flex items-start gap-4 border-l border-border pl-5">
              <Mail className="h-5 w-5 text-navy" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.emailLabel")}</p>
                <a href="mailto:brandonforever22legacy@gmail.com" className="mt-2 block break-all text-base text-navy hover:text-navy/80">
                  brandonforever22legacy@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{t("contact.socialLabel")}</span>
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-border text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-teal px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-teal-deep"
            >
              {t("contact.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <blockquote className="mx-auto mt-16 max-w-2xl text-center font-serif text-xl font-bold italic text-navy sm:text-2xl">
            "{t("contact.calloutQuote")}"
          </blockquote>
        </div>
      </section>

      {/* ============ DONATE ============ */}
      <section id="donate" className="bg-navy text-white py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("donate.headline")}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {t("donate.intro")}
            </p>
            <p className="mt-4 font-serif text-5xl italic text-gold sm:text-4xl">
              "{t("donate.quote")}"
            </p>
            <blockquote className="font-handwriting mt-6 text-2xl text-white/90 sm:text-3xl">
              {t("donate.tagline")}
            </blockquote>
            {/* Hidden: "Dhuro në GoFundMe" button — uncomment to restore
            <a
              href="https://gofundme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-accent-red px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              <Heart className="h-4 w-4" fill="currentColor" /> {t("donate.gofundme")}
            </a>
            */}
            <p className="font-handwriting mt-6 text-2xl text-white/90 sm:text-3xl">
              {t("donate.thanks")}
            </p>
          </div>

          {/* Hidden: bank details panel — uncomment to restore
          <article className="mt-16 border border-white/15 bg-white/[0.04] p-8 sm:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">{t("donate.bankName")}</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-white">{bankAccount.bankName}</h3>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">{t("donate.holder")}</dt>
                <dd className="mt-2 text-base text-white">{bankAccount.holder}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">{t("donate.swift")}</dt>
                <dd className="mt-2 font-mono text-base text-white">{bankAccount.swift}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">{t("donate.iban")}</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <code className="border border-white/20 bg-white/[0.06] px-3 py-1.5 font-mono text-sm tracking-wide text-white">
                    {bankAccount.iban}
                  </code>
                  <CopyIban iban={bankAccount.iban} />
                </dd>
              </div>
            </dl>
          </article>
          */}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-border" />
      </div>

      {/* ============ OUR PARTNERS ============ */}
      <section id="partners" className="bg-white py-28 sm:py-36 text-navy">

        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <Rule />
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {t("partners.headline")}
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4 md:gap-16">
            {[
              { src: bashkiaTiraneLogo, alt: "Bashkia Tiranë — Njësitë 1-14" },
              { src: bashkiaDurresLogo, alt: "Bashkia Durrës" },
              { src: bashkiaElbasanLogo, alt: "Bashkia Elbasan" },
              { src: bashkiaKamezLogo, alt: "Bashkia Kamëz" },
              { src: bashkiaCerrikLogo, alt: "Bashkia Cërrik" },
              { src: bashkiaGramshLogo, alt: "Bashkia Gramsh" },
              { src: bashkiaBelshLogo, alt: "Bashkia Belsh" },
              { src: strehheShpreseLogo, alt: "Strehë & Shpresë — Shtëpia e të Moshuarve" },
            ].map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-4 py-6 text-xs uppercase tracking-[0.2em] text-navy/60"
              >
                {partner ? (
                  <img src={partner.src} alt={partner.alt} className="h-28 w-auto object-contain sm:h-36" />
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
