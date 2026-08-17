import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { answerFor, suggestedQuestions } from "@/lib/data";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "SugarBuddy AI — Kid-friendly glucose questions" },
      {
        name: "description",
        content:
          "Chat with SugarBuddy AI to learn what glucose numbers, trend arrows and carbs mean, in simple kid-friendly words.",
      },
      { property: "og:title", content: "SugarBuddy AI — Kid-friendly glucose questions" },
      {
        property: "og:description",
        content: "A friendly AI companion that explains glucose readings to children.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { id: number; role: "buddy" | "child"; text: string };

function ChatPage() {
  const { t, tr, lang } = useI18n();
  const { askedQuestion } = useStore();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 0,
        role: "buddy",
        text:
          lang === "en"
            ? "Hi! I'm SugarBuddy. Ask me anything about glucose numbers, arrows or food. I explain — your plan and your grown-ups decide."
            : "أهلاً! أنا شوقر بادي. اسألني عن أرقام السكر أو الأسهم أو الطعام. أنا أشرح — وخطتك ومن يعتني بك يقررون.",
      },
    ]);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setInput("");
    setMessages((m) => [...m, { id: Date.now(), role: "child", text: q }]);
    setTyping(true);
    askedQuestion();
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "buddy", text: answerFor(q, lang) }]);
    }, 650);
  };

  return (
    <AppShell title={t("askAi")} subtitle={t("tagline")}>
      <div className="space-y-3">
        {messages.map((m) =>
          m.role === "buddy" ? (
            <div key={m.id} className="flex items-start gap-2">
              <Mascot size="sm" className="shrink-0" />
              <p className="max-w-[80%] rounded-3xl rounded-ss-md bg-card p-3 text-sm leading-relaxed text-card-foreground shadow-sm">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[80%] rounded-3xl rounded-ee-md gradient-primary p-3 text-sm font-semibold text-primary-foreground shadow-sm">
                {m.text}
              </p>
            </div>
          ),
        )}
        {typing ? (
          <div className="flex items-center gap-2">
            <Mascot size="sm" />
            <span className="rounded-3xl bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
              • • •
            </span>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {t("suggested")}
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q.en}
              type="button"
              onClick={() => ask(tr(q))}
              className="rounded-full border border-primary/30 bg-card px-3 py-2 text-xs font-semibold text-primary transition-transform active:scale-95"
            >
              {tr(q)}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="sticky bottom-20 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-md"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("typeQuestion")}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none"
        />
        <button
          type="submit"
          aria-label={t("send")}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground transition-transform active:scale-95"
        >
          <Send className="h-4 w-4 rtl:-scale-x-100" />
        </button>
      </form>
    </AppShell>
  );
}