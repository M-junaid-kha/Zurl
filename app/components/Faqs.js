"use client";

import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { FaPlus, FaMinus } from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const faqData = [
  {
    question: "What is a URL shortener?",
    answer:
      "A URL shortener converts long web links into short, easy-to-share URLs without changing the destination.",
  },
  {
    question: "Can I create custom short links?",
    answer:
      "Yes! You can create personalized aliases instead of using randomly generated characters.",
  },
  {
    question: "Does every link get a QR Code?",
    answer:
      "Yes. A QR Code is automatically generated for every shortened link so you can share it instantly.",
  },
  {
    question: "Can I track link clicks?",
    answer:
      "Absolutely. Your dashboard shows the total number of clicks for each shortened link.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You can shorten links without signing in, but creating an account lets you save and manage all your links.",
  },
  {
    question: "Are my links stored safely?",
    answer:
      "Yes. Your links are securely stored and available whenever you log in to your account.",
  },
];

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-24 px-6 bg-[#F7F7F5]">
      <span className="block text-center text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase mb-3">
        Questions
      </span>

      <h2
        className={
          display.className +
          " text-5xl md:text-7xl font-bold text-center text-[#10131A] mb-5"
        }
      >
        FAQs
      </h2>

      <p className="text-center text-[#5B6168] max-w-2xl mx-auto mb-14">
        Have questions? Here are answers to the most common ones.
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((item, i) => {
          const isOpen = openFaq === i;

          return (
            <div
              key={item.question}
              className={`group rounded-2xl bg-white border overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                isOpen
                  ? "border-[#16233F]/40 shadow-[0_16px_32px_-22px_rgba(22,35,63,0.35)]"
                  : "border-[#E7E7E3] hover:border-[#16233F]/25 hover:shadow-[0_12px_24px_-18px_rgba(22,35,63,0.2)]"
              }`}
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/20 flex justify-between items-center gap-4 px-6 py-5 text-left"
              >
                <h3
                  className={`text-base md:text-lg font-semibold transition-colors ${
                    isOpen ? "text-[#16233F]" : "text-[#10131A]"
                  }`}
                >
                  {item.question}
                </h3>

                <span
                  className={` shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ease-out ${
                    isOpen
                      ? "bg-[#16233F] text-white rotate-180"
                      : "bg-[#F5B700]/15 text-[#B3843C] group-hover:bg-[#F5B700]/25"
                  }`}
                >
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-[#5B6168] leading-7 text-sm md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faqs;