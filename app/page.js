"use client";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Features from "./components/Features";
import Faqs from "@/app/components/Faqs";
import { useState } from "react";
import Link from "next/link";
import Testimonials from "./components/Testimonials";
import { FaCopy, FaCheck } from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function Home() {
  const [generated, setGenerated] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateAlias = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let alias = "";

    for (let i = 0; i < 4; i++) {
      alias += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return alias;
  };

  const handleGenerate = async () => {
    setLoading(true);

    if (!longUrl) {
      alert("Please enter a URL.");
      setLoading(false);
      return;
    }

    const alias = customAlias.trim() || generateAlias();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl,
          customAlias: alias,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate short URL.");
      }

      const shortUrl = `${process.env.NEXT_PUBLIC_HOST}/${alias}`;

      setGenerated(shortUrl);
      setLongUrl("");
      setCustomAlias("");
      setCopied(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className={`${body.variable} ${display.variable} ${mono.variable} min-h-screen bg-[#F7F7F5]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-6 sm:pt-10 pb-4 overflow-hidden">
        {/* Signature dot-grid, faint, QR-inspired */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#10131A 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 30%, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 30%, black 40%, transparent 90%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] sm:text-xs font-medium tracking-widest uppercase text-[#16233F] bg-[#F5B700]/25 border border-[#F5B700]/40 rounded-full px-3 py-1">
            Free &amp; instant
          </span>

          <h1
            className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#10131A]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Shorten links.
            <br />
            Share smarter.
          </h1>

          <p className="max-w-xl mx-auto mt-5 text-base sm:text-lg text-[#5B6168]">
            Turn long, messy URLs into clean, memorable links in seconds —
            then track, customize, and manage them all in one place.
          </p>
        </div>
      </section>

      {/* Generator card */}
      <section className="px-4 sm:px-6 mt-4 mb-16">
        <div className="max-w-xl mx-auto bg-white border border-[#E7E7E3] rounded-3xl shadow-[0_1px_2px_rgba(16,19,26,0.04),0_12px_32px_-16px_rgba(16,19,26,0.15)] p-5 sm:p-7">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-[#8A8F98] mb-1.5 block">
                Destination URL
              </label>
              <input
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="w-full rounded-xl border border-[#E1E1DC] bg-[#FBFBFA] px-4 py-3 text-[#10131A] text-base placeholder:text-[#A6ABB3] focus:outline-none focus:ring-2 focus:ring-[#16233F]/20 focus:border-[#16233F] transition"
                style={{ fontFamily: "var(--font-mono)" }}
                type="url"
                placeholder="https://example.com/your-long-link"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <label className="text-xs font-medium uppercase tracking-wide text-[#8A8F98]">
                  Custom alias
                </label>
                <span className="text-[10px] font-medium text-[#B3843C] bg-[#F5B700]/15 rounded-full px-2 py-0.5">
                  Optional
                </span>
              </div>
              <input
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="w-full rounded-xl border border-[#E1E1DC] bg-[#FBFBFA] px-4 py-3 text-[#10131A] text-base placeholder:text-[#A6ABB3] focus:outline-none focus:ring-2 focus:ring-[#16233F]/20 focus:border-[#16233F] transition"
                style={{ fontFamily: "var(--font-mono)" }}
                type="text"
                placeholder="my-custom-link"
              />
            </div>

            <button
              disabled={loading}
              onClick={handleGenerate}
              className="w-full bg-[#16233F] text-white rounded-xl font-medium text-base h-12 px-5 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#1E3057] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate short URL"
              )}
            </button>

            <div>
              {generated === "" && (
                <p className="text-sm text-center text-[#A6ABB3] mt-1">
                  Enter a URL above and generate your short link.
                </p>
              )}

              {generated !== "" && (
                <div className="flex flex-col items-center gap-2.5 mt-2 rounded-xl border border-[#F5B700]/40 bg-[#F5B700]/10 px-4 py-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#8A8F98]">
                    Your short URL
                  </span>

                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <Link
                      href={generated}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16233F] font-medium break-all text-base sm:text-lg hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/30 rounded"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {generated}
                    </Link>

                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 rounded-lg font-medium text-xs h-8 px-3 cursor-pointer transition-all duration-200 ease-in-out active:scale-95 shrink-0 ${
                        copied
                          ? "bg-[#16233F] text-white"
                          : "bg-white border border-[#16233F]/25 text-[#16233F] hover:bg-[#16233F]/5"
                      }`}
                    >
                      {copied ? (
                        <>
                          <FaCheck className="text-[10px]" /> Copied
                        </>
                      ) : (
                        <>
                          <FaCopy className="text-[10px]" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Features />
      <Faqs />
      <Testimonials />
    </main>
  );
}