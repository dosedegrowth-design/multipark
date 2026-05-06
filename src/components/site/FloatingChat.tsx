"use client";

import { useState } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-[0_8px_30px_rgba(225,29,46,0.4)] flex items-center justify-center transition-all hover:scale-105",
          open
            ? "bg-[var(--color-mp-ink)] text-white"
            : "bg-[var(--color-mp-red)] text-white"
        )}
        aria-label="Chat"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-40px)] max-w-[380px] h-[560px] max-h-[calc(100vh-130px)] bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] border border-[var(--color-mp-line)] overflow-hidden flex flex-col animate-fade-up">
          {/* Header */}
          <div className="bg-[var(--color-mp-wine-900)] text-white p-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[var(--color-mp-red)] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold leading-tight">Multipark</div>
                <div className="text-xs text-white/60 flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 bg-[var(--color-mp-success)] rounded-full" />
                  online · responde em segundos
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[var(--color-mp-cream)] p-4 space-y-3">
            <BotBubble>
              Oi! Quer reservar uma vaga? 🚗 Posso te ajudar em 1 minuto.
            </BotBubble>

            <div className="grid grid-cols-2 gap-2">
              <SuggestButton>Aeroporto</SuggestButton>
              <SuggestButton>Centro urbano</SuggestButton>
              <SuggestButton>Mensalista</SuggestButton>
              <SuggestButton>Falar com humano</SuggestButton>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[var(--color-mp-line)] bg-white">
            <div className="flex items-center gap-2 bg-[var(--color-mp-cream)] rounded-full px-4 py-2.5">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-mp-text-muted)]"
              />
              <button className="h-8 w-8 rounded-full bg-[var(--color-mp-red)] text-white flex items-center justify-center hover:bg-[var(--color-mp-red-hover)]">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-[10px] text-center mt-2 text-[var(--color-mp-text-muted)] font-mono uppercase tracking-wider">
              Powered by IA · 24h · escala humano quando precisa
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 max-w-[85%]">
      <div className="h-6 w-6 rounded-full bg-[var(--color-mp-red)] shrink-0 mt-0.5 flex items-center justify-center">
        <ArrowRight className="h-3 w-3 text-white" />
      </div>
      <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm text-[var(--color-mp-text)] shadow-sm">
        {children}
      </div>
    </div>
  );
}

function SuggestButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-white border border-[var(--color-mp-line)] rounded-full px-3 py-2 text-xs font-medium text-[var(--color-mp-text)] hover:border-[var(--color-mp-red)] hover:text-[var(--color-mp-red)] transition-colors">
      {children}
    </button>
  );
}
