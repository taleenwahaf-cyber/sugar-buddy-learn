import type { Bi } from "./i18n";

export type ScenarioKey = "stable" | "rising" | "falling" | "low" | "high";
export type Tone = "stable" | "low" | "high";

export type Scenario = {
  key: ScenarioKey;
  value: number;
  arrow: string;
  tone: Tone;
  label: Bi;
  status: Bi;
  explain: Bi;
  meaning: Bi;
  series: number[];
};

export const scenarios: Record<ScenarioKey, Scenario> = {
  stable: {
    key: "stable",
    value: 105,
    arrow: "→",
    tone: "stable",
    label: { en: "Stable", ar: "ثابت" },
    status: { en: "In your usual range", ar: "داخل نطاقك المعتاد" },
    explain: {
      en: "Your sugar is steady, like a calm road. Nice and smooth!",
      ar: "سكرك ثابت مثل طريق هادئ. رائع وسلس!",
    },
    meaning: {
      en: "The number 105 tells you how much sugar is in your blood right now. The arrow → means it is staying about the same. Steady numbers help your body feel good for playing and learning.",
      ar: "الرقم ١٠٥ يخبرك كم السكر في دمك الآن. السهم → يعني أنه يبقى كما هو تقريباً. الأرقام الثابتة تساعد جسمك ليشعر بالراحة للعب والتعلّم.",
    },
    series: [102, 104, 103, 106, 105, 105],
  },
  rising: {
    key: "rising",
    value: 168,
    arrow: "↑",
    tone: "high",
    label: { en: "Rising", ar: "يرتفع" },
    status: { en: "Going up right now", ar: "يرتفع الآن" },
    explain: {
      en: "Your sugar is climbing up, like walking up stairs.",
      ar: "سكرك يصعد مثل الدرج.",
    },
    meaning: {
      en: "The arrow ↑ means your sugar is moving up. This can happen after food or juice. Follow your own plan and tell a grown-up what you see.",
      ar: "السهم ↑ يعني أن سكرك يرتفع. قد يحدث هذا بعد الطعام أو العصير. اتبع خطتك الخاصة وأخبر شخصاً كبيراً بما تراه.",
    },
    series: [118, 126, 138, 149, 158, 168],
  },
  falling: {
    key: "falling",
    value: 82,
    arrow: "↓",
    tone: "stable",
    label: { en: "Falling", ar: "ينزل" },
    status: { en: "Going down slowly", ar: "ينزل ببطء" },
    explain: {
      en: "Your sugar is going down, like a slide.",
      ar: "سكرك ينزل مثل الزحليقة.",
    },
    meaning: {
      en: "The arrow ↓ means your sugar is moving down. Moving and playing can do that. Keep watching it and let a grown-up know.",
      ar: "السهم ↓ يعني أن سكرك ينزل. الحركة واللعب قد يفعلان ذلك. راقبه وأخبر شخصاً كبيراً.",
    },
    series: [126, 118, 108, 98, 90, 82],
  },
  low: {
    key: "low",
    value: 62,
    arrow: "↓",
    tone: "low",
    label: { en: "Low", ar: "منخفض" },
    status: { en: "Below your usual range", ar: "أقل من نطاقك المعتاد" },
    explain: {
      en: "This number is lower than usual. Time to check your plan and tell a grown-up.",
      ar: "هذا الرقم أقل من المعتاد. حان وقت مراجعة خطتك وإخبار شخص كبير.",
    },
    meaning: {
      en: "A low number means your body needs help from your care plan. SugarBuddy does not decide what you take — your plan and your grown-up do. Tell someone right away.",
      ar: "الرقم المنخفض يعني أن جسمك يحتاج مساعدة من خطتك. شوقر بادي لا يقرر ما تأخذه — خطتك والشخص الكبير يقرران. أخبر أحداً فوراً.",
    },
    series: [98, 92, 85, 76, 68, 62],
  },
  high: {
    key: "high",
    value: 245,
    arrow: "↑",
    tone: "high",
    label: { en: "High", ar: "مرتفع" },
    status: { en: "Above your usual range", ar: "أعلى من نطاقك المعتاد" },
    explain: {
      en: "This number is higher than usual. Check your plan and tell a grown-up.",
      ar: "هذا الرقم أعلى من المعتاد. راجع خطتك وأخبر شخصاً كبيراً.",
    },
    meaning: {
      en: "A high number is information, not a mistake. It happens sometimes. Your plan says what to do next, and your grown-up helps you do it.",
      ar: "الرقم المرتفع معلومة وليس خطأً. يحدث أحياناً. خطتك تقول ما تفعله تالياً، والشخص الكبير يساعدك.",
    },
    series: [176, 195, 210, 225, 236, 245],
  },
};

