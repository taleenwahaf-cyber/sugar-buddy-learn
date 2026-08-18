import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RotateCcw, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import { useI18n, type Lang } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { suggestedQuestions } from "@/lib/data";
import { sendChatMessage } from "@/lib/chat";

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

const welcomeMessage = (lang: Lang) =>
  lang === "en"
    ? "Hi! I'm SugarBuddy. Ask me anything about glucose numbers, arrows, or food. I explain — your plan and your grown-ups decide."
    : "أهلًا! أنا شوقر بادي. اسألني عن أرقام السكر أو الأسهم أو الطعام. أنا أشرح — وخطتك ومن يعتني بك هم من يقررون.";

const friendlyError = (lang: Lang) =>
  lang === "en"
    ? "Sorry, I couldn't connect right now. Please try again."
    : "عذرًا، لم أتمكن من الاتصال حاليًا. حاول مرة أخرى.";

function ChatPage() {
  const { t, tr, lang } = useI18n();
  const { askedQuestion } = useStore();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "buddy", text: welcomeMessage("en") },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: 0, role: "buddy", text: welcomeMessage(lang) }]);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const ask = async (text: string) => {
    const question = text.trim();
    if (!question || typing) return;

    const childMessage: Msg = { id: Date.now(), role: "child", text: question };
    const conversation = [...messages, childMessage]
      .filter((message) => message.id !== 0)
      .map((message) => ({
        role: message.role === "child" ? ("user" as const) : ("assistant" as const),
        text: message.text,
      }));

    setInput("");
    setMessages((current) => [...current, childMessage]);
    setTyping(true);
    askedQuestion();

    try {
      const response = await sendChatMessage({ data: { messages: conversation } });
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "buddy", text: response.text },
      ]);
    } catch (error) {
      console.error("SugarBuddy chat error:", error);
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "buddy", text: friendlyError(lang) },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const clearChat = () => {
    if (typing) return;
    setInput("");
    setMessages([{ id: Date.now(), role: "buddy", text: welcomeMessage(lang) }]);
  };

  return (
    <AppShell title={t("askAi")} subtitle={t("tagline")}>
      <div className="space-y-3">
        {messages.map((message) =>
          message.role === "buddy" ? (
            <div key={message.id} className="flex items-start gap-2">
              <Mascot size="sm" className="shrink-0" />
              <p className="max-w-[80%] rounded-3xl rounded-ss-md bg-card p-3 text-sm leading-relaxed text-card-foreground shadow-sm">
                {message.text}
              </p>
            </div>
          ) : (
            <div key={message.id} className="flex justify-end">
              <p className="max-w-[80%] rounded-3xl rounded-ee-md gradient-primary p-3 text-sm font-semibold text-primary-foreground shadow-sm">
                {message.text}
              </p>
            </div>
          ),
        )}
        {typing ? (
          <div className="flex items-center gap-2">
            <Mascot size="sm" />
            <span className="rounded-3xl bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
              {lang === "en" ? "Thinking... 💙" : "لحظة أفكر... 💙"}
            </span>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {t("suggested")}
          </p>
          <button
            type="button"
            onClick={clearChat}
            disabled={typing}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {lang === "en" ? "Clear chat" : "مسح المحادثة"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question.en}
              type="button"
              onClick={() => ask(tr(question))}
              disabled={typing}
              className="rounded-full border border-primary/30 bg-card px-3 py-2 text-xs font-semibold text-primary transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {tr(question)}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void ask(input);
        }}
        className="sticky bottom-20 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-md"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("typeQuestion")}
          disabled={typing}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          aria-label={t("send")}
          disabled={typing || !input.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4 rtl:-scale-x-100" />
        </button>
      </form>
    </AppShell>
  );
}
