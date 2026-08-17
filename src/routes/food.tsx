import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BuddySays } from "@/components/Mascot";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { foodCategories, foods as baseFoods, type Food, type FoodCategory } from "@/lib/data";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title: "Food Explorer — carbs made simple for kids" },
      {
        name: "description",
        content:
          "Explore apples, milk, bread, rice, juice, dates and more to learn how carbohydrates can affect glucose.",
      },
      { property: "og:title", content: "Food Explorer — carbs made simple for kids" },
      {
        property: "og:description",
        content: "A child-friendly food library explaining carbohydrates and glucose.",
      },
    ],
  }),
  component: FoodPage,
});

function FoodPage() {
  const { t, tr, lang } = useI18n();
  const { state, viewFood, addCustomFood } = useStore();
  const [cat, setCat] = useState<FoodCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [carbs, setCarbs] = useState("");

  const all = useMemo(() => [...baseFoods, ...state.customFoods], [state.customFoods]);
  const list = cat === "all" ? all : all.filter((f) => f.category === cat);

  const submit = () => {
    if (!name.trim()) return;
    const food: Food = {
      id: `home-${Date.now()}`,
      emoji: "🏠",
      name: { en: name, ar: name },
      category: "home",
      carbs: Number(carbs) || 0,
      serving: { en: "1 serving at home", ar: "حصة واحدة في المنزل" },
      note: {
        en: "A home food added by a parent. Carbs turn into sugar, so watching the amount helps you learn.",
        ar: "طعام منزلي أضافه أحد الوالدين. الكربوهيدرات تتحول إلى سكر، ومراقبة الكمية تساعدك على التعلّم.",
      },
    };
    addCustomFood(food);
    setName("");
    setCarbs("");
    setShowForm(false);
    setCat("home");
  };

  return (
    <AppShell title={t("foodExplorer")} subtitle={t("simulated")}>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {foodCategories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCat(c.key)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold transition-transform active:scale-95 ${
              cat === c.key ? "gradient-primary text-primary-foreground" : "bg-card text-muted-foreground"
            }`}
          >
            {t(c.label)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {list.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              setOpen(open === f.id ? null : f.id);
              viewFood(f.id);
            }}
            className="card-soft p-4 text-start transition-transform active:scale-95"
          >
            <span className="text-3xl">{f.emoji}</span>
            <p className="mt-2 font-display text-base font-bold text-foreground">{tr(f.name)}</p>
            <p className="text-xs text-muted-foreground">
              {t("carbs")}: {f.carbs}g · {tr(f.serving)}
            </p>
            {open === f.id ? (
              <p className="mt-2 text-xs leading-relaxed text-secondary-foreground">{tr(f.note)}</p>
            ) : null}
          </button>
        ))}
      </div>

      {showForm ? (
        <section className="card-soft space-y-2 p-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("foodName")}
            className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none"
          />
          <input
            value={carbs}
            inputMode="numeric"
            onChange={(e) => setCarbs(e.target.value)}
            placeholder={t("carbsGrams")}
            className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={submit}
            className="w-full rounded-2xl gradient-primary py-2.5 font-display font-bold text-primary-foreground"
          >
            {t("save")}
          </button>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 py-3 text-sm font-bold text-primary transition-transform active:scale-95"
        >
          <Plus className="h-4 w-4" /> {t("addFood")}
        </button>
      )}

      <p className="flex items-start gap-2 rounded-2xl bg-warning/20 p-3 text-xs font-semibold text-warning-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        {t("noDose")}
      </p>

      <BuddySays>
        {lang === "en"
          ? "Every food here is okay to learn about. Carbs are energy — we just like to know how much!"
          : "كل طعام هنا يمكن أن نتعلّم عنه. الكربوهيدرات طاقة — نحب فقط أن نعرف الكمية!"}
      </BuddySays>
    </AppShell>
  );
}