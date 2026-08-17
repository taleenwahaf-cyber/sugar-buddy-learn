import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, BookOpen, Apple, ClipboardList, Lightbulb } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { useStore, missedQuestionTitles } from "@/lib/store";
import { foods as baseFoods, lessons, type Topic } from "@/lib/data";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent Mode — SugarBuddy learning insights" },
      {
        name: "description",
        content:
          "Review your child's quiz performance, completed lessons, practiced topics, food library and personalized plan.",
      },
      { property: "og:title", content: "Parent Mode — SugarBuddy learning insights" },
      {
        property: "og:description",
        content: "Organized insights for parents and caregivers into a child's diabetes education.",
      },
    ],
  }),
  component: ParentPage,
});

const topicKey: Record<Topic, string> = {
  glucose: "topicGlucose",
  trend: "topicTrend",
  food: "topicFood",
};

function ParentPage() {
  const { t, tr, lang } = useI18n();
  const { state, level, weakestTopic, reset } = useStore();
  const topics: Topic[] = ["glucose", "trend", "food"];
  const totalAttempts = topics.reduce((n, tp) => n + state.stats[tp].total, 0);
  const totalCorrect = topics.reduce((n, tp) => n + state.stats[tp].correct, 0);
  const overall = Math.round((totalCorrect / Math.max(1, totalAttempts)) * 100);
  const missed = missedQuestionTitles(state.missed);

  return (
    <AppShell variant="parent" title={t("parentMode")} subtitle={t("simulated")}>
      <section className="grid grid-cols-3 gap-2">
        {[
          { label: t("accuracy"), value: `${overall}%` },
          { label: t("points"), value: String(state.points) },
          { label: t("level"), value: String(level) },
        ].map((k) => (
          <div key={k.label} className="card-soft p-3 text-center">
            <p className="font-display text-2xl font-bold text-primary">{k.value}</p>
            <p className="text-[11px] font-semibold text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </section>

      <section className="card-soft p-5">
        <p className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <BarChart3 className="h-4 w-4 text-primary" /> {t("quizPerformance")}
        </p>
        <table className="mt-3 w-full text-sm">
          <tbody>
            {topics.map((tp) => {
              const s = state.stats[tp];
              const pct = Math.round((s.correct / Math.max(1, s.total)) * 100);
              return (
                <tr key={tp} className="border-b border-border last:border-0">
                  <td className="py-2 font-semibold text-foreground">{t(topicKey[tp])}</td>
                  <td className="py-2 text-end text-muted-foreground">
                    {s.correct}/{s.total}
                  </td>
                  <td className="w-20 py-2 text-end font-bold text-primary">{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="card-soft p-5">
        <p className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Lightbulb className="h-4 w-4 text-primary" /> {t("recommendations")}
        </p>
        <ul className="mt-2 space-y-2 text-sm text-secondary-foreground">
          <li>
            •{" "}
            {lang === "en"
              ? `Focus the next sessions on ${t(topicKey[weakestTopic]).toLowerCase()}.`
              : `ركّزوا الجلسات القادمة على ${t(topicKey[weakestTopic])}.`}
          </li>
          <li>
            •{" "}
            {lang === "en"
              ? `${missed.length} question(s) were missed repeatedly — review the matching lesson together.`
              : `تم الخطأ في ${missed.length} سؤال بشكل متكرر — راجعوا الدرس المرتبط معاً.`}
          </li>
          <li>
            •{" "}
            {lang === "en"
              ? "Ask your child to explain one trend arrow out loud each day."
              : "اطلبوا من طفلكم شرح سهم اتجاه واحد بصوت عالٍ كل يوم."}
          </li>
        </ul>
      </section>

      <section className="card-soft p-5">
        <p className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <BookOpen className="h-4 w-4 text-primary" /> {t("completedLessons")}
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {lessons.map((l) => (
            <li key={l.id} className="flex items-center gap-2 text-foreground">
              <span>{state.lessonsDone.includes(l.id) ? "✅" : "⬜"}</span>
              {tr(l.title)}
            </li>
          ))}
        </ul>
      </section>

      <section className="card-soft p-5">
        <p className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <ClipboardList className="h-4 w-4 text-primary" /> {t("practicedTopics")}
        </p>
        <p className="mt-2 text-sm text-secondary-foreground">
          {topics
            .slice()
            .sort((a, b) => state.stats[b].total - state.stats[a].total)
            .map((tp) => `${t(topicKey[tp])} (${state.stats[tp].total})`)
            .join(" · ")}
        </p>
      </section>

      <section className="card-soft p-5">
        <p className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Apple className="h-4 w-4 text-primary" /> {t("foodLibrary")}
        </p>
        <p className="mt-2 text-sm text-secondary-foreground">
          {[...baseFoods, ...state.customFoods].map((f) => `${f.emoji} ${tr(f.name)} ${f.carbs}g`).join(" · ")}
        </p>
        <Link to="/food" className="mt-3 inline-block text-sm font-bold text-primary underline">
          {t("foodExplorer")}
        </Link>
      </section>

      <section className="card-soft p-5">
        <p className="font-display text-base font-bold text-foreground">📋 {t("myPlan")}</p>
        <p className="mt-2 text-sm text-secondary-foreground">{tr(state.plan.instructions)}</p>
        <Link to="/plan" className="mt-3 inline-block text-sm font-bold text-primary underline">
          {t("editPlan")}
        </Link>
      </section>

      <div className="flex gap-2">
        <Link
          to="/"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl gradient-primary py-3 text-sm font-bold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" /> {t("backToChild")}
        </Link>
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground"
        >
          {t("resetDemo")}
        </button>
      </div>
    </AppShell>
  );
}