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
    <main className="min-h-screen bg-[#EBEDE8] text-[#333F3C]">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-[#073127]/10 bg-white p-8 shadow-[0_20px_50px_rgba(7,49,39,0.08)] sm:p-10">
            <span className="mb-5 inline-flex items-center rounded-full border border-[#004838]/20 bg-[#004838]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#073127]">
              Contact
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#073127] sm:text-4xl">
              Let’s talk about your next step.
            </h1>
            <p className="mt-4 text-lg leading-8 text-[#333F3C]">
              Whether you want to discuss a career path, share feedback, or ask a question, we are here to help.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#333F3C]">
              <div className="rounded-2xl border border-[#073127]/10 bg-[#EBEDE8]/60 p-4">
                <p className="font-bold text-[#073127]">Email</p>
                <p className="mt-1">hello@skillpilot.com</p>
              </div>
              <div className="rounded-2xl border border-[#073127]/10 bg-[#EBEDE8]/60 p-4">
                <p className="font-bold text-[#073127]">Location</p>
                <p className="mt-1">Remote • Available worldwide</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#073127]/10 bg-white p-8 shadow-[0_20px_50px_rgba(7,49,39,0.08)] sm:p-10">
            <h2 className="text-2xl font-extrabold text-[#073127]">Send a message</h2>
            <p className="mt-2 text-sm leading-7 text-[#333F3C]">
              Fill out the form and we will get back to you shortly.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-[#004838]/30 bg-[#004838]/10 p-4 text-sm font-bold text-[#073127]">
                Thanks! Your message has been received. We will be in touch soon.
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#073127]" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full rounded-2xl border border-[#073127]/20 bg-white px-4 py-3 text-sm text-[#073127] outline-none transition focus:border-[#004838]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#073127]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full rounded-2xl border border-[#073127]/20 bg-white px-4 py-3 text-sm text-[#073127] outline-none transition focus:border-[#004838]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#073127]" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="w-full rounded-2xl border border-[#073127]/20 bg-white px-4 py-3 text-sm text-[#073127] outline-none transition focus:border-[#004838]"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#004838] px-6 py-3 text-sm font-bold text-[#E2FB6C] shadow-sm transition hover:bg-[#073127]"
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
