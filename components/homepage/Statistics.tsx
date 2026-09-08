"use client";

import React, { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50, suffix: "K+", label: "Active Users" },
  { value: 120, suffix: "K+", label: "Roadmaps Generated" },
  { value: 92, suffix: "%", label: "Career Success Rate" },
  { value: 24, suffix: "/7", label: "AI Mentor Availability" }
];

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentCount = Math.floor(easeProgress * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatItem({ stat, index }: { stat: typeof stats[0], index: number }) {
  const { count, ref } = useCounter(stat.value, 2000 + (index * 200));

  return (
    <div ref={ref} className="group relative overflow-hidden rounded-3xl border border-[#073127]/10 bg-white p-6 text-center shadow-[0_8px_30px_rgba(7,49,39,0.05)] transition-all duration-300 hover:border-[#004838]/30 hover:shadow-[0_12px_40px_rgba(7,49,39,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#004838]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-2 text-3xl font-extrabold text-[#004838] sm:text-4xl">
        {count}{stat.suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#333F3C]">
        {stat.label}
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="relative bg-[#EBEDE8] py-20">
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#073127]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#073127]/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
