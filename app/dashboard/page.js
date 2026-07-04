"use client";
import { Space_Grotesk } from "next/font/google";
import { useEffect, useState } from "react";
import { FaCopy, FaExternalLinkAlt, FaLink } from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const Page = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch("/api/links");
      const data = await response.json();

      if (data.success) {
        setLinks(data.links);
      }
    };

    fetchLinks();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase">
            Dashboard
          </span>
          <h1
            className={
              display.className +
              " text-3xl sm:text-5xl font-bold mt-3 text-[#10131A]"
            }
          >
            Hello, {links[0]?.username || "User"}
          </h1>
          <p className="mt-3 text-[#5B6168] text-base sm:text-lg">
            Manage all your shortened URLs from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl border border-[#E7E7E3] shadow-[0_1px_2px_rgba(16,19,26,0.04),0_12px_32px_-16px_rgba(16,19,26,0.15)] p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#16233F]/8 flex items-center justify-center text-[#16233F]">
                <FaLink size={16} />
              </div>
              <h3 className="text-sm font-medium text-[#8A8F98] uppercase tracking-wide">
                Total Links
              </h3>
            </div>
            <p
              className={
                display.className +
                " text-4xl font-bold text-[#10131A] mt-4"
              }
            >
              {links.length}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-10 sm:mt-12">
          <h2
            className={
              display.className +
              " text-xl sm:text-2xl font-bold text-[#10131A] mb-6"
            }
          >
            Your Links
          </h2>

          <div className="grid gap-4 sm:gap-5">
            {links.map((link) => (
              <div
                key={link._id}
                className="bg-white rounded-2xl border border-[#E7E7E3] shadow-[0_1px_2px_rgba(16,19,26,0.04)] hover:shadow-[0_12px_32px_-16px_rgba(16,19,26,0.2)] hover:-translate-y-0.5 transition-all duration-300 ease-out p-5 sm:p-6"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-6">
                  {/* Left */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#10131A]">
                      {link.username}
                    </h3>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#8A8F98] mb-1">
                        Original URL
                      </p>
                      <a
                        href={link.longUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#5B6168] hover:text-[#16233F] break-all hover:underline underline-offset-2 transition-colors"
                        style={{ fontFamily: "monospace" }}
                      >
                        {link.longUrl}
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#8A8F98] mb-1">
                        Short URL
                      </p>
                      <a
                        href={link.shorturl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-[#16233F] hover:underline underline-offset-2 break-all transition-colors"
                        style={{ fontFamily: "monospace" }}
                      >
                        {link.shorturl}
                      </a>
                    </div>

                    {link.customAlias && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A8F98] mb-1">
                          Custom Alias
                        </p>
                        <span
                          className="inline-block bg-[#F5B700]/15 text-[#B3843C] px-3 py-1 rounded-full text-xs font-medium"
                          style={{ fontFamily: "monospace" }}
                        >
                          {link.customAlias}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-[#A6ABB3]">
                      Created: {new Date(link.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex flex-row lg:flex-col gap-2.5 shrink-0">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(link.shorturl)
                      }
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#16233F] hover:bg-[#1E3057] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out active:scale-95"
                    >
                      <FaCopy size={12} /> Copy
                    </button>

                    <a
                      href={link.shorturl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E1E1DC] hover:border-[#16233F]/30 text-[#10131A] px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out active:scale-95 text-center"
                    >
                      Visit <FaExternalLinkAlt size={10} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {links.length === 0 && (
              <div className="bg-white rounded-2xl border border-dashed border-[#E1E1DC] p-10 sm:p-14 text-center">
                <div className="h-12 w-12 rounded-xl bg-[#16233F]/8 flex items-center justify-center text-[#16233F] mx-auto mb-4">
                  <FaLink size={18} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#10131A]">
                  No links found
                </h3>
                <p className="text-[#5B6168] mt-2 text-sm sm:text-base">
                  Create your first short URL to see it here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;