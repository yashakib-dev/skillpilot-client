"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ConversationSummary {
  _id: string;
  conversationId: string;
  title: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ConversationFull {
  _id: string;
  conversationId: string;
  title: string;
  messages: ChatMessage[];
  messageCount: number;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "0ms" }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "150ms" }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "300ms" }} />
    </span>
  );
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

function MentorPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [conversationId, setConversationId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Authenticated fetch helper - reads session directly on each call
  const apiFetch = useCallback(async (path: string, options: RequestInit = {}) => {
    const userId = session?.user?.id;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(userId ? { "x-user-id": userId } : {}),
      ...(options.headers as Record<string, string> || {}),
    };
    return fetch(`${SERVER_URL}${path}`, { ...options, headers });
  }, [SERVER_URL, session?.user?.id]);

  // Load a specific conversation
  const loadConversation = useCallback(async (cid: string) => {
    try {
      const res = await apiFetch(`/api/conversations/${cid}`);
      if (res.ok) {
        const data: ConversationFull = await res.json();
        setMessages(data.messages || []);
        setConversationId(data.conversationId);
        setIsInitialized(true);
      } else if (res.status === 404) {
        setMessages([]);
        setIsInitialized(true);
      }
    } catch {
      setMessages([]);
      setIsInitialized(true);
    }
  }, [apiFetch]);

  // Load conversation list
  const loadConversations = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await apiFetch('/api/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoadingHistory(false);
    }
  }, [apiFetch]);

  // Load conversation ID from URL or create new
  useEffect(() => {
    const cid = searchParams.get("conversationId");
    if (cid && cid !== conversationId) {
      setConversationId(cid);
      loadConversation(cid);
    } else if (!cid && !conversationId) {
      setConversationId(generateId());
      setIsInitialized(true);
    }
  }, [searchParams, conversationId, loadConversation]);

  // Load conversation list on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Save message to server
  const saveMessage = useCallback(async (cid: string, msg: ChatMessage, isFirst: boolean) => {
    try {
      if (isFirst) {
        await apiFetch("/api/conversations", {
          method: "POST",
          body: JSON.stringify({ conversationId: cid, message: msg }),
        });
      } else {
        await apiFetch(`/api/conversations/${cid}`, {
          method: "PATCH",
          body: JSON.stringify({ message: msg }),
        });
      }
      loadConversations();
    } catch {
      // Silently fail
    }
  }, [apiFetch, loadConversations]);

  const handleNewConversation = () => {
    const cid = generateId();
    setConversationId(cid);
    setMessages([]);
    setInput("");
    setShowHistory(false);
    const url = new URL(window.location.href);
    url.searchParams.set("conversationId", cid);
    window.history.pushState({}, "", url.toString());
    inputRef.current?.focus();
  };

  const handleSelectConversation = (cid: string) => {
    setConversationId(cid);
    setShowHistory(false);
    const url = new URL(window.location.href);
    url.searchParams.set("conversationId", cid);
    window.history.pushState({}, "", url.toString());
    loadConversation(cid);
  };

  const handleDeleteConversation = async (e: React.MouseEvent, cid: string) => {
    e.stopPropagation();
    try {
      const res = await apiFetch(`/api/conversations/${cid}`, { method: "DELETE" });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.conversationId !== cid));
        if (conversationId === cid) {
          handleNewConversation();
        }
        toast.success("Conversation deleted");
      }
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const isFirst = messages.length === 0;
    await saveMessage(conversationId, userMessage, isFirst);

    try {
      const res = await fetch(`${SERVER_URL}/api/ai/mentor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          conversation: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to get response");
      }

      const aiMessage: ChatMessage = { role: "assistant", content: data.content };
      setMessages((prev) => [...prev, aiMessage]);

      await saveMessage(conversationId, aiMessage, false);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messageCount = messages.length;

  // Update URL when conversationId changes
  useEffect(() => {
    if (isInitialized && conversationId) {
      const url = new URL(window.location.href);
      url.searchParams.set("conversationId", conversationId);
      window.history.replaceState({}, "", url.toString());
    }
  }, [conversationId, isInitialized]);

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            aria-label="Toggle conversation history"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">AI Career Mentor</h1>
            <p className="text-sm text-slate-400">
              {messageCount > 0
                ? `${messageCount} message${messageCount !== 1 ? "s" : ""}`
                : "Ask me anything about your career"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            History
          </button>
          <button
            onClick={handleNewConversation}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 transition-colors hover:bg-indigo-500/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation history sidebar */}
        {showHistory && (
          <div className="absolute inset-0 z-30 bg-slate-900/95 backdrop-blur-sm lg:relative lg:w-72 lg:shrink-0 lg:bg-transparent lg:backdrop-blur-none lg:border-r lg:border-slate-800 lg:mr-6 overflow-y-auto">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">Conversations</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  aria-label="Close conversation history"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {isLoadingHistory ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 rounded-xl bg-slate-800/50 animate-pulse" />
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">No conversations yet</p>
              ) : (
                <div className="space-y-1">
                  {conversations.map((conv) => (
                    <button
                      key={conv.conversationId}
                      onClick={() => handleSelectConversation(conv.conversationId)}
                      className={`w-full text-left rounded-xl px-3 py-3 transition-all ${
                        conv.conversationId === conversationId
                          ? "bg-indigo-500/10 border border-indigo-500/20"
                          : "bg-slate-800/40 border border-transparent hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-200">
                            {conv.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {conv.messageCount} msgs · {formatTime(conv.updatedAt)}
                          </p>
                        </div>
                        <span
                          onClick={(e) => handleDeleteConversation(e, conv.conversationId)}
                          className="shrink-0 cursor-pointer rounded-lg p-1 text-slate-600 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat panel */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.length === 0 && !isLoading && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">How can I help you today?</h2>
                <p className="max-w-md text-sm text-slate-400">
                  Ask me about career paths, skill development, job search strategies, interview prep, or tech industry trends.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[
                    "What career path is right for me?",
                    "How do I prepare for tech interviews?",
                    "What skills should I learn next?",
                    "How to transition into tech?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700/50"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate-800 border border-slate-700/50 px-5 py-3 sm:max-w-[75%]">
                  <LoadingDots />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 p-2 transition-colors focus-within:border-indigo-500/50 focus-within:bg-slate-800">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your career mentor anything..."
                disabled={isLoading}
                className="min-h-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-slate-600">
              AI responses are generated by Gemini. Verify important information.
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile history */}
      {showHistory && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}

export default function MentorPage() {
  return (
    <React.Suspense fallback={
      <div className="flex h-[calc(100vh-140px)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading mentor...</p>
        </div>
      </div>
    }>
      <MentorPageInner />
    </React.Suspense>
  );
}
