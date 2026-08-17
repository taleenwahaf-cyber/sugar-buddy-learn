import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BuddySays } from "@/components/Mascot";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { badgeCatalog, lessons, type Topic } from "@/lib/data";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn & Play — personalized diabetes lessons for kids" },
      {
        name: "description",
        content:
          "Adaptive lessons, badges and progress that recommend what to practice next: glucose numbers, trend arrows or carbs.",
      },
      { property: "og:title", content: "Learn & Play — personalized diabetes lessons for kids" },
      {
        property: "og:description",
        content: "Personalized learning that adapts to what a child needs to practice next.",
      },
    ],
  }),
  component: LearnPage,
});

const topicKey: Record<Topic, string> = {
  glucose: "topicGlucose",
  trend: "topicTrend",
  food: "topicFood",
};

export function useRecommendation() {
  const { weakestTopic, state } = useStore();
  const strongest = (["glucose", "trend", "food"] as Topic[]).reduce((a, b) =>
    (state.stats[b].correct / Math.max(1, state.stats[b].total)) >
    (state.stats[a].correct / Math.max(1, state.stats[a].total))
      ? b
      : a,
  );
  return { weakestTopic, strongest };
}

function LearnPage() {
  const { t, tr, lang } = useI18n();
  const { state, completeLesson, level } = useStore();
  const { weakestTopic, strongest } = useRecommendation();
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const recommendation =
    lang === "en"
      ? `You've practiced ${t(topicKey[strongest]).toLowerCase()} really well! Let's practice ${t(topicKey[weakestTopic]).toLowerCase()} next.`
      : `تدرّبت على ${t(topicKey[strongest])} بشكل رائع! لنتدرّب على ${t(topicKey[weakestTopic])} تالياً.`;

  return (
    <AppShell title={t("myLearning")} subtitle={`${t("level")} ${level} · ${state.points} ${t("points")}`}>
      <section className="card-soft p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
          <Sparkles className="h-4 w-4" /> {t("recommendedNext")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{recommendation}</p>
        <Link
          to="/game"
          className="mt-4 block rounded-2xl gradient-primary py-3 text-center font-display font-bold text-primary-foreground transition-transform active:scale-95"
        >
          {t("detectiveGame")}
        </Link>
      </section>

      <section className="card-soft space-y-3 p-5">
        <p className="font-display text-lg font-bold text-foreground">{t("progress")}</p>
        {(["glucose", "trend", "food"] as Topic[]).map((topic) => {
          const s = state.stats[topic];
          const pct = Math.round((s.correct / Math.max(1, s.total)) * 100);
          return (
            <div key={topic}>
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{t(topicKey[topic])}</span>
                <span>
                  {pct}% · {s.total} {t("attempts")}
                </span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full gradient-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </section>

      <section className="space-y-3">
        <p className="font-display text-lg font-bold text-foreground">{t("lessons")}</p>
        {lessons.map((l) => {
          const done = state.lessonsDone.includes(l.id);
          return (
            <div key={l.id} className="card-soft p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{l.emoji}</span>
                <div>
                  <p className="font-display font-bold text-foreground">{tr(l.title)}</p>
                  <p className="text-[11px] text-muted-foreground">{t(topicKey[l.topic])}</p>
                </div>
                {done ? <CheckCircle2 className="ms-auto h-5 w-5 text-success" /> : null}
              </div>
              {openLesson === l.id ? (
                <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">{tr(l.body)}</p>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setOpenLesson(openLesson === l.id ? null : l.id);
                  completeLesson(l.id);
                }}
                className="mt-3 w-full rounded-2xl bg-secondary py-2.5 text-sm font-bold text-secondary-foreground transition-transform active:scale-95"
              >
                {done ? t("done") : t("startLesson")}
              </button>
            </div>
          );
        })}
      </section>

      <section className="card-soft p-5">
        <p className="font-display text-lg font-bold text-foreground">{t("badges")}</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {badgeCatalog.map((b) => {
            const owned = state.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-2xl p-3 text-center ${owned ? "bg-accent" : "bg-muted opacity-60"}`}
              >
                <span className="text-2xl">{b.emoji}</span>
                <p className="mt-1 text-[11px] font-bold text-foreground">{tr(b.name)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <BuddySays>
        {lang === "en"
          ? "Learning a little every day makes you a glucose expert. I'm proud of you!"
          : "التعلّم قليلاً كل يوم يجعلك خبير سكر. أنا فخور بك!"}
      </BuddySays>
    </AppShell>
  );
}