"use client";

import dynamic from "next/dynamic";
import { FloatingContactSystem } from "@/components/FloatingContactSystem";

const LegalAssistantChatbot = dynamic(
  () => import("@/components/LegalAssistantChatbot").then((module) => module.LegalAssistantChatbot),
  {
    ssr: false,
    loading: () => null
  }
);

export function ConversionLayer() {
  return (
    <>
      <FloatingContactSystem />
      <LegalAssistantChatbot />
    </>
  );
}