export const scenarioOrder: ScenarioKey[] = ["stable", "rising", "falling", "low", "high"];

export type FoodCategory = "fruit" | "dairy" | "grain" | "drink" | "sweet" | "home";

export type Food = {
  id: string;
  emoji: string;
  name: Bi;
  category: FoodCategory;
  carbs: number;
  serving: Bi;
  note: Bi;
};

export const foods: Food[] = [
  {
    id: "apple",
    emoji: "🍎",
    name: { en: "Apple", ar: "تفاح" },
    category: "fruit",
    carbs: 21,
    serving: { en: "1 medium apple", ar: "تفاحة متوسطة" },
    note: {
      en: "Apples have carbs plus fiber, so sugar usually rises slowly and gently.",
      ar: "التفاح فيه كربوهيدرات وألياف، لذلك يرتفع السكر عادةً ببطء ولطف.",
    },
  },
  {
    id: "milk",
    emoji: "🥛",
    name: { en: "Milk", ar: "حليب" },
    category: "dairy",
    carbs: 12,
    serving: { en: "1 cup", ar: "كوب واحد" },
    note: {
      en: "Milk has natural sugar called lactose, so it counts as carbs too.",
      ar: "الحليب فيه سكر طبيعي اسمه اللاكتوز، لذلك يُحسب كربوهيدرات أيضاً.",
    },
  },
  {
    id: "bread",
    emoji: "🍞",
    name: { en: "Bread", ar: "خبز" },
    category: "grain",
    carbs: 15,
    serving: { en: "1 slice", ar: "شريحة واحدة" },
    note: {
      en: "Bread turns into sugar in your body. Whole grain bread usually works more slowly.",
      ar: "الخبز يتحول إلى سكر في جسمك. الخبز الأسمر يعمل عادةً ببطء أكثر.",
    },
  },
  {
    id: "rice",
    emoji: "🍚",
    name: { en: "Rice", ar: "أرز" },
    category: "grain",
    carbs: 45,
    serving: { en: "1 cup cooked", ar: "كوب مطبوخ" },
    note: {
      en: "Rice has lots of carbs, so it can move your number up more than a small snack.",
      ar: "الأرز فيه كربوهيدرات كثيرة، لذلك قد يرفع رقمك أكثر من وجبة خفيفة صغيرة.",
    },
  },
  {
    id: "juice",
    emoji: "🧃",
    name: { en: "Juice", ar: "عصير" },
    category: "drink",
    carbs: 26,
    serving: { en: "1 small box", ar: "علبة صغيرة" },
    note: {
      en: "Liquid carbs travel fast, so juice can raise sugar quickly. Many plans use it for low sugar.",
      ar: "الكربوهيدرات السائلة تنتقل بسرعة، لذلك قد يرفع العصير السكر سريعاً. كثير من الخطط تستخدمه عند انخفاض السكر.",
    },
  },
  {
    id: "dates",
    emoji: "🌴",
    name: { en: "Dates", ar: "تمر" },
    category: "sweet",
    carbs: 18,
    serving: { en: "3 dates", ar: "٣ حبات تمر" },
    note: {
      en: "Dates are small but sweet, so a few can add up to many carbs.",
      ar: "التمر صغير لكنه حلو، لذلك قليل منه قد يعطي كربوهيدرات كثيرة.",
    },
  },
  {
    id: "chocolate",
    emoji: "🍫",
    name: { en: "Chocolate", ar: "شوكولاتة" },
    category: "sweet",
    carbs: 25,
    serving: { en: "1 small bar", ar: "قطعة صغيرة" },
    note: {
      en: "Chocolate has sugar and fat. Fat can make the sugar rise a little later.",
      ar: "الشوكولاتة فيها سكر ودهون. الدهون قد تجعل السكر يرتفع بعد وقت أطول.",
    },
  },
  {
    id: "sandwich",
    emoji: "🥪",
    name: { en: "Sandwich", ar: "ساندويتش" },
    category: "grain",
    carbs: 32,
    serving: { en: "1 sandwich", ar: "ساندويتش واحد" },
    note: {
      en: "A sandwich mixes bread carbs with protein, so the change is usually slower and steadier.",
      ar: "الساندويتش يخلط كربوهيدرات الخبز مع البروتين، لذلك يكون التغيير عادةً أبطأ وأكثر ثباتاً.",
    },
  },
];

