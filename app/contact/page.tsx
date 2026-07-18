"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.4)] sm:p-10">
            <span className="mb-5 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Contact
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let’s talk about your next step.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Whether you want to discuss a career path, share feedback, or ask a question, we are here to help.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-400">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold text-slate-100">Email</p>
                <p className="mt-1">hello@skillpilot.com</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold text-slate-100">Location</p>
                <p className="mt-1">Remote • Available worldwide</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.4)] sm:p-10">
            <h2 className="text-2xl font-semibold text-white">Send a message</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Fill out the form and we will get back to you shortly.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                Thanks! Your message has been received. We will be in touch soon.
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
