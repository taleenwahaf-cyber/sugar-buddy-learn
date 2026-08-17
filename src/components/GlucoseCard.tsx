import { useI18n } from "@/lib/i18n";
import { scenarios, type ScenarioKey } from "@/lib/data";

const toneClasses: Record<string, { text: string; ring: string; chip: string }> = {
  stable: { text: "text-sugar-stable", ring: "ring-sugar-stable/30", chip: "bg-sugar-stable/15 text-sugar-stable" },
  low: { text: "text-sugar-low", ring: "ring-sugar-low/30", chip: "bg-sugar-low/15 text-sugar-low" },
  high: { text: "text-sugar-high", ring: "ring-sugar-high/30", chip: "bg-sugar-high/15 text-sugar-high" },
};

function Sparkline({ series, tone }: { series: number[]; tone: string }) {
  const min = Math.min(...series) - 8;
  const max = Math.max(...series) + 8;
  const points = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * 100;
      const y = 40 - ((v - min) / (max - min)) * 34 - 3;
      return `${x},${y}`;
    })
    .join(" ");
  const stroke =
    tone === "low" ? "var(--sugar-low)" : tone === "high" ? "var(--sugar-high)" : "var(--sugar-stable)";
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-16 w-full" role="img" aria-hidden="true">
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlucoseCard({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const { t, tr } = useI18n();
  const sc = scenarios[scenarioKey];
  const tone = toneClasses[sc.tone];

  return (
    <section className={`card-soft ring-4 ${tone.ring} p-5`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("currentGlucose")}
      </p>
      <div className="mt-1 flex items-end gap-3">
        <span className={`font-display text-6xl font-extrabold leading-none ${tone.text}`}>
          {sc.value}
        </span>
        <span className="pb-2 text-sm font-semibold text-muted-foreground">{t("unit")}</span>
        <span className={`ms-auto pb-1 font-display text-4xl font-bold ${tone.text}`}>{sc.arrow}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone.chip}`}>
          {t("trend")}: {tr(sc.label)}
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
          {tr(sc.status)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{tr(sc.explain)}</p>
      <div className="mt-2">
        <p className="text-[11px] font-semibold text-muted-foreground">
          {t("last3h")} · {t("simulated")}
        </p>
        <Sparkline series={sc.series} tone={sc.tone} />
      </div>
    </section>
  );
}