export const foodCategories: { key: FoodCategory | "all"; label: string }[] = [
  { key: "all", label: "allFoods" },
  { key: "fruit", label: "catFruit" },
  { key: "dairy", label: "catDairy" },
  { key: "grain", label: "catGrain" },
  { key: "drink", label: "catDrink" },
  { key: "sweet", label: "catSweet" },
  { key: "home", label: "catHome" },
];

/* ---------- AI answers (rule based, education only) ---------- */

export type AiEntry = { keywords: string[]; answer: Bi };

export const suggestedQuestions: Bi[] = [
  { en: "What does this number mean?", ar: "ماذا يعني هذا الرقم؟" },
  { en: "What does the arrow mean?", ar: "ماذا يعني السهم؟" },
  { en: "Why can my sugar go up?", ar: "لماذا يرتفع سكري؟" },
  { en: "Can food affect my sugar?", ar: "هل يؤثر الطعام على سكري؟" },
  { en: "Why do I need to check my sugar?", ar: "لماذا أحتاج لقياس سكري؟" },
  { en: "What if my sugar is low?", ar: "ماذا لو كان سكري منخفضاً؟" },
];

export const aiKnowledge: AiEntry[] = [
  {
    keywords: ["number", "mean", "105", "reading", "رقم", "يعني", "قراءة"],
    answer: {
      en: "Your number shows how much sugar is in your blood right now. It is just information — like a score in a game that helps you and your grown-ups understand your day.",
      ar: "رقمك يوضح كم السكر في دمك الآن. إنه مجرد معلومة — مثل نتيجة في لعبة تساعدك ومن يعتني بك على فهم يومك.",
    },
  },
  {
    keywords: ["arrow", "trend", "سهم", "اتجاه"],
    answer: {
      en: "The arrow shows where your sugar is going. ↑ means going up, ↓ means going down, and → means staying about the same. The arrow tells the story, and the number tells the moment.",
      ar: "السهم يوضح إلى أين يتجه سكرك. ↑ يعني يرتفع، ↓ يعني ينزل، و→ يعني يبقى كما هو. السهم يحكي القصة، والرقم يحكي اللحظة.",
    },
  },
  {
    keywords: ["up", "high", "rise", "يرتفع", "مرتفع", "ارتفاع"],
    answer: {
      en: "Sugar can go up after eating carbs, after a sweet drink, when you are excited, or when you are sick. It is not naughty and it is not your fault — it is just your body talking. Check your plan and tell a grown-up.",
      ar: "قد يرتفع السكر بعد أكل الكربوهيدرات أو شرب شيء حلو، أو عند الحماس، أو عند المرض. هذا ليس خطأك أبداً — إنه جسمك يتكلم. راجع خطتك وأخبر شخصاً كبيراً.",
    },
  },
  {
    keywords: ["down", "low", "fall", "ينزل", "منخفض", "انخفاض"],
    answer: {
      en: "Sugar can go down when you play, run, or when a while has passed since eating. If your number is low, that is a moment to follow YOUR plan and tell your parent or caregiver straight away. I never choose medicine or amounts.",
      ar: "قد ينزل السكر عند اللعب أو الجري أو بعد مرور وقت من الأكل. إذا كان رقمك منخفضاً فهذه لحظة لاتباع خطتك أنت وإخبار والديك أو من يعتني بك فوراً. أنا لا أختار دواءً ولا كميات أبداً.",
    },
  },
  {
    keywords: ["food", "eat", "carb", "طعام", "أكل", "كربوهيدرات"],
    answer: {
      en: "Yes! Foods with carbs — like bread, rice, fruit and juice — turn into sugar in your body. Some move fast (juice) and some move slowly (a sandwich). Try the Food Explorer to see examples!",
      ar: "نعم! الأطعمة التي فيها كربوهيدرات — مثل الخبز والأرز والفواكه والعصير — تتحول إلى سكر في جسمك. بعضها يعمل سريعاً (العصير) وبعضها ببطء (الساندويتش). جرّب مستكشف الطعام لترى أمثلة!",
    },
  },
  {
    keywords: ["check", "test", "why", "قياس", "أقيس", "لماذا"],
    answer: {
      en: "Checking is like looking at a map before a trip. It helps you know where you are so you and your grown-ups can pick the next step from your plan. Every check is a win!",
      ar: "القياس مثل النظر إلى الخريطة قبل الرحلة. يساعدك لتعرف أين أنت حتى تختار مع من يعتني بك الخطوة التالية من خطتك. كل قياس إنجاز!",
    },
  },
  {
    keywords: ["insulin", "dose", "medicine", "إنسولين", "جرعة", "دواء"],
    answer: {
      en: "I can explain ideas, but I never say how much insulin or medicine to take. That comes only from your own diabetes plan and your parent, caregiver or doctor. Let's open My Diabetes Plan together.",
      ar: "أستطيع شرح الأفكار، لكنني لا أحدد أبداً كمية الإنسولين أو الدواء. هذا يأتي فقط من خطة السكري الخاصة بك ومن والديك أو من يعتني بك أو طبيبك. لنفتح خطة السكري الخاصة بك معاً.",
    },
  },
  {
    keywords: ["sport", "play", "exercise", "run", "رياضة", "لعب", "جري"],
    answer: {
      en: "Playing and sport use energy, so your sugar often moves down while you move. That is why many plans ask you to check before and after playing.",
      ar: "اللعب والرياضة يستخدمان الطاقة، لذلك ينزل سكرك غالباً أثناء الحركة. لهذا تطلب كثير من الخطط القياس قبل اللعب وبعده.",
    },
  },
  {
    keywords: ["diabetes", "what is", "سكري", "ما هو"],
    answer: {
      en: "Diabetes means your body needs help moving sugar from your blood into your cells for energy. You are still you — strong, fun and capable. You just have a helpful routine to follow.",
      ar: "السكري يعني أن جسمك يحتاج مساعدة لنقل السكر من الدم إلى الخلايا للحصول على الطاقة. أنت ما زلت أنت — قوي وممتع وقادر. لديك فقط روتين مفيد تتبعه.",
    },
  },
  {
    keywords: ["scared", "sad", "worried", "خوف", "خائف", "حزين", "قلق"],
    answer: {
      en: "It is okay to feel that way, and you are not alone. Numbers are not good or bad — they are clues. Talk to your parent or caregiver about how you feel; they want to hear it.",
      ar: "من الطبيعي أن تشعر بذلك، وأنت لست وحدك. الأرقام ليست جيدة أو سيئة — إنها أدلة. تحدّث مع والديك أو من يعتني بك عن شعورك؛ هم يريدون أن يسمعوا منك.",
    },
  },
];

