import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Languages, Home } from "lucide-react";
import { useT } from "@/lib/i18n";

export const SOCIAL_LINKS = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const SECTION_LINKS: { key: "nav.about" | "nav.programs" | "nav.events" | "nav.partners" | "nav.contact"; hash: string }[] = [
  { key: "nav.about", hash: "about" },
  { key: "nav.programs", hash: "programs" },
  { key: "nav.events", hash: "events" },
  { key: "nav.partners", hash: "partners" },
  { key: "nav.contact", hash: "contact" },
];

export function SiteHeader() {
  const { lang, setLang, t } = useT();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const goToSection = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `/#${hash}`);
    } else {
      router.navigate({ to: "/", hash });
    }
  };

  const goHome = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "/");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={goHome}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          aria-label={t("nav.home")}
        >
          <Home className="h-5 w-5" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {SECTION_LINKS.map(({ key, hash }) => (
            <a
              key={hash}
              href={`/#${hash}`}
              onClick={goToSection(hash)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="/#donate"
            onClick={goToSection("donate")}
            className="inline-flex items-center justify-center rounded-md bg-[#d11f1f] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#b81818] sm:px-4 sm:text-sm"
          >
            {t("nav.donate")}
          </a>

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
        </nav>
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
