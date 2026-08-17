import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircleHeart, Gamepad2, Apple, Sparkles, HeartHandshake } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BuddySays, Mascot } from "@/components/Mascot";
import { GlucoseCard } from "@/components/GlucoseCard";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { scenarioOrder, scenarios } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SugarBuddy — AI glucose learning buddy for kids" },
      {
        name: "description",
        content:
          "SugarBuddy helps children understand glucose readings, trends and food choices with an AI companion, games and personalized lessons.",
      },
      { property: "og:title", content: "SugarBuddy — AI glucose learning buddy for kids" },
      {
        property: "og:description",
        content:
          "SugarBuddy helps children understand glucose readings, trends and food choices with an AI companion, games and personalized lessons.",
      },
    ],
  }),
  component: Index,
});

const scenarioLabelKey: Record<string, string> = {
  stable: "scStable",
  rising: "scRising",
  falling: "scFalling",
  low: "scLow",
  high: "scHigh",
};

function Index() {
  const { t, tr, lang } = useI18n();
  const { state, setScenario, level } = useStore();
  const [showMeaning, setShowMeaning] = useState(false);
  const sc = scenarios[state.scenario];
  const needsPlan = sc.tone !== "stable" && (state.scenario === "low" || state.scenario === "high");
  const goal = Math.min(100, Math.round((state.questionsToday / 5) * 100));

  return (
    <AppShell>
      <section className="flex items-center gap-3 rounded-3xl gradient-primary p-4 text-primary-foreground">
        <Mascot size="md" priority className="shrink-0" />
        <div>
          <p className="font-display text-xl font-bold">{t("hiThere")}</p>
          <p className="text-sm opacity-90">{t("tagline")}</p>
          <p className="mt-1 text-xs font-bold">
            {t("detectiveGame")} — {t("level")} {level}
          </p>
        </div>
      </section>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {t("demoScenarios")}
        </p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {scenarioOrder.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setScenario(key);
                setShowMeaning(false);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-transform active:scale-95 ${
                state.scenario === key
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {t(scenarioLabelKey[key]!)}
            </button>
          ))}
        </div>
      </div>

      <GlucoseCard scenarioKey={state.scenario} />

      <button
        type="button"
        onClick={() => setShowMeaning((v) => !v)}
        className="w-full rounded-2xl bg-secondary py-3 font-display font-bold text-secondary-foreground transition-transform active:scale-95"
      >
        {t("whatDoesThisMean")}
      </button>

      {showMeaning ? <BuddySays size="sm">{tr(sc.meaning)}</BuddySays> : null}

      {needsPlan ? (
        <section className="rounded-3xl bg-warning/25 p-4">
          <p className="flex items-center gap-2 font-display font-bold text-warning-foreground">
            <HeartHandshake className="h-4 w-4" />
            {lang === "en" ? "This is a plan moment" : "هذه لحظة تتبع فيها خطتك"}
          </p>
          <p className="mt-1 text-sm text-warning-foreground">
            {lang === "en"
              ? "Open your own plan and tell your parent or caregiver. SugarBuddy never decides treatment."
              : "افتح خطتك الخاصة وأخبر والديك أو من يعتني بك. شوقر بادي لا يقرر العلاج أبداً."}
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              to="/plan"
              className="flex-1 rounded-2xl bg-card py-2.5 text-center text-sm font-bold text-primary"
            >
              {t("checkPlan")}
            </Link>
            <span className="flex-1 rounded-2xl bg-card py-2.5 text-center text-sm font-bold text-primary">
              {t("tellGrownUp")}
            </span>
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        {[
          { to: "/chat" as const, label: t("askAi"), Icon: MessageCircleHeart, emoji: "🤖" },
          { to: "/game" as const, label: t("learnAndPlay"), Icon: Gamepad2, emoji: "🕵️" },
          { to: "/food" as const, label: t("foodExplorer"), Icon: Apple, emoji: "🍎" },
          { to: "/learn" as const, label: t("myLearning"), Icon: Sparkles, emoji: "⭐" },
        ].map(({ to, label, Icon, emoji }) => (
          <Link
            key={to}
            to={to}
            className="card-soft flex flex-col gap-2 p-4 transition-transform active:scale-95"
          >
            <span className="text-2xl">{emoji}</span>
            <span className="flex items-center gap-1 font-display text-sm font-bold text-foreground">
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </span>
          </Link>
        ))}
      </div>

      <section className="card-soft p-5">
        <div className="flex justify-between text-sm font-bold text-foreground">
          <span>{t("dailyGoal")}</span>
          <span className="text-primary">
            {state.questionsToday}/5 {t("questionsToday")}
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
          <div className="h-full gradient-primary transition-all" style={{ width: `${goal}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          ⭐ {state.points} {t("points")} · 🏅 {state.badges.length} {t("badges")}
        </p>
      </section>
    </AppShell>
  );
}