export const aiFallback: Bi = {
  en: "Great question! I am still learning about that one. I can explain glucose numbers, trend arrows, food and carbs, and why checking helps. For anything about medicine or how you feel, your parent or caregiver and your plan are the best helpers.",
  ar: "سؤال رائع! ما زلت أتعلّم عن هذا. أستطيع شرح أرقام السكر وأسهم الاتجاه والطعام والكربوهيدرات ولماذا القياس مفيد. أما ما يتعلق بالدواء أو شعورك، فوالداك أو من يعتني بك وخطتك هم أفضل من يساعد.",
};

export function answerFor(question: string, lang: "en" | "ar"): string {
  const q = question.toLowerCase();
  let best: { entry: AiEntry; hits: number } | null = null;
  for (const entry of aiKnowledge) {
    const hits = entry.keywords.filter((k) => q.includes(k.toLowerCase())).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { entry, hits };
  }
  return (best ? best.entry.answer : aiFallback)[lang];
}

/* ---------- Lessons & quiz ---------- */

export type Topic = "glucose" | "trend" | "food";

export type Lesson = {
  id: string;
  topic: Topic;
  title: Bi;
  body: Bi;
  emoji: string;
};

export const lessons: Lesson[] = [
  {
    id: "l1",
    topic: "glucose",
    emoji: "🔢",
    title: { en: "What glucose numbers mean", ar: "ماذا تعني أرقام السكر" },
    body: {
      en: "A glucose number is a snapshot of the sugar in your blood right now. Your care team gives you your own usual range. Inside the range: keep going. Outside the range: check your plan and tell a grown-up.",
      ar: "رقم السكر لقطة لكمية السكر في دمك الآن. فريق العناية بك يحدد نطاقك المعتاد. داخل النطاق: تابع يومك. خارج النطاق: راجع خطتك وأخبر شخصاً كبيراً.",
    },
  },
  {
    id: "l2",
    topic: "trend",
    emoji: "➡️",
    title: { en: "Reading trend arrows", ar: "قراءة أسهم الاتجاه" },
    body: {
      en: "↑ up, ↓ down, → steady. Two numbers together tell you more than one: 90 with ↓ is a different story from 90 with →. Arrows help you guess what happens next.",
      ar: "↑ يرتفع، ↓ ينزل، → ثابت. رقمان معاً يخبرانك أكثر من رقم واحد: ٩٠ مع ↓ تختلف عن ٩٠ مع →. الأسهم تساعدك لتتوقع ما سيحدث تالياً.",
    },
  },
  {
    id: "l3",
    topic: "food",
    emoji: "🍎",
    title: { en: "Carbs are energy", ar: "الكربوهيدرات طاقة" },
    body: {
      en: "Carbs are the part of food that turns into sugar. Liquids move fast, mixed meals move slowly. Counting carbs is learning, not a rule about what you cannot eat.",
      ar: "الكربوهيدرات هي جزء الطعام الذي يتحول إلى سكر. السوائل تعمل بسرعة، والوجبات المختلطة ببطء. عدّ الكربوهيدرات تعلّم، وليس قاعدة عمّا لا يمكنك أكله.",
    },
  },
  {
    id: "l4",
    topic: "glucose",
    emoji: "🗺️",
    title: { en: "Why we check", ar: "لماذا نقيس" },
    body: {
      en: "Checking gives you clues so you and your grown-ups can follow your plan. There are no bad numbers — only useful ones.",
      ar: "القياس يعطيك أدلة حتى تتبع خطتك مع من يعتني بك. لا توجد أرقام سيئة — بل أرقام مفيدة.",
    },
  },
];

