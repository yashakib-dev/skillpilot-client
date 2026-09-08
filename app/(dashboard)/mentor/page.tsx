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
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#004838]" style={{ animationDelay: "0ms" }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#004838]" style={{ animationDelay: "150ms" }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#004838]" style={{ animationDelay: "300ms" }} />
    </span>
  );
}

function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
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
  const { data: session, isPending: isSessionPending } = useSession();

  const [conversationId, setConversationId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadedCidRef = useRef<string | null>(null);

  const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const userId = session?.user?.id;

  // Scroll to bottom of messages container without scrolling the main window
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading, scrollToBottom]);

  // Focus input on mount without scrolling the window
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // Authenticated fetch helper
  const apiFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(userId ? { "x-user-id": userId } : {}),
        ...((options.headers as Record<string, string>) || {}),
      };
      return fetch(`${SERVER_URL}${path}`, { ...options, headers });
    },
    [SERVER_URL, userId]
  );

  // Load conversation list from server
  const loadConversations = useCallback(async () => {
    if (!userId) return;
    setIsLoadingHistory(true);
    try {
      const res = await apiFetch("/api/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error loading conversations:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [apiFetch, userId]);

  // Load a specific conversation by ID
  const loadConversation = useCallback(
    async (cid: string) => {
      if (!cid || !userId) return;
      setIsFetchingMessages(true);
      loadedCidRef.current = cid;
      try {
        const res = await apiFetch(`/api/conversations/${cid}`);
        if (res.ok) {
          const data: ConversationFull = await res.json();
          setMessages(data.messages || []);
        } else if (res.status === 404) {
          setMessages([]);
        } else {
          toast.error("Failed to load conversation details");
          setMessages([]);
        }
      } catch (err) {
        console.error("Failed to fetch conversation:", err);
        setMessages([]);
      } finally {
        setIsFetchingMessages(false);
      }
    },
    [apiFetch, userId]
  );

  // Sync conversation list when userId becomes available
  useEffect(() => {
    if (userId) {
      loadConversations();
    }
  }, [userId, loadConversations]);

  // Sync conversation state with URL parameter `conversationId`
  useEffect(() => {
    if (isSessionPending || !userId) return;

    const cidFromUrl = searchParams.get("conversationId");

    if (cidFromUrl) {
      if (loadedCidRef.current !== cidFromUrl) {
        loadedCidRef.current = cidFromUrl;
        setConversationId(cidFromUrl);
        loadConversation(cidFromUrl);
      }
    } else {
      // If no conversationId in URL and no current conversation loaded
      if (!conversationId || !loadedCidRef.current) {
        const newCid = generateId();
        loadedCidRef.current = newCid;
        setConversationId(newCid);
        setMessages([]);
        router.replace(`/mentor?conversationId=${newCid}`, { scroll: false });
      }
    }
  }, [searchParams, isSessionPending, userId, conversationId, loadConversation, router]);

  // Save message to backend server
  const saveMessage = useCallback(
    async (cid: string, msg: ChatMessage, isFirst: boolean) => {
      if (!userId) return;
      try {
        if (isFirst) {
          const postRes = await apiFetch("/api/conversations", {
            method: "POST",
            body: JSON.stringify({ conversationId: cid, message: msg }),
          });

          // Fallback to PATCH if conversation already existed on server
          if (!postRes.ok) {
            await apiFetch(`/api/conversations/${cid}`, {
              method: "PATCH",
              body: JSON.stringify({ message: msg }),
            });
          }
        } else {
          await apiFetch(`/api/conversations/${cid}`, {
            method: "PATCH",
            body: JSON.stringify({ message: msg }),
          });
        }
        loadConversations();
      } catch (err) {
        console.error("Failed to save message to server:", err);
      }
    },
    [apiFetch, userId, loadConversations]
  );

  const handleNewConversation = () => {
    const newCid = generateId();
    setConversationId(newCid);
    setMessages([]);
    setInput("");
    setShowHistory(false);
    loadedCidRef.current = newCid;
    router.push(`/mentor?conversationId=${newCid}`);
    inputRef.current?.focus();
  };

  const handleSelectConversation = (cid: string) => {
    if (cid === conversationId && loadedCidRef.current === cid) {
      setShowHistory(false);
      return;
    }
    setConversationId(cid);
    setShowHistory(false);
    loadedCidRef.current = cid;
    router.push(`/mentor?conversationId=${cid}`);
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
      } else {
        toast.error("Failed to delete conversation");
      }
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading || !userId) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const isFirst = messages.length === 0;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await saveMessage(conversationId, userMessage, isFirst);

    try {
      const res = await apiFetch("/api/ai/mentor", {
        method: "POST",
        body: JSON.stringify({
          message: trimmed,
          conversation: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to get response from AI mentor");
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

  if (isSessionPending) {
    return (
      <div className="flex h-[calc(100vh-140px)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#004838] border-t-transparent" />
          <p className="text-sm font-medium text-[#333F3C]/70">Loading AI mentor...</p>
        </div>
      </div>
    );
  }

  const messageCount = messages.length;

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#073127]/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            aria-label="Toggle conversation history"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBEDE8] text-[#333F3C] transition-colors hover:bg-slate-200 lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#004838]/10 text-[#004838]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#073127]">AI Career Mentor</h1>
            <p className="text-sm text-[#333F3C]/70">
              {messageCount > 0
                ? `${messageCount} message${messageCount !== 1 ? "s" : ""}`
                : "Ask me anything about your career"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-[#073127]/10 bg-white px-4 py-2 text-sm font-medium text-[#073127] transition-colors hover:bg-[#EBEDE8]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            History {conversations.length > 0 && `(${conversations.length})`}
          </button>
          <button
            onClick={handleNewConversation}
            className="inline-flex items-center gap-2 rounded-full border border-[#004838]/30 bg-[#004838] px-5 py-2 text-sm font-semibold text-[#E2FB6C] shadow transition-colors hover:bg-[#073127]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Chat
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden pt-2">
        {/* Conversation history sidebar */}
        {showHistory && (
          <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm lg:relative lg:w-72 lg:shrink-0 lg:bg-transparent lg:backdrop-blur-none lg:border-r lg:border-[#073127]/10 lg:mr-6 overflow-y-auto">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#073127]">Conversations</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  aria-label="Close conversation history"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#333F3C]/70 hover:text-[#073127] hover:bg-[#EBEDE8] lg:hidden"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {isLoadingHistory ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 rounded-xl bg-[#EBEDE8] animate-pulse" />
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <p className="text-sm text-[#333F3C]/60 text-center py-8">No past conversations</p>
              ) : (
                <div className="space-y-1.5">
                  {conversations.map((conv) => (
                    <button
                      key={conv.conversationId}
                      onClick={() => handleSelectConversation(conv.conversationId)}
                      className={`w-full text-left rounded-xl px-3 py-3 transition-all ${
                        conv.conversationId === conversationId
                          ? "bg-[#004838]/10 border border-[#004838]/20 font-semibold"
                          : "bg-white border border-[#073127]/5 hover:bg-[#EBEDE8]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#073127]">
                            {conv.title || "Untitled Chat"}
                          </p>
                          <p className="mt-0.5 text-xs text-[#333F3C]/60">
                            {conv.messageCount} msg{conv.messageCount !== 1 ? "s" : ""}
                            {conv.updatedAt ? ` · ${formatTime(conv.updatedAt)}` : ""}
                          </p>
                        </div>
                        <span
                          onClick={(e) => handleDeleteConversation(e, conv.conversationId)}
                          className="shrink-0 cursor-pointer rounded-lg p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete conversation"
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
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {isFetchingMessages ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#004838] border-t-transparent mb-2" />
                <p className="text-xs text-[#333F3C]/70">Fetching conversation history...</p>
              </div>
            ) : messages.length === 0 && !isLoading ? (
              <div className="flex h-full flex-col items-center justify-center text-center px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#004838]/10 text-[#004838] mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#073127] mb-2">How can I help you today?</h2>
                <p className="max-w-md text-sm text-[#333F3C]/70">
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
                      className="rounded-full border border-[#073127]/10 bg-white px-4 py-2 text-xs font-semibold text-[#073127] shadow-xs transition-colors hover:border-[#004838]/30 hover:bg-[#004838]/10 hover:text-[#004838]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-[#004838] text-white rounded-br-md shadow-xs font-normal"
                        : "bg-white text-[#333F3C] rounded-bl-md border border-[#073127]/10 shadow-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-[#073127]/10 px-5 py-3 sm:max-w-[75%] shadow-xs">
                  <LoadingDots />
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-[#073127]/10 pt-4">
            <div className="flex items-end gap-3 rounded-2xl border border-[#073127]/10 bg-white p-2 transition-colors focus-within:border-[#004838]/50 shadow-xs">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your career mentor anything..."
                disabled={isLoading || isFetchingMessages}
                className="min-h-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#073127] placeholder-[#333F3C]/50 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || isFetchingMessages}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#004838] text-[#E2FB6C] transition-all hover:bg-[#073127] disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-[#333F3C]/60">
              AI responses are powered by Gemini. Verify important advice.
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile history */}
      {showHistory && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}

export default function MentorPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-[calc(100vh-140px)] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#004838] border-t-transparent" />
            <p className="text-sm text-[#333F3C]/70">Loading mentor...</p>
          </div>
        </div>
      }
    >
      <MentorPageInner />
    </React.Suspense>
  );
}
