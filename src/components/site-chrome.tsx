import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Languages, Home, Heart } from "lucide-react";
import { useT } from "@/lib/i18n";

export const SOCIAL_LINKS = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const SECTION_LINKS: { id: string; tKey: string }[] = [
  { id: "about", tKey: "nav.about" },
  { id: "programs", tKey: "nav.programs" },
  { id: "cases", tKey: "nav.cases" },
  { id: "events", tKey: "nav.events" },
  { id: "partners", tKey: "nav.partners" },
  { id: "contact", tKey: "nav.contact" },
];

export function SiteHeader() {
  const { lang, setLang, t } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

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
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile-only contact link */}
          <Link
            to="/contact"
            className="lg:hidden rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "lg:hidden rounded-md px-3 py-2 text-sm font-medium text-primary" }}
          >
            {t("nav.contact")}
          </Link>

          <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

          <div className="hidden items-center gap-1 sm:flex">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
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
            href="/#donate"
            onClick={(e) => handleSectionClick(e, "donate")}
            className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-accent-red px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110 sm:px-4"
          >
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
            <span className="hidden xs:inline sm:inline">{t("nav.donate")}</span>
          </a>
        </div>
      </div>
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
          <span className="font-medium text-foreground">{t("footer.emailLabel")}: </span>
          <a href="mailto:brandonforever22legacy@gmail.com" className="hover:text-primary">brandonforever22legacy@gmail.com</a>
        </p>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
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
