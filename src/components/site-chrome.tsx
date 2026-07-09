import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Languages, Home, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useT } from "@/lib/i18n";

const TikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82a4.28 4.28 0 0 1-3.77-4.32h-3.2v13.36a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-3.27a5.83 5.83 0 0 0-.78-.05 5.85 5.85 0 1 0 5.85 5.85V9.4a7.45 7.45 0 0 0 4.36 1.4V7.6a4.3 4.3 0 0 1-.64-.04 4.28 4.28 0 0 1-.0-1.74Z"/>
  </svg>
);

export const SOCIAL_LINKS = [
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61591257732228", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/brandonforever22legacy", label: "Instagram" },
  { Icon: TikTok, href: "https://www.tiktok.com/@brandon_forever22_legacy", label: "TikTok" },
  { Icon: Youtube, href: "https://www.youtube.com/@BrandonForever22Legacy", label: "YouTube" },
];


const SECTION_LINKS: { id: string; tKey: string }[] = [
  { id: "about", tKey: "nav.about" },
  { id: "cases", tKey: "nav.cases" },
  { id: "events", tKey: "nav.events" },
  { id: "partners", tKey: "nav.partners" },
  { id: "contact", tKey: "nav.contact" },
];

export function SiteHeader() {
  const { lang, setLang, t } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionClick = (e: React.MouseEvent, id: string) => {
    if (onHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const handleDonateClick = (e: React.MouseEvent) => {
    if (onHome) {
      e.preventDefault();
      const el = document.getElementById("donate");
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={handleHomeClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          aria-label={t("nav.home")}
        >
          <Home className="h-5 w-5" />
        </Link>

        {/* Desktop section nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {SECTION_LINKS.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              onClick={(e) => handleSectionClick(e, s.id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(s.tKey)}
            </a>
          ))}
          <Link
            to="/contact"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            {t("nav.volunteer")}
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

          <div className="hidden items-center gap-1 sm:flex">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setLang(lang === "en" ? "sq" : "en")}
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Change language"
          >
            <Languages className="h-3.5 w-3.5" />
            {t("nav.lang")}
          </button>

          <a
            href="#donate"
            onClick={handleDonateClick}
            className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-accent-red px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110 sm:px-4"
          >
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
            <span className="hidden xs:inline sm:inline">{t("nav.donate")}</span>
          </a>


          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden ml-1 flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {SECTION_LINKS.map((s) => (
              <a
                key={s.id}
                href={`/#${s.id}`}
                onClick={(e) => handleSectionClick(e, s.id)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {t(s.tKey)}
              </a>
            ))}
            <Link
              to="/contact"
              className="rounded-md px-3 py-3 text-base font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {t("nav.volunteer")}
            </Link>
            <div className="mt-2 flex items-center gap-2 border-t border-border/60 px-3 pt-3 pb-2 sm:hidden">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t("footer.addressLabel")}: </span>
          {t("footer.address")}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t("footer.phoneLabel")}: </span>
          <a href="tel:+355698028222" className="hover:text-primary">+355 69 802 8222</a>
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t("footer.emailLabel")}: </span>
          <a href="mailto:brandonforever22legacy@gmail.com" className="hover:text-primary">brandonforever22legacy@gmail.com</a>
        </p>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("footer.org")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
