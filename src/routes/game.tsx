import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X, Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BuddySays, Mascot } from "@/components/Mascot";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { encouragements, quizQuestions } from "@/lib/data";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Glucose Detective — SugarBuddy learning game" },
      {
        name: "description",
        content:
          "Play Glucose Detective: read glucose numbers and trend arrows, earn points and badges while learning.",
      },
      { property: "og:title", content: "Glucose Detective — SugarBuddy learning game" },
      {
        property: "og:description",
        content: "A friendly quiz game that teaches children to read glucose trends.",
      },
    ],
  }),
  component: GamePage,
});

type Choice = "up" | "down" | "stable";

function GamePage() {
  const { t, tr } = useI18n();
  const { recordAnswer } = useStore();
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Choice | null>(null);
  const [score, setScore] = useState(0);

  const pool = useMemo(() => quizQuestions.filter((q) => q.level <= level), [level]);
  const q = pool[Math.min(index, pool.length - 1)]!;
  const finished = index >= pool.length;

  const pick = (choice: Choice) => {
    if (picked) return;
    setPicked(choice);
    const ok = choice === q.correct;
    if (ok) setScore((s) => s + 1);
    recordAnswer(q.topic, q.id, ok);
  };

  const restart = (lvl: 1 | 2 | 3 = level) => {
    setLevel(lvl);
    setIndex(0);
    setPicked(null);
    setScore(0);
  };

  const options: { key: Choice; label: string; emoji: string }[] = [
    { key: "up", label: t("goingUp"), emoji: "⬆️" },
    { key: "down", label: t("goingDown"), emoji: "⬇️" },
    { key: "stable", label: t("stayingStable"), emoji: "➡️" },
  ];

  return (
    <AppShell title={t("detectiveGame")} subtitle={`${t("score")}: ${score}`}>
      <div className="flex gap-2">
        {([1, 2, 3] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => restart(lvl)}
            className={`flex-1 rounded-2xl px-3 py-2 text-xs font-bold transition-transform active:scale-95 ${
              level === lvl
                ? "gradient-primary text-primary-foreground"
                : "bg-card text-muted-foreground"
            }`}
          >
            {t(lvl === 1 ? "easy" : lvl === 2 ? "medium" : "hard")}
          </button>
        ))}
      </div>

      {finished ? (
        <section className="card-soft p-6 text-center">
          <Mascot size="lg" className="mx-auto" />
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground">{t("roundDone")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("youGot")} {score}/{pool.length}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">
            <Trophy className="h-4 w-4" /> +{score * 10} {t("points")}
          </p>
          <button
            type="button"
            onClick={() => restart()}
            className="mt-5 w-full rounded-2xl gradient-primary py-3 font-display font-bold text-primary-foreground transition-transform active:scale-95"
          >
            {t("playAgain")}
          </button>
        </section>
      ) : (
        <>
          <section className="card-soft p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {t("question")} {index + 1}/{pool.length}
            </p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="font-display text-6xl font-extrabold text-primary">{q.value}</span>
              <span className="font-display text-5xl font-bold text-primary-glow">{q.arrow}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t("unit")}</p>
            <h2 className="mt-4 font-display text-xl font-bold text-foreground">
              {t("whatDoYouNotice")}
            </h2>
            <div className="mt-4 space-y-2">
              {options.map((o) => {
                const isCorrect = o.key === q.correct;
                const state =
                  picked === null
                    ? "bg-secondary text-secondary-foreground"
                    : isCorrect
                      ? "bg-success text-success-foreground"
                      : picked === o.key
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted text-muted-foreground";
                return (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => pick(o.key)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start font-display text-base font-bold transition-transform active:scale-95 ${state}`}
                  >
                    <span>{o.emoji}</span>
                    {o.label}
                    {picked && isCorrect ? <Check className="ms-auto h-5 w-5" /> : null}
                    {picked === o.key && !isCorrect ? <X className="ms-auto h-5 w-5" /> : null}
                  </button>
                );
              })}
            </div>
          </section>

          {picked ? (
            <>
              <BuddySays>
                <strong className="font-display">
                  {picked === q.correct ? t("correct") : t("notQuite")}
                </strong>{" "}
                {tr(q.hint)}{" "}
                {picked === q.correct ? tr(encouragements[index % encouragements.length]!) : ""}
              </BuddySays>
              <button
                type="button"
                onClick={() => {
                  setPicked(null);
                  setIndex((i) => i + 1);
                }}
                className="w-full rounded-2xl gradient-primary py-3 font-display font-bold text-primary-foreground transition-transform active:scale-95"
              >
                {t("next")}
              </button>
            </>
          ) : null}

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full gradient-primary transition-all"
              style={{ width: `${(index / pool.length) * 100}%` }}
            />
          </div>
        </>
      )}
    </AppShell>
  );
}