import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import bgMeadow from "@/assets/bg-meadow.png";
import bgForest from "@/assets/bg-forest.png";
import bgLake from "@/assets/bg-lake.png";
import logo from "@/assets/logo.png";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/history", label: "History" },
  { href: "/contact", label: "Contact" },
];

const BG_BY_PATH: Record<string, string> = {
  "/": bgMeadow,
  "/about": bgForest,
  "/services": bgMeadow,
  "/history": bgLake,
  "/contact": bgLake,
};

interface LayoutProps {
  children: ReactNode;
  /** When true, content area gets a translucent panel for legibility over the background. */
  panel?: boolean;
}

export function Layout({ children, panel = true }: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bg = BG_BY_PATH[location] ?? bgMeadow;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="relative min-h-screen w-full text-foreground">
      <AnimatePresence mode="wait">
        <motion.div
          key={bg}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="fixed inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden="true"
        />
      </AnimatePresence>
      {/* Subtle wash to keep text legible while keeping nature clearly visible */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/15 via-black/5 to-black/25" aria-hidden="true" />

      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-background/80 border-b border-border shadow-sm"
            : "backdrop-blur-sm bg-background/55 border-b border-white/20"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            data-testid="link-home-logo"
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="Ida & Stella's Nation Inc. logo"
              className="h-12 w-12 object-contain drop-shadow-sm"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-semibold text-foreground">
                Ida &amp; Stella's Nation
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Incorporated &middot; Non-Profit
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted hover-elevate"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur"
            >
              <div className="flex flex-col px-6 py-4 gap-1">
                {NAV.map((item) => {
                  const active = location === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      data-testid={`link-mobile-${item.label.toLowerCase()}`}
                      className={`rounded-md px-3 py-2 text-base font-medium transition-colors hover-elevate ${
                        active
                          ? "bg-secondary text-primary"
                          : "text-foreground/90"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        {panel ? (
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {children}
          </div>
        ) : (
          children
        )}
      </main>

      <footer className="relative z-10 mt-12 border-t border-white/20 bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Ida & Stella's Nation Inc. logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-serif text-base font-semibold">
                Ida &amp; Stella's Nation
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Aiding and assisting in restoring lives within our community and
              beyond &mdash; with love, knowledge, and the wisdom passed down by
              those who came before us.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-3">Visit</h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed">
              732 S 6th Street, #5976<br />
              Las Vegas, NV 89101
            </address>
            <p className="mt-2 text-sm text-muted-foreground">
              <a href="tel:+17752423734" className="hover:text-primary" data-testid="link-footer-phone">
                (775) 242-3734
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              <a
                href="mailto:IdaNStellasNationInc@gmail.com"
                className="hover:text-primary break-all"
                data-testid="link-footer-email"
              >
                IdaNStellasNationInc@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-3">Explore</h4>
            <ul className="space-y-1.5 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-testid={`link-footer-${item.label.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>
              &copy; {new Date().getFullYear()} Ida &amp; Stella's Nation Incorporated. All rights reserved.
            </span>
            <span className="italic">
              "Where there IS Love &amp; Restoration for our Nation."
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
