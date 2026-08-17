import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  MessageCircleHeart,
  Gamepad2,
  Apple,
  GraduationCap,
  Languages,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Mascot } from "./Mascot";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", labelKey: "navHome", Icon: Home },
  { to: "/chat", labelKey: "navChat", Icon: MessageCircleHeart },
  { to: "/game", labelKey: "navGame", Icon: Gamepad2 },
  { to: "/food", labelKey: "navFood", Icon: Apple },
  { to: "/learn", labelKey: "navLearn", Icon: GraduationCap },
] as const;

export function AppShell({
  title,
  subtitle,
  variant = "child",
  children,
}: {
  title?: string;
  subtitle?: string;
  variant?: "child" | "parent";
  children: ReactNode;
}) {
  const { t, toggleLang, lang } = useI18n();
  const { state, level } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col pb-24">
      <header
        className={cn(
          "sticky top-0 z-20 px-4 pt-5 pb-4 backdrop-blur-md",
          variant === "parent" ? "bg-card/90" : "bg-background/80",
        )}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Mascot size="sm" priority />
            <div className="leading-tight">
              <p className="font-display text-lg font-bold text-foreground">{t("appName")}</p>
              <p className="text-[11px] text-muted-foreground">
                {variant === "parent" ? t("parentMode") : t("childMode")}
              </p>
            </div>
          </Link>
          <div className="ms-auto flex items-center gap-2">
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
              ⭐ {state.points}
            </span>
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Switch language"
              className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-bold text-foreground transition-transform active:scale-95"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "AR" : "EN"}
            </button>
          </div>
        </div>
        {title ? (
          <div className="mt-4">
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
        ) : null}
      </header>

      <main className="flex-1 space-y-4 px-4">{children}</main>

      <div className="px-4 pt-6">
        <p className="flex items-start gap-2 rounded-2xl bg-muted/70 p-3 text-[11px] leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          {t("disclaimer")}
        </p>
        <div className="mt-3 flex justify-center gap-4 text-xs">
          <Link to="/plan" className="font-semibold text-primary underline-offset-4 hover:underline">
            {t("myPlan")}
          </Link>
          <Link
            to="/parent"
            className="flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
          >
            <Users className="h-3.5 w-3.5" /> {t("navParent")}
          </Link>
        </div>
      </div>

      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 px-2 pb-2 pt-1.5 backdrop-blur">
        <ul className="flex items-center justify-between">
          {tabs.map(({ to, labelKey, Icon }) => {
            const active = pathname === to;
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition-colors",
                    active ? "bg-secondary text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {t(labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}