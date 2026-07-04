"use client";

import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const testimonials = [
  {
    name: "Sara Ahmed",
    role: "Marketing Lead, Nova Studio",
    quote:
      "Zurl replaced three separate tools we were using for links, QR codes, and click tracking. Our whole team switched in a day.",
  },
  {
    name: "Daniel Okoro",
    role: "Indie Developer",
    quote:
      "Custom aliases and instant QR codes for every link — exactly what I needed for a side project without any setup overhead.",
  },
  {
    name: "Priya Nair",
    role: "Event Organizer",
    quote:
      "We printed QR codes for every booth at our conference straight from Zurl. Generation was instant and the codes scanned perfectly.",
  },
  {
    name: "Tom Fischer",
    role: "Freelance Designer",
    quote:
      "Clean dashboard, fast link creation, and click history that actually makes sense. It just works the way you'd expect it to.",
  },
];

const AUTOPLAY_MS = 5000;

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = (i) => {
    setIndex((i + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) goTo(index + 1);
    if (diff < -50) goTo(index - 1);

    touchStartX.current = null;
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F7F7F5]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase">
          Testimonials
        </span>
        <h2
          className={
            display.className +
            " text-3xl sm:text-5xl font-bold mt-3 text-[#10131A]"
          }
        >
          What people are saying
        </h2>
      </div>

      <div
        className="max-w-3xl mx-auto relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide track */}
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="w-full flex-shrink-0 px-1"
              >
                <div className="bg-white border border-[#E7E7E3] rounded-3xl shadow-[0_1px_2px_rgba(16,19,26,0.04),0_12px_32px_-16px_rgba(16,19,26,0.15)] p-7 sm:p-10 flex flex-col items-center text-center min-h-[280px] justify-center">
                  <span className="text-4xl sm:text-5xl text-[#F5B700] leading-none mb-4">
                    “
                  </span>
                  <p className="text-base sm:text-xl text-[#10131A] leading-7 sm:leading-8 max-w-xl">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-3 mt-7">
                    <div className="h-11 w-11 rounded-full bg-[#16233F] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {initials(t.name)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-[#10131A]">
                        {t.name}
                      </p>
                      <p className="text-xs text-[#8A8F98]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows — desktop */}
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-5 h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E7E7E3] text-[#5B6168] hover:text-[#16233F] hover:border-[#16233F]/30 shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/20"
        >
          <FaChevronLeft size={14} />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-5 h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E7E7E3] text-[#5B6168] hover:text-[#16233F] hover:border-[#16233F]/30 shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/20"
        >
          <FaChevronRight size={14} />
        </button>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/20 ${
                i === index ? "w-6 bg-[#16233F]" : "w-2 bg-[#D9D9D5] hover:bg-[#B8B8B3]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;