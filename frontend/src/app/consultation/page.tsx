"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import { FormEvent, useState } from "react";
import { AEGIS_PHONE_DISPLAY, AEGIS_PHONE_TEL, AEGIS_WHATSAPP_URL, trustLabels } from "@/lib/contact";
import { submitConsultation } from "@/lib/api";
import type { ConsultationPayload } from "@/types";

const initialForm: ConsultationPayload = {
  name: "",
  email: "",
  phone: "",
  caseDescription: ""
};

const inputMotion = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 }
};

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ConsultationPage() {
  const [form, setForm] = useState<ConsultationPayload>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const updateField = (field: keyof ConsultationPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const missingFields = Object.entries(form).filter(([, value]) => !value.trim());

    if (missingFields.length > 0) {
      setError("Please complete every field so the Aegis board can assess your matter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitConsultation(form);
      setSuccessMessage(response.message);
      setIsSuccessModalOpen(true);
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to schedule consultation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-midnight pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-24 h-96 w-96 rounded-full bg-amber-300/12 blur-3xl animate-aurora" />
        <div className="absolute right-[-7rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(247,231,180,0.12),transparent_34%),linear-gradient(115deg,rgba(9,13,22,0.98)_0%,rgba(15,23,42,0.76)_42%,rgba(9,13,22,0.96)_100%)]" />
      </div>

      <section className="section-shell relative grid min-h-[calc(100svh-6rem)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24 2xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: premiumEase }}
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-slate-400 transition duration-500 hover:text-amber-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
          <p className="eyebrow mt-12">Private Consultation</p>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(3.1rem,9vw,7.2rem)] leading-[0.88] tracking-[-0.075em] text-white">
            A discreet first move for serious legal matters.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            Share the essential contours of your matter. The intake is intentionally elegant,
            concise, and designed for rapid board-level triage by the Aegis legal team.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { icon: LockKeyhole, label: "Confidential & Secure" },
              { icon: Clock, label: "Under 10 minutes" },
              { icon: ShieldCheck, label: "Senior review" }
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="glass-panel rounded-2xl p-5 transition duration-700 hover:border-amber-100/25">
                <Icon className="h-5 w-5 text-amber-200" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={AEGIS_PHONE_TEL} className="conversion-pill w-full sm:w-auto">
              <Phone className="h-4 w-4 text-amber-100" />
              Call Legal Desk
            </a>
            <a href={AEGIS_WHATSAPP_URL} target="_blank" rel="noreferrer" className="emerald-pill w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" />
              Speak on WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 42, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.12, ease: premiumEase }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.8rem] bg-radial-aura blur-2xl" />
          <form
            onSubmit={handleSubmit}
            className="glass-panel relative overflow-hidden rounded-[2.5rem] p-5 sm:p-8 lg:p-10"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
            <div className="mb-9 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow">Aegis Intake</p>
                <h2 className="mt-3 font-display text-4xl leading-none tracking-[-0.06em] text-white sm:text-5xl">
                  Consultation Request
                </h2>
              </div>
              <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/25 bg-amber-200/10 text-amber-100 sm:flex">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <div className="grid gap-5">
              <motion.label
                {...inputMotion}
                transition={{ delay: 0.08 }}
                className="group block"
              >
                <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  <UserRound className="h-4 w-4 text-amber-200" />
                  Full Name
                </span>
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="premium-input"
                  placeholder="Alexandra Morgan"
                  autoComplete="name"
                  required
                  maxLength={80}
                />
              </motion.label>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.label {...inputMotion} transition={{ delay: 0.14 }} className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <Mail className="h-4 w-4 text-amber-200" />
                    Email
                  </span>
                  <input
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="premium-input"
                    placeholder="alexandra@example.com"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={120}
                  />
                </motion.label>

                <motion.label {...inputMotion} transition={{ delay: 0.2 }} className="block">
                  <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <Phone className="h-4 w-4 text-amber-200" />
                    Phone
                  </span>
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="premium-input"
                    placeholder="+1 (212) 555-0148"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    maxLength={32}
                  />
                </motion.label>
              </div>

              <motion.label {...inputMotion} transition={{ delay: 0.26 }} className="block">
                <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-amber-200" />
                  Case Description
                </span>
                <textarea
                  value={form.caseDescription}
                  onChange={(event) => updateField("caseDescription", event.target.value)}
                  className="premium-input min-h-40 resize-none leading-7"
                  placeholder="Describe the matter, desired outcome, urgency, and any relevant parties."
                  required
                  minLength={24}
                  maxLength={1800}
                />
              </motion.label>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm leading-6 text-red-100"
                >
                  {error}
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 flex gap-3 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="luxury-button mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                  Scheduling Review
                </>
              ) : (
                <>
                  Submit to Aegis Board
                  <ArrowRight className="ml-3 h-4 w-4" />
                </>
              )}
            </motion.button>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-400"
                >
                  {label}
                </span>
              ))}
            </div>
          </form>
        </motion.div>
      </section>

      <AnimatePresence>
        {isSuccessModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-midnight/80 px-5 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.72, ease: premiumEase }}
              className="glass-panel relative w-full max-w-xl overflow-hidden rounded-[2.5rem] p-7 text-center sm:p-10"
            >
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-300 transition duration-500 hover:border-amber-100/40 hover:text-amber-100"
                aria-label="Close success confirmation"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100/30 bg-emerald-300/10 text-emerald-100 shadow-[0_0_58px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="eyebrow mt-8">Consultation Routed</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.07em] text-white sm:text-6xl">
                The Aegis board has received your matter.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-slate-300">
                {successMessage || "Consultation successfully scheduled with the Aegis legal board."}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={AEGIS_PHONE_TEL} className="conversion-pill">
                  <Phone className="h-4 w-4 text-amber-100" />
                  Call {AEGIS_PHONE_DISPLAY}
                </a>
                <a href={AEGIS_WHATSAPP_URL} target="_blank" rel="noreferrer" className="emerald-pill">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Counsel
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
