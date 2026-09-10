"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    src: "/colleagues-discussing-new-ideas-business-meeting.jpg",
    alt: "Colleagues discussing new ideas in a business meeting",
    caption: "Real-world growth",
    title: "Collaborative Learning & Mentorship",
  },
  {
    src: "/brain.png",
    alt: "Business people working together",
    caption: "Team-driven success",
    title: "Grow Together, Achieve More",
  },
  {
    src: "/work.png",
    alt: "Having an important career conversation",
    caption: "Expert guidance",
    title: "Meaningful Career Conversations",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full flex flex-col justify-center items-center bg-[#EBEDE8] text-[#333F3C] pt-28 pb-20 px-6 lg:px-8 overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-[400px] w-[650px] rounded-full bg-[#E2FB6C]/25 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center flex flex-col items-center">

        <div className="mt-6 w-full max-w-[1200px] relative group">
          <div className="overflow-hidden rounded-2xl border border-[#073127]/10 bg-white shadow-[0_20px_45px_rgba(7,49,39,0.08)]">
            <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] w-full hero-swiper">
              <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="w-full h-full"
              >
                {slides.map((slide, i) => (
                  <SwiperSlide key={i} className="relative w-full h-full">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-cover object-center transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#073127]/70 via-transparent to-transparent" />

                    <div className="absolute bottom-10 left-5 right-5 flex items-center justify-between text-white">
                      <div className="text-left">
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#E2FB6C]">
                          {slide.caption}
                        </div>
                        <div className="text-base sm:text-lg font-bold">
                          {slide.title}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <h1 className="mt-6 mb-4 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#073127] leading-[1.1]">
          Navigate Your Career With <br className="hidden sm:block" />
          <span className="text-[#004838]">Personalized Precision</span>
        </h1>

        <p className="mb-10 max-w-2xl text-base sm:text-lg md:text-xl text-[#333F3C]/90 font-normal leading-relaxed">
          Get customized learning roadmaps, smart skill recommendations, and expert career guidance tailored to your goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/add-career"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#004838] px-8 py-4 text-base font-bold text-[#E2FB6C] shadow-[0_8px_20px_rgba(0,72,56,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#073127] hover:shadow-[0_12px_24px_rgba(0,72,56,0.35)]"
          >
            Build My Roadmap
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/explore"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-[#073127]/20 bg-white/90 px-8 py-4 text-base font-semibold text-[#073127] shadow-xs transition-all duration-300 hover:border-[#004838] hover:bg-white"
          >
            Explore Careers
          </Link>
        </div>

      </div>

      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 10px;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: #E2FB6C;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 22px;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      `}</style>
    </section>
  );
}
