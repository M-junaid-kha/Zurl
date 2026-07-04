"use client";

import { useState, useRef } from "react";
import { toJpeg, toPng } from "html-to-image";
import QRCode from "react-qr-code";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export default function Home() {
  const [text, setText] = useState("https://example.com");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef(null);

  const downloadPNG = async () => {
    if (!qrRef.current) return;

    const dataUrl = await toPng(qrRef.current);

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = dataUrl;
    link.click();
  };

  const downloadJPEG = async () => {
    if (!qrRef.current) return;

    const dataUrl = await toJpeg(qrRef.current, {
      quality: 1,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = "qrcode.jpeg";
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left: copy + controls */}
        <div className="flex-1 max-w-xl">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase">
            QR generator
          </span>

          <h1
            className={
              display.className +
              " text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 leading-[1.05] text-[#10131A]"
            }
          >
            Create QR codes instantly
          </h1>

          <p className="text-base sm:text-lg text-[#5B6168] mt-5 leading-7">
            Generate beautiful, customizable QR codes for URLs, text, Wi-Fi,
            email, phone numbers, and more. Download as PNG or JPEG for free.
          </p>

          <div className="mt-8">
            <label className="text-xs font-medium uppercase tracking-wide text-[#8A8F98] mb-1.5 block">
              Text or URL
            </label>
            <input
              type="text"
              placeholder="Enter text or URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-xl border border-[#E1E1DC] bg-white px-4 py-3.5 text-[#10131A] text-base sm:text-lg placeholder:text-[#A6ABB3] focus:outline-none focus:ring-2 focus:ring-[#16233F]/20 focus:border-[#16233F] transition"
              style={{ fontFamily: "monospace" }}
            />
          </div>

          <div className="mt-6 bg-white border border-[#E7E7E3] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-8">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-11 w-11 rounded-lg border border-[#E1E1DC] cursor-pointer p-0.5 bg-white"
              />
              <div>
                <p className="text-sm font-semibold text-[#10131A]">
                  QR code color
                </p>
                <p className="text-xs text-[#8A8F98] uppercase tracking-wide">
                  {fgColor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-11 w-11 rounded-lg border border-[#E1E1DC] cursor-pointer p-0.5 bg-white"
              />
              <div>
                <p className="text-sm font-semibold text-[#10131A]">
                  Background color
                </p>
                <p className="text-xs text-[#8A8F98] uppercase tracking-wide">
                  {bgColor}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: preview + download */}
        <div className="flex-1 ml-20 flex flex-col items-center lg:items-start">
          <div className="bg-white border border-[#E7E7E3] rounded-3xl shadow-[0_1px_2px_rgba(16,19,26,0.04),0_12px_32px_-16px_rgba(16,19,26,0.15)] p-5 sm:p-6 w-full max-w-xs">
            <div
              ref={qrRef}
              className="rounded-2xl bg-white p-5 sm:p-6 border border-[#E7E7E3] flex items-center justify-center"
            >
              <QRCode
                value={text}
                size={220}
                fgColor={fgColor}
                bgColor={bgColor}
                style={{ width: "100%", height: "auto", maxWidth: "220px" }}
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={downloadPNG}
                className="flex-1 bg-[#16233F] text-white rounded-xl font-medium text-sm h-11 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#1E3057] active:scale-95"
              >
                Download PNG
              </button>

              <button
                onClick={downloadJPEG}
                className="flex-1 bg-white text-[#16233F] border border-[#16233F]/30 rounded-xl font-medium text-sm h-11 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#16233F]/5 active:scale-95"
              >
                Download JPEG
              </button>
            </div>
          </div>

          <p className="text-xs text-[#A6ABB3] mt-4 text-center lg:text-left">
            Updates live as you type or change colors.
          </p>
        </div>
      </div>
    </main>
  );
}