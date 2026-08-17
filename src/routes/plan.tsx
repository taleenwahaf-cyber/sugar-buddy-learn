import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Pencil, LifeBuoy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BuddySays } from "@/components/Mascot";
import { useI18n } from "@/lib/i18n";
import { useStore, type Plan } from "@/lib/store";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "My Diabetes Plan — SugarBuddy" },
      {
        name: "description",
        content:
          "A child-friendly view of the personal diabetes plan written by a parent, caregiver or care team.",
      },
      { property: "og:title", content: "My Diabetes Plan — SugarBuddy" },
      {
        property: "og:description",
        content: "Personal instructions, approved quick carbs, reminders and who to call for help.",
      },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  const { t, tr, lang } = useI18n();
  const { state, updatePlan, awardBadge } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Plan>(state.plan);

  useEffect(() => {
    awardBadge("plan-pro");
  }, [awardBadge]);

  useEffect(() => {
    setDraft(state.plan);
  }, [state.plan]);

  const field = (label: string, value: string, onChange: (v: string) => void) => (
    <label className="block">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none"
      />
    </label>
  );

  const cards = [
    { key: "planInstructions", emoji: "📋", text: tr(state.plan.instructions) },
    { key: "planQuickCarbs", emoji: "🧃", text: tr(state.plan.quickCarbs) },
    { key: "planReminders", emoji: "🔔", text: tr(state.plan.reminders) },
    { key: "planHelpSteps", emoji: "🆘", text: tr(state.plan.helpSteps) },
  ];

  return (
    <AppShell title={t("myPlan")} subtitle={t("planIntro")}>
      {editing ? (
        <section className="card-soft space-y-3 p-5">
          {field(t("planInstructions"), draft.instructions[lang], (v) =>
            setDraft({ ...draft, instructions: { ...draft.instructions, [lang]: v } }),
          )}
          {field(t("planQuickCarbs"), draft.quickCarbs[lang], (v) =>
            setDraft({ ...draft, quickCarbs: { ...draft.quickCarbs, [lang]: v } }),
          )}
          {field(t("planReminders"), draft.reminders[lang], (v) =>
            setDraft({ ...draft, reminders: { ...draft.reminders, [lang]: v } }),
          )}
          {field(t("planHelpSteps"), draft.helpSteps[lang], (v) =>
            setDraft({ ...draft, helpSteps: { ...draft.helpSteps, [lang]: v } }),
          )}
          <label className="block">
            <span className="text-xs font-bold text-muted-foreground">{t("planContact")}</span>
            <input
              value={draft.contactName}
              onChange={(e) => setDraft({ ...draft, contactName: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none"
            />
            <input
              value={draft.contactPhone}
              onChange={(e) => setDraft({ ...draft, contactPhone: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              updatePlan(draft);
              setEditing(false);
            }}
            className="w-full rounded-2xl gradient-primary py-3 font-display font-bold text-primary-foreground"
          >
            {t("save")}
          </button>
        </section>
      ) : (
        <>
          {cards.map((c) => (
            <section key={c.key} className="card-soft p-5">
              <p className="font-display text-base font-bold text-foreground">
                {c.emoji} {t(c.key)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">{c.text}</p>
            </section>
          ))}

          <section className="card-soft p-5">
            <p className="font-display text-base font-bold text-foreground">👩 {t("planContact")}</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{state.plan.contactName}</p>
            <a
              href={`tel:${state.plan.contactPhone.replace(/\s/g, "")}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-success py-3 font-display font-bold text-success-foreground"
            >
              <Phone className="h-4 w-4" /> {state.plan.contactPhone}
            </a>
          </section>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary py-3 text-sm font-bold text-secondary-foreground"
            >
              <Pencil className="h-4 w-4" /> {t("editPlan")}
            </button>
          </div>

          <BuddySays>
            <LifeBuoy className="inline h-4 w-4 align-text-bottom" />{" "}
            {lang === "en"
              ? "Your plan is your superpower. Follow it, and always tell a grown-up when something feels different."
              : "خطتك هي قوتك الخارقة. اتبعها، وأخبر شخصاً كبيراً دائماً إذا شعرت بشيء مختلف."}
          </BuddySays>
        </>
      )}
    </AppShell>
  );
}