export type QuizQuestion = {
  id: string;
  topic: Topic;
  level: 1 | 2 | 3;
  value: number;
  arrow: "↑" | "↓" | "→";
  correct: "up" | "down" | "stable";
  hint: Bi;
};

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", topic: "trend", level: 1, value: 82, arrow: "↓", correct: "down", hint: { en: "The arrow points down, so the sugar is going down.", ar: "السهم يشير للأسفل، لذلك السكر ينزل." } },
  { id: "q2", topic: "trend", level: 1, value: 110, arrow: "→", correct: "stable", hint: { en: "A straight arrow means steady.", ar: "السهم المستقيم يعني ثابت." } },
  { id: "q3", topic: "trend", level: 1, value: 154, arrow: "↑", correct: "up", hint: { en: "The arrow points up, so the sugar is rising.", ar: "السهم يشير للأعلى، لذلك السكر يرتفع." } },
  { id: "q4", topic: "glucose", level: 2, value: 68, arrow: "↓", correct: "down", hint: { en: "68 with ↓ is getting lower — a moment to tell a grown-up.", ar: "٦٨ مع ↓ ينزل أكثر — لحظة لإخبار شخص كبير." } },
  { id: "q5", topic: "glucose", level: 2, value: 190, arrow: "↑", correct: "up", hint: { en: "190 with ↑ keeps climbing.", ar: "١٩٠ مع ↑ يستمر بالصعود." } },
  { id: "q6", topic: "trend", level: 2, value: 99, arrow: "→", correct: "stable", hint: { en: "Same number, straight arrow: steady.", ar: "الرقم نفسه والسهم مستقيم: ثابت." } },
  { id: "q7", topic: "food", level: 3, value: 132, arrow: "↑", correct: "up", hint: { en: "After juice, numbers often rise quickly.", ar: "بعد العصير ترتفع الأرقام غالباً بسرعة." } },
  { id: "q8", topic: "food", level: 3, value: 88, arrow: "↓", correct: "down", hint: { en: "After lots of playing, numbers often move down.", ar: "بعد لعب كثير تنزل الأرقام غالباً." } },
  { id: "q9", topic: "glucose", level: 3, value: 121, arrow: "→", correct: "stable", hint: { en: "Steady after a mixed meal — nice and smooth.", ar: "ثابت بعد وجبة مختلطة — سلس وجميل." } },
  { id: "q10", topic: "trend", level: 3, value: 205, arrow: "↑", correct: "up", hint: { en: "Still rising — check your plan and tell a grown-up.", ar: "لا يزال يرتفع — راجع خطتك وأخبر شخصاً كبيراً." } },
];

