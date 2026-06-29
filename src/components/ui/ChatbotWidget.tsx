"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  AlertCircle,
  MessageSquare,
  Phone,
  Send,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Role = "bot" | "user";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const TOOLTIP_DELAY = 2600;
const TOOLTIP_DISMISS_KEY = "bista-chat-tooltip-dismissed";
const BOT_NAME = "Bista AI Assistant";

const SUGGESTIONS = [
  "What can you do?",
  "Pricing",
  "Book a demo",
  "Talk to a human",
];

const GREETING =
  "Hi! I'm Bista AI \u{1F916} — your assistant for AI agents, document processing & automation. Ask me anything, or pick a question below.";

let uid = 0;
const nextId = () => `m-${Date.now()}-${uid++}`;

/* -------------------------------------------------------------------------- */
/*  Canned reply engine (placeholder — swap for a real backend/LLM)           */
/* -------------------------------------------------------------------------- */

function generateReply(input: string): string {
  const q = input.toLowerCase();

  // TODO: wire to real backend/LLM here.
  // Replace this keyword matcher with a fetch() to your chat API / LLM
  // endpoint and stream/await the assistant response. Keep the function
  // signature returning a string (or make it async and await the network call).
  if (/(price|pricing|cost|quote|plan)/.test(q)) {
    return "Our pricing scales with usage and the agents you deploy. Tell me a bit about your use case and I can point you to the right plan — or book a quick call from the demo link.";
  }
  if (/(demo|trial|call|meeting|book)/.test(q)) {
    return "Happy to set up a demo! You can grab a slot any time at our Calendly link in the top nav, and a specialist will walk you through Bista AI live.";
  }
  if (/(contact|human|sales|support|agent|talk)/.test(q)) {
    return "I can connect you with a human teammate. Drop your email or use the \u201CBook a Demo\u201D button up top and someone from our team will reach out shortly.";
  }
  if (/(document|idp|extract|ocr|invoice)/.test(q)) {
    return "Bista Doc AI handles intelligent document processing — extracting, classifying and validating data from invoices, forms and contracts with high accuracy. Want to see it on your own documents?";
  }
  if (/(agent|automation|workflow|automate)/.test(q)) {
    return "Our autonomous AI agents handle research, support, SDR and operations workflows end-to-end. I can share examples tailored to your team — what would you like to automate?";
  }
  if (/(hi|hello|hey|yo)\b/.test(q)) {
    return "Hey there! \u{1F44B} Great to meet you. What would you like to know about Bista AI?";
  }
  if (/(what can you|who are you|help)/.test(q)) {
    return "I can explain our AI agents, intelligent document processing (Bista Doc AI) and workflow automation, share pricing guidance, and help you book a demo. What sounds useful?";
  }
  return "Thanks for the message! A specialist can dive deeper on this — in the meantime, you can explore our solutions on this page or book a demo from the top nav. Anything else I can help with?";
}

/* -------------------------------------------------------------------------- */
/*  Bot mascot (pure SVG/CSS — friendly, on-brand, no asset dependency)       */
/* -------------------------------------------------------------------------- */

