"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { AEGIS_PHONE_TEL, AEGIS_WHATSAPP_URL } from "@/lib/contact";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const premiumEase = [0.16, 1, 0.3, 1] as const;

const quickActions = [
  "Corporate Law",
  "Mergers & Acquisitions",
  "Intellectual Property",
  "Criminal Defense",
  "Family Law",
  "Book Consultation",
  "Speak on WhatsApp"
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Welcome to Aegis Legal Partners. How may our legal board assist you today?"
  }
];

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content
  };
}

function getAssistantResponse(input: string) {
  const message = input.toLowerCase();

  if (message.includes("price") || message.includes("fee") || message.includes("cost")) {
    return "Aegis consultations are scoped privately after conflict checks and matter review. For enterprise, M&A, litigation, and private wealth matters, our legal board provides a tailored engagement structure after the initial confidential briefing.";
  }

  if (message.includes("consult") || message.includes("book") || message.includes("appointment")) {
    return "We can begin with a discreet consultation intake. Share the matter category, urgency, and preferred contact window, or use the private consultation page to route your request directly to the Aegis legal board.";
  }

  if (message.includes("merger") || message.includes("acquisition") || message.includes("m&a")) {
    return "For mergers and acquisitions, Aegis supports diligence strategy, deal risk mapping, negotiation posture, closing governance, and board-facing transaction counsel. A short confidential briefing is the best next step.";
  }

  if (message.includes("ip") || message.includes("intellectual") || message.includes("patent") || message.includes("trademark")) {
    return "For IP protection, we focus on portfolio defensibility, licensing leverage, enforcement readiness, and trade secret protection. Aegis can help assess immediate exposure and long-term protection strategy.";
  }

  if (message.includes("criminal") || message.includes("defense") || message.includes("investigation")) {
    return "For criminal defense or investigations, discretion and speed are critical. Preserve records, avoid informal statements, and request a confidential review with senior counsel as early as possible.";
  }

  if (message.includes("family") || message.includes("divorce") || message.includes("custody") || message.includes("wealth")) {
    return "For high-net-worth family law, Aegis prioritizes privacy, asset complexity, negotiation posture, and long-term family governance. We can route the matter for discreet senior review.";
  }

  if (message.includes("corporate") || message.includes("business") || message.includes("compliance") || message.includes("dispute")) {
    return "For corporate law, disputes, and compliance, Aegis helps boards and founders clarify risk, preserve leverage, and build a defensible legal strategy before positions become public or irreversible.";
  }

  if (message.includes("litigation") || message.includes("lawsuit") || message.includes("court")) {
    return "For litigation support, Aegis begins with risk containment, evidence posture, venue strategy, and negotiation leverage. Senior review can identify the most efficient path before escalation.";
  }

  if (message.includes("confidential") || message.includes("private") || message.includes("secure")) {
    return "Confidentiality is central to the Aegis intake experience. Share only the essential contours at first; sensitive documents and privileged details should be handled through a formal attorney engagement.";
  }

  return "Based on your note, the prudent next step is a confidential matter review. Aegis can help classify urgency, identify legal exposure, and route the issue to senior counsel for a focused consultation.";
}

export function LegalAssistantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const statusCopy = useMemo(
    () => (isTyping ? "Aegis Legal Intelligence is drafting" : "Average Response Time: Under 10 Minutes"),
    [isTyping]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setHasUnread(false);
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [isOpen, messages, isTyping]);

  const submitMessage = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed || isTyping) {
      return;
    }

    setMessages((current) => [...current, createMessage("user", trimmed)]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [...current, createMessage("assistant", getAssistantResponse(trimmed))]);
      setIsTyping(false);
    }, 820 + Math.min(trimmed.length * 12, 760));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitMessage(input);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === "Speak on WhatsApp") {
      window.open(AEGIS_WHATSAPP_URL, "_blank", "noopener,noreferrer");
      return;
    }

    submitMessage(action);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(12px)" }}
            transition={{ duration: 0.72, ease: premiumEase }}
            className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.35rem)] z-[70] mx-auto flex max-h-[calc(100svh-7.5rem)] max-w-[28rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-midnight/92 shadow-[0_28px_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[42rem] sm:w-[28rem]"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/70 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-200/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative border-b border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100/25 bg-amber-100/10 text-amber-100 shadow-aureate">
                    <Bot className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-100">
                      Aegis Legal Intelligence
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{statusCopy}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-300 transition duration-500 hover:border-amber-100/40 hover:text-amber-100"
                  aria-label="Close legal assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="premium-scrollbar relative flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: premiumEase }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] rounded-[1.35rem] px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "border border-amber-100/30 bg-amber-100/12 text-amber-50"
                        : "border border-white/10 bg-white/[0.055] text-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 rounded-[1.35rem] border border-white/10 bg-white/[0.055] px-4 py-3">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16 }}
                          className="h-1.5 w-1.5 rounded-full bg-amber-100"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative border-t border-white/10 p-4">
              <div className="mb-4 flex gap-2 overflow-x-auto pb-1 premium-scrollbar">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleQuickAction(action)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-300 transition duration-500 hover:border-amber-100/35 hover:bg-amber-100/10 hover:text-amber-100"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  className="premium-input min-h-12 flex-1 rounded-full py-3"
                  placeholder="Describe your legal matter..."
                  aria-label="Message Aegis Legal Intelligence"
                />
                <button
                  type="button"
                  onClick={() => submitMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-100/35 bg-gold-gradient text-slate-950 shadow-aureate transition duration-500 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-100" />
                Confidential guidance simulation
                <span className="text-slate-700">/</span>
                <Link href="/consultation" className="text-amber-100 transition hover:text-amber-50">
                  Book Consultation
                </Link>
                <span className="text-slate-700">/</span>
                <a href={AEGIS_PHONE_TEL} className="text-amber-100 transition hover:text-amber-50">
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.82, ease: premiumEase }}
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group fixed bottom-[calc(env(safe-area-inset-bottom)+13rem)] right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/30 bg-midnight/86 text-amber-100 shadow-aureate backdrop-blur-2xl transition duration-700 hover:border-amber-100/60 hover:bg-amber-100/10 sm:bottom-40 sm:right-6 sm:h-16 sm:w-16"
        aria-label={isOpen ? "Close Aegis Legal Intelligence" : "Open Aegis Legal Intelligence"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {hasUnread && !isOpen && (
          <span className="absolute right-0 top-0 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-100 opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-100" />
          </span>
        )}
        <span className="absolute -left-[12.6rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-midnight/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-100 opacity-0 shadow-glass backdrop-blur-xl transition duration-500 hover:opacity-100 group-hover:opacity-100 lg:block">
          Aegis Legal Intelligence
        </span>
        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-100" />
        <ExternalLink className="sr-only h-0 w-0" />
      </motion.button>
    </>
  );
}
