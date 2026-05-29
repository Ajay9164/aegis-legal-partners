"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AEGIS_PHONE_TEL, AEGIS_WHATSAPP_URL } from "@/lib/contact";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function FloatingContactSystem() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const promptTimer = window.setTimeout(() => setShowPrompt(true), 4200);
    const closeTimer = window.setTimeout(() => setShowPrompt(false), 11800);

    return () => {
      window.clearTimeout(promptTimer);
      window.clearTimeout(closeTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="fixed bottom-[calc(env(safe-area-inset-bottom)+9.25rem)] left-4 right-4 z-40 mx-auto max-w-sm rounded-[1.65rem] border border-amber-100/20 bg-midnight/82 p-4 shadow-glass backdrop-blur-2xl sm:left-auto sm:right-6 sm:bottom-28"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/60 to-transparent" />
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-100/25 bg-amber-100/10 text-amber-100 shadow-aureate">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-100">
                  Legal Desk Online
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Average Response Time: Under 10 Minutes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 md:bottom-8">
        <motion.a
          href={AEGIS_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Connect Privately via WhatsApp"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: premiumEase }}
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/30 bg-emerald-300/12 text-emerald-100 shadow-[0_0_48px_rgba(16,185,129,0.24)] backdrop-blur-2xl transition duration-700 hover:border-emerald-100/60 hover:bg-emerald-300/18 sm:h-16 sm:w-16"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-300/20 animate-ping opacity-30" />
          <span className="absolute -left-[17.5rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-midnight/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-100 opacity-0 shadow-glass backdrop-blur-xl transition duration-500 group-hover:opacity-100 lg:block">
            Connect Privately via WhatsApp
          </span>
          <MessageCircle className="relative h-6 w-6" />
        </motion.a>

        <motion.a
          href={AEGIS_PHONE_TEL}
          aria-label="Call Legal Desk"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.68, ease: premiumEase }}
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/30 bg-gold-gradient text-slate-950 shadow-aureate transition duration-700 hover:shadow-[0_0_82px_rgba(214,168,79,0.34)] sm:h-16 sm:w-16"
        >
          <span className="absolute -left-[11.6rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-midnight/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-100 opacity-0 shadow-glass backdrop-blur-xl transition duration-500 group-hover:opacity-100 lg:block">
            Call Legal Desk
          </span>
          <Phone className="h-6 w-6" />
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.8, ease: premiumEase }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-midnight/92 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-18px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:hidden"
      >
        <div className="mx-auto flex max-w-md items-center gap-3">
          <a
            href={AEGIS_PHONE_TEL}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-100/30 bg-amber-100/10 text-amber-100"
            aria-label="Call Legal Desk"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Link href="/consultation" className="luxury-button min-h-12 flex-1 px-4 text-[0.68rem]">
            Confidential Consultation
          </Link>
          <a
            href={AEGIS_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-100/30 bg-emerald-300/12 text-emerald-100"
            aria-label="Speak on WhatsApp"
          >
            <ShieldCheck className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </>
  );
}
