"use client";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const EMAIL = "hello@zurl.com";

const socials = [
  { label: "Twitter / X", handle: "@zurl" },
  { label: "GitHub", handle: "M-junaid-kha" },
  { label: "Instagram", handle: "@zurl.app" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="px-4 sm:px-6 min-h-screen pb-20 bg-[#F7F7F5]">
      <div className="max-w-2xl mx-auto text-center pt-14 sm:pt-16">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase">
          Contact
        </span>

        <h1
          className={
            display.className +
            " text-4xl sm:text-6xl lg:text-7xl font-bold mt-3 leading-[1.05] text-[#10131A]"
          }
        >
          Let's connect.
        </h1>

        <p className="text-base sm:text-lg text-[#5B6168] mt-5">
          Reach out through email or find us on social media.
        </p>
      </div>

      {/* Email */}
      <div className="w-full max-w-2xl mx-auto mt-10 bg-white border border-[#E7E7E3] rounded-3xl shadow-[0_1px_2px_rgba(16,19,26,0.04),0_12px_32px_-16px_rgba(16,19,26,0.15)] p-6 sm:p-7 flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[#8A8F98]">
          Email
        </span>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span
            className="text-lg sm:text-2xl font-semibold text-[#10131A]"
            style={{ fontFamily: "monospace" }}
          >
            {EMAIL}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-xl font-medium text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 cursor-pointer transition-all duration-200 ease-in-out active:scale-95 ${
              copied
                ? "bg-[#F5B700]/15 text-[#B3843C] border border-[#F5B700]/40"
                : "bg-[#16233F] text-white hover:bg-[#1E3057]"
            }`}
          >
            {copied ? (
              <>
                <FaCheck className="text-[11px]" /> Copied
              </>
            ) : (
              <>
                <FaCopy className="text-[11px]" /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Socials */}
      <div className="w-full max-w-2xl mx-auto mt-5 bg-white border border-[#E7E7E3] rounded-3xl shadow-[0_1px_2px_rgba(16,19,26,0.04),0_12px_32px_-16px_rgba(16,19,26,0.15)] p-6 sm:p-7">
        <span className="block text-xs font-medium uppercase tracking-wide text-[#8A8F98] text-center mb-3">
          Find us on
        </span>
        <div className="flex flex-col divide-y divide-[#E7E7E3]">
          {socials.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between py-4 group"
            >
              <span className="text-sm sm:text-base text-[#5B6168] group-hover:text-[#16233F] transition-colors">
                {s.label}
              </span>
              <span
                className="text-base sm:text-lg font-semibold text-[#10131A]"
                style={{ fontFamily: "monospace" }}
              >
                {s.handle}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ideas callout */}
      <div className="w-full max-w-2xl mx-auto mt-5 flex flex-col items-center gap-2 border-2 border-dashed border-[#E1E1DC] rounded-3xl p-6 sm:p-7 bg-[#FBFBFA]">
        <span className="text-lg sm:text-xl font-semibold text-center text-[#10131A]">
          Got an idea for Zurl?
        </span>
        <p className="text-sm sm:text-base text-center text-[#5B6168] max-w-md">
          We're always looking to improve. If there's a feature you'd love to
          see, reach out through email or any platform above and tell us
          about it.
        </p>
      </div>
    </main>
  );
}