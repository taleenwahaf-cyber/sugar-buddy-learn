import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";
export type Bi = { en: string; ar: string };

const dict: Record<string, Bi> = {
  appName: { en: "SugarBuddy", ar: "شوقر بادي" },
  tagline: {
    en: "Your friendly glucose learning buddy",
    ar: "رفيقك اللطيف لتعلّم السكر",
  },
  disclaimer: {
    en: "SugarBuddy is an educational prototype and does not replace medical advice or a personalized diabetes care plan.",
    ar: "شوقر بادي نموذج تعليمي تجريبي ولا يُغني عن الاستشارة الطبية أو خطة العناية بالسكري الخاصة بك.",
  },
  navHome: { en: "Home", ar: "الرئيسية" },
  navChat: { en: "AI Buddy", ar: "المساعد" },
  navGame: { en: "Play", ar: "العب" },
  navFood: { en: "Food", ar: "الطعام" },
  navLearn: { en: "Learn", ar: "تعلّم" },
  navPlan: { en: "My Plan", ar: "خطتي" },
  navParent: { en: "Parent Mode", ar: "وضع الوالدين" },
  childMode: { en: "Child Mode", ar: "وضع الطفل" },
  hiThere: { en: "Hi, friend!", ar: "أهلاً يا صديقي!" },
  currentGlucose: { en: "My glucose right now", ar: "قراءة السكر الآن" },
  unit: { en: "mg/dL", ar: "ملغ/دل" },
  trend: { en: "Trend", ar: "الاتجاه" },
  status: { en: "Status", ar: "الحالة" },
  whatDoesThisMean: { en: "What does this mean?", ar: "ماذا يعني هذا؟" },
  askAi: { en: "Ask SugarBuddy AI", ar: "اسأل شوقر بادي" },
  learnAndPlay: { en: "Learn & Play", ar: "تعلّم والعب" },
  foodExplorer: { en: "Food Explorer", ar: "مستكشف الطعام" },
  demoScenarios: { en: "Try a demo reading", ar: "جرّب قراءة تجريبية" },
  scStable: { en: "Stable", ar: "ثابت" },
  scRising: { en: "Rising", ar: "يرتفع" },
  scFalling: { en: "Falling", ar: "ينزل" },
  scLow: { en: "Low", ar: "منخفض" },
  scHigh: { en: "High", ar: "مرتفع" },
  last3h: { en: "Last 3 hours", ar: "آخر ٣ ساعات" },
  simulated: { en: "Simulated demo data", ar: "بيانات تجريبية محاكاة" },
  points: { en: "Points", ar: "النقاط" },
  level: { en: "Level", ar: "المستوى" },
  badges: { en: "Badges", ar: "الأوسمة" },
  dailyGoal: { en: "Daily learning goal", ar: "هدف التعلّم اليومي" },
  questionsToday: { en: "questions today", ar: "أسئلة اليوم" },
  suggested: { en: "Try asking", ar: "جرّب أن تسأل" },
  typeQuestion: { en: "Type your question…", ar: "اكتب سؤالك…" },
  send: { en: "Send", ar: "إرسال" },
  detectiveGame: { en: "Glucose Detective", ar: "محقّق السكر" },
  whatDoYouNotice: { en: "What do you notice?", ar: "ماذا تلاحظ؟" },
  goingUp: { en: "Going Up", ar: "يرتفع" },
  goingDown: { en: "Going Down", ar: "ينزل" },
  stayingStable: { en: "Staying Stable", ar: "ثابت" },
  correct: { en: "Correct!", ar: "صحيح!" },
  notQuite: { en: "Not quite — let's look again", ar: "ليس تماماً — لننظر مرة أخرى" },
  score: { en: "Score", ar: "النتيجة" },
  question: { en: "Question", ar: "سؤال" },
  next: { en: "Next", ar: "التالي" },
  playAgain: { en: "Play again", ar: "العب مرة أخرى" },
  roundDone: { en: "Great work!", ar: "أحسنت!" },
  youGot: { en: "You got", ar: "أجبت" },
  difficulty: { en: "Difficulty", ar: "المستوى" },
  easy: { en: "Easy", ar: "سهل" },
  medium: { en: "Medium", ar: "متوسط" },
  hard: { en: "Hard", ar: "صعب" },
  carbs: { en: "Carbs", ar: "الكربوهيدرات" },
  perServing: { en: "per serving", ar: "لكل حصة" },
  allFoods: { en: "All", ar: "الكل" },
  catFruit: { en: "Fruit", ar: "فواكه" },
  catDairy: { en: "Dairy", ar: "حليب" },
  catGrain: { en: "Grains", ar: "حبوب" },
  catDrink: { en: "Drinks", ar: "مشروبات" },
  catSweet: { en: "Sweets", ar: "حلويات" },
  catHome: { en: "At home", ar: "من المنزل" },
  addFood: { en: "Add a home food (parent)", ar: "أضف طعاماً من المنزل (الوالدين)" },
  foodName: { en: "Food name", ar: "اسم الطعام" },
  carbsGrams: { en: "Carbs (grams)", ar: "الكربوهيدرات (غرام)" },
  save: { en: "Save", ar: "حفظ" },
  noDose: {
    en: "SugarBuddy never gives insulin or medicine amounts. Ask your parent or care team.",
    ar: "شوقر بادي لا يحدد جرعات الإنسولين أو الدواء أبداً. اسأل والديك أو فريق العناية بك.",
  },
  myLearning: { en: "My Learning", ar: "تعلّمي" },
  recommendedNext: { en: "Practice this next", ar: "تدرّب على هذا تالياً" },
  lessons: { en: "Lessons", ar: "الدروس" },
  startLesson: { en: "Start lesson", ar: "ابدأ الدرس" },
  done: { en: "Done", ar: "مكتمل" },
  progress: { en: "Progress", ar: "التقدّم" },
  topicGlucose: { en: "Glucose numbers", ar: "أرقام السكر" },
  topicTrend: { en: "Trend arrows", ar: "أسهم الاتجاه" },
  topicFood: { en: "Food & carbs", ar: "الطعام والكربوهيدرات" },
  myPlan: { en: "My Diabetes Plan", ar: "خطة السكري الخاصة بي" },
  planIntro: {
    en: "This is written by your parent or care team — just for you.",
    ar: "كتبها والداك أو فريق العناية بك — خصيصاً لك.",
  },
  planInstructions: { en: "My instructions", ar: "تعليماتي" },
  planQuickCarbs: { en: "My approved quick carbs", ar: "الكربوهيدرات السريعة المسموحة" },
  planReminders: { en: "Important reminders", ar: "تذكيرات مهمة" },
  planContact: { en: "Who I call for help", ar: "من أتصل به للمساعدة" },
  planHelpSteps: { en: "When I need help", ar: "عندما أحتاج مساعدة" },
  editPlan: { en: "Edit plan (parent)", ar: "تعديل الخطة (الوالدين)" },
  needHelpNow: { en: "Open my help steps", ar: "افتح خطوات المساعدة" },
  parentMode: { en: "Parent Mode", ar: "وضع الوالدين" },
  overview: { en: "Overview", ar: "نظرة عامة" },
  quizPerformance: { en: "Quiz performance", ar: "أداء الاختبارات" },
  completedLessons: { en: "Completed lessons", ar: "الدروس المكتملة" },
  practicedTopics: { en: "Most practiced topics", ar: "أكثر المواضيع تدريباً" },
  recommendations: { en: "Learning recommendations", ar: "توصيات التعلّم" },
  foodLibrary: { en: "Food library", ar: "مكتبة الطعام" },
  attempts: { en: "attempts", ar: "محاولة" },
  accuracy: { en: "Accuracy", ar: "الدقة" },
  backToChild: { en: "Back to Child Mode", ar: "العودة لوضع الطفل" },
  checkPlan: { en: "Check my plan", ar: "راجع خطتي" },
  tellGrownUp: { en: "Tell a grown-up", ar: "أخبر شخصاً كبيراً" },
  language: { en: "العربية", ar: "English" },
  resetDemo: { en: "Reset demo data", ar: "إعادة تعيين البيانات" },
  savedBadge: { en: "New badge unlocked!", ar: "وسام جديد!" },
};

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: keyof typeof dict | string) => string;
  tr: (value: Bi) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("sb.lang");
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("sb.lang", l);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir,
      setLang,
      toggleLang: () => setLang(lang === "en" ? "ar" : "en"),
      t: (key: string) => dict[key]?.[lang] ?? key,
      tr: (value: Bi) => value[lang],
    }),
    [lang, dir, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}