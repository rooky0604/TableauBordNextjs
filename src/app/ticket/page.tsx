"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface Attachment {
  name: string;
  size: number;
}

interface Message {
  id: number;
  from: "user" | "support";
  text: string;
  attachment?: Attachment | null;
}

export default function TicketForm() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "support",
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    },
  ]);

  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function addMessage(
    from: "user" | "support",
    text: string,
    attachment: Attachment | null = null,
  ) {
    setMessages((m) => [
      ...m,
      { id: Date.now() + Math.random(), from, text, attachment },
    ]);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    const text = value.trim();
    const file = fileRef.current?.files?.[0] ?? null;

    if (!text && !file) return;

    addMessage(
      "user",
      text || (file ? `Fichier: ${file.name}` : ""),
      file ? { name: file.name, size: file.size } : null,
    );

    setValue("");
    if (fileRef.current) fileRef.current.value = "";

    setSending(true);
    await new Promise((r) => setTimeout(r, 700));

    addMessage(
      "support",
      "Merci — nous avons bien reçu votre ticket. Nous revenons vers vous rapidement.",
    );

    setSending(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <h2 className="text-lg font-semibold">Assistance — Nouveau ticket</h2>
          <span className="ml-auto text-sm text-slate-500">
            Conversation style chat
          </span>
        </div>

        <div
          className="flex h-80 flex-col gap-3 overflow-auto p-4 sm:h-96"
          ref={listRef}
          role="log"
          aria-live="polite"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`max-w-[85%] ${m.from === "user" ? "ml-auto" : "mr-auto"}`}
              >
                <div
                  className={`inline-block break-words rounded-2xl p-3 shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-md bg-indigo-600 text-white"
                      : "rounded-bl-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{m.text}</div>

                  {m.attachment && (
                    <div className="mt-2 text-xs opacity-90">
                      📎 {m.attachment.name} (
                      {Math.round(m.attachment.size / 1024)} KB)
                    </div>
                  )}
                </div>

                <div className="mt-1 text-[11px] text-slate-400">
                  {m.from === "user" ? "Vous" : "Support"}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-slate-100 bg-white/30 p-4 dark:border-slate-800 dark:bg-slate-900/30"
        >
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                rows={2}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Écrivez votre message..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-indigo-600"
              />

              <div className="mt-2 text-xs text-slate-500">
                Conseil : décrivez votre problème clairement et joignez une
                capture d'écran si possible.
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <input ref={fileRef} type="file" id="file" className="hidden" />

              <label
                htmlFor="file"
                className="inline-flex cursor-pointer select-none items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
              >
                📎 Joindre
              </label>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:shadow-md disabled:opacity-60"
              >
                {sending ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