export const encouragements: Bi[] = [
  { en: "You are a real glucose detective!", ar: "أنت محقّق سكر حقيقي!" },
  { en: "Amazing thinking!", ar: "تفكير رائع!" },
  { en: "Your brain is growing!", ar: "عقلك ينمو!" },
  { en: "Keep going, buddy!", ar: "واصل يا صديقي!" },
];

export const badgeCatalog: { id: string; emoji: string; name: Bi; hint: Bi }[] = [
  { id: "first-chat", emoji: "💬", name: { en: "Curious Mind", ar: "عقل فضولي" }, hint: { en: "Asked SugarBuddy a question", ar: "سألت شوقر بادي سؤالاً" } },
  { id: "first-game", emoji: "🕵️", name: { en: "Glucose Detective", ar: "محقّق السكر" }, hint: { en: "Finished a detective round", ar: "أكملت جولة تحقيق" } },
  { id: "food-explorer", emoji: "🍽️", name: { en: "Food Explorer", ar: "مستكشف الطعام" }, hint: { en: "Explored 3 foods", ar: "استكشفت ٣ أطعمة" } },
  { id: "lesson-star", emoji: "⭐", name: { en: "Lesson Star", ar: "نجم الدروس" }, hint: { en: "Completed a lesson", ar: "أكملت درساً" } },
  { id: "plan-pro", emoji: "🛡️", name: { en: "Plan Pro", ar: "خبير الخطة" }, hint: { en: "Read your diabetes plan", ar: "قرأت خطة السكري" } },
  { id: "streak-50", emoji: "🏅", name: { en: "50 Points Club", ar: "نادي ٥٠ نقطة" }, hint: { en: "Earned 50 points", ar: "جمعت ٥٠ نقطة" } },
];