function BotMascot({ className = "" }: { className?: string }) {
  // Unique gradient ids per instance (the mascot renders in both the launcher
  // and the panel header, so hard-coded ids would collide).
  const rid = useId().replace(/:/g, "");
  const headG = `${rid}-head`;
  const bodyG = `${rid}-body`;
  const screenG = `${rid}-screen`;
  const earG = `${rid}-ear`;
  const tipG = `${rid}-tip`;

  return (
    <svg viewBox="0 0 100 118" role="img" aria-hidden="true" className={className}>
      <defs>
        {/* glossy icy-blue → white → faint pink head */}
        <linearGradient id={headG} x1="0.25" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#eaf7ff" />
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f6dcec" />
        </linearGradient>
        <linearGradient id={bodyG} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcebfb" />
        </linearGradient>
        {/* dark navy face screen */}
        <linearGradient id={screenG} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1430" />
          <stop offset="100%" stopColor="#1c2c58" />
        </linearGradient>
        {/* teal/blue headset earpiece */}
        <radialGradient id={earG} cx="0.42" cy="0.36" r="0.75">
          <stop offset="0%" stopColor="#a7f5e8" />
          <stop offset="55%" stopColor="#48ccd8" />
          <stop offset="100%" stopColor="#2f8fd6" />
        </radialGradient>
        {/* glowing pink antenna tip */}
        <radialGradient id={tipG} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffe1e9" />
          <stop offset="55%" stopColor="#ff8fa6" />
          <stop offset="100%" stopColor="#ff5d7e" />
        </radialGradient>
      </defs>

      {/* headset earpieces (behind head) */}
      <g>
        <circle cx="20" cy="48" r="9" fill={`url(#${earG})`} />
        <circle cx="20" cy="48" r="4" fill="#0e1b3a" opacity="0.55" />
        <circle cx="17.2" cy="45.2" r="1.6" fill="#ffffff" opacity="0.75" />
        <circle cx="80" cy="48" r="9" fill={`url(#${earG})`} />
        <circle cx="80" cy="48" r="4" fill="#0e1b3a" opacity="0.55" />
        <circle cx="77.2" cy="45.2" r="1.6" fill="#ffffff" opacity="0.75" />
      </g>

      {/* antenna */}
      <line x1="50" y1="20" x2="50" y2="9" stroke="#cfe6f5" strokeWidth="2.6" strokeLinecap="round" />

      {/* head */}
      <rect x="22" y="18" width="56" height="52" rx="20" fill={`url(#${headG})`} />
      {/* glossy sheen on the head */}
      <ellipse cx="40" cy="30" rx="16" ry="8.5" fill="#ffffff" opacity="0.5" />

      {/* antenna tip (after head so it sits above the stalk base) */}
      <circle cx="50" cy="7" r="6" fill={`url(#${tipG})`} opacity="0.35" />
      <circle cx="50" cy="7" r="3.4" fill={`url(#${tipG})`} />
      <circle cx="48.8" cy="5.8" r="1" fill="#ffffff" opacity="0.85" />

      {/* face screen */}
      <rect x="30" y="30" width="40" height="26" rx="12" fill={`url(#${screenG})`} />

      {/* glowing eyes */}
      <ellipse cx="42" cy="42" rx="6" ry="7.5" fill="#7be0ff" opacity="0.5" />
      <ellipse cx="42" cy="42" rx="3.8" ry="5.4" fill="#f2fcff" />
      <circle cx="43.2" cy="40" r="1.2" fill="#ffffff" />
      <ellipse cx="58" cy="42" rx="6" ry="7.5" fill="#7be0ff" opacity="0.5" />
      <ellipse cx="58" cy="42" rx="3.8" ry="5.4" fill="#f2fcff" />
      <circle cx="59.2" cy="40" r="1.2" fill="#ffffff" />

      {/* smile */}
      <path d="M45 49.5 Q50 53.5 55 49.5" fill="none" stroke="#7be0ff" strokeWidth="2" strokeLinecap="round" />

      {/* rosy cheeks */}
      <ellipse cx="27" cy="52" rx="4" ry="2.8" fill="#ff9db4" opacity="0.8" />
      <ellipse cx="73" cy="52" rx="4" ry="2.8" fill="#ff9db4" opacity="0.8" />

      {/* arms (behind body) */}
      <path d="M38 80 C30 79 24 82 21 88" fill="none" stroke="#e3f0fd" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 80 C70 79 76 82 79 88" fill="none" stroke="#e3f0fd" strokeWidth="6" strokeLinecap="round" />

      {/* feet */}
      <ellipse cx="44" cy="99" rx="5.5" ry="3.6" fill="#ff9db4" />
      <ellipse cx="56" cy="99" rx="5.5" ry="3.6" fill="#ff9db4" />

      {/* body */}
      <rect x="36" y="72" width="28" height="26" rx="13" fill={`url(#${bodyG})`} />
      <ellipse cx="45" cy="78" rx="8" ry="4" fill="#ffffff" opacity="0.45" />

      {/* hands */}
      <circle cx="20" cy="89" r="4.6" fill="#ff9db4" />
      <circle cx="18.7" cy="87.6" r="1.1" fill="#ffffff" opacity="0.7" />
      <circle cx="80" cy="89" r="4.6" fill="#ff9db4" />
      <circle cx="78.7" cy="87.6" r="1.1" fill="#ffffff" opacity="0.7" />

      {/* chest emblem (subtle brand spark) */}
      <circle cx="50" cy="86" r="5" fill="#ffffff" opacity="0.9" />
      <path
        d="M50 82.5 L51.1 85 L53.5 86 L51.1 87 L50 89.5 L48.9 87 L46.5 86 L48.9 85 Z"
        fill="#ff7d9b"
      />

      {/* headset mic boom (curving toward the mouth) */}
      <path d="M80 55 C81.5 64 70 63 61 56" fill="none" stroke="#2f8fd6" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="60.5" cy="56" r="2.2" fill="#2f8fd6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Orbiting accent icon bubbles (decorative)                                 */
/* -------------------------------------------------------------------------- */

const ACCENTS = [
  // blue speech bubble — top-left
  { Icon: MessageSquare, className: "-left-3.5 -top-3", color: "bg-[#3b82f6]", delay: 0 },
  // pink alert — top-right
  { Icon: AlertCircle, className: "-right-3.5 -top-2", color: "bg-[#ec4899]", delay: 0.5 },
  // amber gear — bottom-left
  { Icon: Settings, className: "-left-3 -bottom-3", color: "bg-[#f59e0b]", delay: 1 },
  // teal support/phone — bottom-right
  { Icon: Phone, className: "-right-3 -bottom-3", color: "bg-[#14b8a6]", delay: 1.5 },
];

function AccentBubbles({ reduced }: { reduced: boolean }) {
  return (
    <>
      {ACCENTS.map(({ Icon, className, color, delay }, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 grid h-6 w-6 place-items-center rounded-full text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)] ring-2 ring-white/80 dark:ring-white/15 ${color} ${className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -3, 0],
                }
          }
          transition={
            reduced
              ? { delay: 0.2 + i * 0.08 }
              : {
                  opacity: { delay: 0.2 + i * 0.08, duration: 0.4 },
                  scale: { delay: 0.2 + i * 0.08, duration: 0.4 },
                  y: {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  },
                }
          }
        >
          <Icon className="h-3 w-3" strokeWidth={2.4} />
        </motion.span>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Chat panel                                                                */
/* -------------------------------------------------------------------------- */

function ChatPanel({
  messages,
  input,
  setInput,
  onSend,
  onSuggestion,
  onClose,
  reduced,
  inputRef,
}: {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onSuggestion: (text: string) => void;
  onClose: () => void;
  reduced: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const panelVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: 24, scale: 0.94 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.96 },
      };

  return (
    <motion.div
      role="dialog"
      aria-label={`${BOT_NAME} chat`}
      aria-modal="false"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong pointer-events-auto flex h-[min(560px,72vh)] w-[min(360px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl"
    >
      {/* header */}
      <div className="relative flex items-center gap-3 overflow-hidden border-b border-fg/10 bg-gradient-to-r from-neon-violet/15 via-neon-cyan/10 to-transparent px-4 py-3">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-neon-violet to-neon-blue shadow-glow">
          <BotMascot className="h-9 w-9" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-fg">{BOT_NAME}</p>
          <span className="flex items-center gap-1.5 text-xs text-fg/55">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Online
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="grid h-8 w-8 place-items-center rounded-full text-fg/60 transition-colors hover:bg-fg/10 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-md bg-neon-cyan text-white shadow-[0_8px_24px_-12px_rgba(69,67,217,0.7)]"
                  : "rounded-bl-md border border-fg/10 bg-fg/[0.04] text-fg/90 dark:bg-fg/[0.06]"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* suggested-question chips (only while it's just the greeting) */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSuggestion(s)}
                className="rounded-full border border-neon-cyan/30 bg-neon-cyan/[0.06] px-3 py-1.5 text-xs font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 dark:text-neon-violet"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-fg/10 bg-fg/[0.02] px-3 py-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message…"
          aria-label="Type your message"
          className="min-w-0 flex-1 rounded-full border border-fg/15 bg-canvas/60 px-4 py-2.5 text-sm text-fg placeholder:text-fg/40 focus:border-neon-cyan/60 focus:outline-none focus:ring-2 focus:ring-neon-cyan/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send message"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neon-cyan text-white shadow-[0_8px_24px_-10px_rgba(69,67,217,0.7)] transition-all hover:bg-neon-blue disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main widget                                                               */
/* -------------------------------------------------------------------------- */

export default function ChatbotWidget() {
  const reducedMotion = useReducedMotion();
  const reduced = !!reducedMotion;

  const [open, setOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "bot", text: GREETING },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  /* tooltip: auto-show after a delay unless dismissed earlier this session */
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TOOLTIP_DISMISS_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — fall back to showing it */
    }
    setTooltipDismissed(dismissed);
    if (dismissed) return;

    const t = window.setTimeout(() => setTooltipVisible(true), TOOLTIP_DELAY);
    return () => window.clearTimeout(t);
  }, []);

  const dismissTooltip = useCallback(() => {
    setTooltipVisible(false);
    setTooltipDismissed(true);
    try {
      sessionStorage.setItem(TOOLTIP_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  /* focus the input when the panel opens */
  useEffect(() => {
    if (open) {
      dismissTooltip();
      const t = window.setTimeout(() => inputRef.current?.focus(), 280);
      return () => window.clearTimeout(t);
    }
  }, [open, dismissTooltip]);

  /* Esc to close (and return focus to the launcher) */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pushUserAndReply = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: nextId(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate a short "thinking" delay before the canned reply lands.
    window.setTimeout(() => {
      const reply = generateReply(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "bot", text: reply },
      ]);
    }, 480);
  }, []);

  const handleSend = useCallback(() => {
    pushUserAndReply(input);
  }, [input, pushUserAndReply]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* panel */}
      <AnimatePresence>
        {open && (
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            onSuggestion={pushUserAndReply}
            onClose={() => setOpen(false)}
            reduced={reduced}
            inputRef={inputRef}
          />
        )}
      </AnimatePresence>

      {/* launcher + tooltip row */}
      <div className="pointer-events-none relative flex items-end justify-end">
        {/* tooltip / speech bubble */}
        <AnimatePresence>
          {tooltipVisible && !tooltipDismissed && !open && (
            <motion.div
              initial={
                reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong pointer-events-auto absolute bottom-1 right-[4.5rem] flex w-[15rem] items-start gap-2 rounded-2xl rounded-br-md px-3.5 py-2.5"
              role="status"
            >
              <p className="text-xs leading-snug text-fg/85">
                Hi! I&apos;m Bista AI — ask me anything <span aria-hidden>🤖</span>
              </p>
              <button
                type="button"
                onClick={dismissTooltip}
                aria-label="Dismiss"
                className="-mr-1 -mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-fg/50 transition-colors hover:bg-fg/10 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* launcher */}
        <div className="pointer-events-auto relative">
          {!open && <AccentBubbles reduced={reduced} />}

          {/* soft glow halo */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue blur-xl"
            animate={
              reduced
                ? { opacity: 0.5 }
                : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.button
            ref={launcherRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close chat" : "Open chat with Bista AI"}
            aria-expanded={open}
            className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-neon-violet via-neon-cyan to-neon-blue text-white shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            animate={reduced ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="bot"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="grid place-items-center"
                >
                  <BotMascot className="h-11 w-11 drop-shadow" />
                </motion.span>
              )}
            </AnimatePresence>

            {/* tiny sparkle accent */}
            {!open && (
              <Sparkles
                aria-hidden="true"
                className="absolute right-1 top-1 h-3 w-3 text-white/80"
              />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
