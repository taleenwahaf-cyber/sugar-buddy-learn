import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bi } from "./i18n";
import { badgeCatalog, quizQuestions, type Food, type ScenarioKey, type Topic } from "./data";

export type TopicStat = { correct: number; total: number };

export type Plan = {
  instructions: Bi;
  quickCarbs: Bi;
  reminders: Bi;
  contactName: string;
  contactPhone: string;
  helpSteps: Bi;
};

export type State = {
  scenario: ScenarioKey;
  points: number;
  badges: string[];
  stats: Record<Topic, TopicStat>;
  missed: string[];
  lessonsDone: string[];
  foodsViewed: string[];
  customFoods: Food[];
  questionsToday: number;
  plan: Plan;
};

const defaultPlan: Plan = {
  instructions: {
    en: "Check your glucose before breakfast, before lunch, before sport and at bedtime. Always show your reading to Mom or Dad before deciding anything.",
    ar: "قِس السكر قبل الفطور وقبل الغداء وقبل الرياضة وقبل النوم. أظهر القراءة لأمك أو أبيك قبل أي قرار.",
  },
  quickCarbs: {
    en: "Small juice box • 3 glucose tablets • 1 cup of milk",
    ar: "علبة عصير صغيرة • ٣ أقراص جلوكوز • كوب حليب",
  },
  reminders: {
    en: "Carry your snack bag in your backpack. Tell your teacher if you feel shaky, dizzy or very thirsty.",
    ar: "احمل حقيبة الوجبة الخفيفة في حقيبتك. أخبر معلمتك إذا شعرت بالرجفة أو الدوار أو العطش الشديد.",
  },
  contactName: "Mom — Sara",
  contactPhone: "+966 5X XXX XXXX",
  helpSteps: {
    en: "1) Stop and sit down. 2) Tell a grown-up near you. 3) Follow the quick-carb option above. 4) Call Mom. 5) Check again with a grown-up.",
    ar: "١) توقّف واجلس. ٢) أخبر شخصاً كبيراً قريباً منك. ٣) اتبع خيار الكربوهيدرات السريعة أعلاه. ٤) اتصل بأمك. ٥) أعد القياس مع شخص كبير.",
  },
};

const initialState: State = {
  scenario: "stable",
  points: 40,
  badges: ["first-game"],
  stats: {
    glucose: { correct: 7, total: 8 },
    trend: { correct: 3, total: 8 },
    food: { correct: 4, total: 5 },
  },
  missed: ["q2", "q6"],
  lessonsDone: ["l1"],
  foodsViewed: ["apple"],
  customFoods: [],
  questionsToday: 2,
  plan: defaultPlan,
};

type Ctx = {
  state: State;
  setScenario: (s: ScenarioKey) => void;
  addPoints: (n: number) => void;
  awardBadge: (id: string) => void;
  recordAnswer: (topic: Topic, questionId: string, correct: boolean) => void;
  completeLesson: (id: string) => void;
  viewFood: (id: string) => void;
  addCustomFood: (food: Food) => void;
  askedQuestion: () => void;
  updatePlan: (plan: Plan) => void;
  reset: () => void;
  level: number;
  weakestTopic: Topic;
};

const StoreContext = createContext<Ctx | null>(null);
const KEY = "sb.state.v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setState({ ...initialState, ...(JSON.parse(raw) as State) });
      } catch {
        /* ignore corrupt demo data */
      }
    }
  }, []);

  const update = useCallback((fn: (prev: State) => State) => {
    setState((prev) => {
      const next = fn(prev);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(() => {
    const level = Math.max(1, Math.floor(state.points / 50) + 1);
    const topics = ["glucose", "trend", "food"] as const satisfies readonly Topic[];
    const accuracy = (t: Topic) =>
      state.stats[t].total === 0 ? 1 : state.stats[t].correct / state.stats[t].total;
    const weakestTopic: Topic = topics.reduce<Topic>(
      (a, b) => (accuracy(b) < accuracy(a) ? b : a),
      "trend",
    );

    const awardBadge = (id: string) =>
      update((p) =>
        p.badges.includes(id) || !badgeCatalog.some((b) => b.id === id)
          ? p
          : { ...p, badges: [...p.badges, id] },
      );

    return {
      state,
      level,
      weakestTopic,
      setScenario: (s) => update((p) => ({ ...p, scenario: s })),
      addPoints: (n) =>
        update((p) => {
          const points = p.points + n;
          const badges =
            points >= 50 && !p.badges.includes("streak-50")
              ? [...p.badges, "streak-50"]
              : p.badges;
          return { ...p, points, badges };
        }),
      awardBadge,
      recordAnswer: (topic, questionId, correct) =>
        update((p) => {
          const stat = p.stats[topic];
          const missed = correct
            ? p.missed.filter((m) => m !== questionId)
            : p.missed.includes(questionId)
              ? p.missed
              : [...p.missed, questionId];
          const points = p.points + (correct ? 10 : 2);
          const badges = [...p.badges];
          if (!badges.includes("first-game")) badges.push("first-game");
          if (points >= 50 && !badges.includes("streak-50")) badges.push("streak-50");
          return {
            ...p,
            points,
            badges,
            missed,
            stats: {
              ...p.stats,
              [topic]: {
                correct: stat.correct + (correct ? 1 : 0),
                total: stat.total + 1,
              },
            },
          };
        }),
      completeLesson: (id) =>
        update((p) => ({
          ...p,
          lessonsDone: p.lessonsDone.includes(id) ? p.lessonsDone : [...p.lessonsDone, id],
          points: p.points + (p.lessonsDone.includes(id) ? 0 : 15),
          badges: p.badges.includes("lesson-star") ? p.badges : [...p.badges, "lesson-star"],
        })),
      viewFood: (id) =>
        update((p) => {
          const foodsViewed = p.foodsViewed.includes(id)
            ? p.foodsViewed
            : [...p.foodsViewed, id];
          const badges =
            foodsViewed.length >= 3 && !p.badges.includes("food-explorer")
              ? [...p.badges, "food-explorer"]
              : p.badges;
          return { ...p, foodsViewed, badges };
        }),
      addCustomFood: (food) =>
        update((p) => ({ ...p, customFoods: [...p.customFoods, food] })),
      askedQuestion: () =>
        update((p) => ({
          ...p,
          questionsToday: p.questionsToday + 1,
          points: p.points + 5,
          badges: p.badges.includes("first-chat") ? p.badges : [...p.badges, "first-chat"],
        })),
      updatePlan: (plan) => update((p) => ({ ...p, plan })),
      reset: () => update(() => initialState),
    };
  }, [state, update]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function missedQuestionTitles(missed: string[]) {
  return quizQuestions.filter((q) => missed.includes(q.id));
}