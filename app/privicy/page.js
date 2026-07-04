import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const EMAIL = "m.junaidkhan.dev@gmail.com";
const LAST_UPDATED = "July 4, 2026";

const sections = [
  {
    title: "1. What this covers",
    body: (
      <>
        This policy explains what information Zurl collects when you
        shorten links, generate QR codes, or create an account, and how
        that information is used. It applies only to zurl.com and not to
        any third-party sites your short links may point to.
      </>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        <p className="mb-3">Depending on how you use Zurl, we may collect:</p>
        <ul className="list-disc pl-5 space-y-2 marker:text-[#F5B700]">
          <li>
            <span className="font-semibold text-[#10131A]">
              Links you shorten
            </span>{" "}
            — the destination URL, the generated short code or custom
            alias, and the date it was created.
          </li>
          <li>
            <span className="font-semibold text-[#10131A]">
              QR code content
            </span>{" "}
            — text or URLs you enter into the QR generator. QR codes are
            rendered in your browser; we don't store the images
            themselves unless you're signed in and save a link.
          </li>
          <li>
            <span className="font-semibold text-[#10131A]">
              Account information
            </span>{" "}
            — if you sign up, our authentication provider (Clerk)
            collects your name and email address to manage your session.
          </li>
          <li>
            <span className="font-semibold text-[#10131A]">
              Click analytics
            </span>{" "}
            — for links you've created, we log the number of clicks and
            timestamps so your dashboard can show usage. We don't
            associate this with visitors' personal identity.
          </li>
          <li>
            <span className="font-semibold text-[#10131A]">
              Basic log data
            </span>{" "}
            — standard hosting logs (IP address, browser type, referring
            page) used only for security and diagnosing issues.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How we use it",
    body: (
      <>
        <p className="mb-3">We use the information above to:</p>
        <ul className="list-disc pl-5 space-y-2 marker:text-[#F5B700]">
          <li>Redirect your short links to their correct destination</li>
          <li>Generate and let you download QR codes</li>
          <li>Show click counts and link history on your dashboard</li>
          <li>Keep your account secure and signed in</li>
          <li>Detect abuse, spam links, or malicious redirects</li>
        </ul>
        <p className="mt-3">
          We do not sell your personal information, and we don't use your
          shortened links or QR content for advertising.
        </p>
      </>
    ),
  },
  {
    title: "4. Cookies",
    body: (
      <>
        Zurl uses a small number of cookies, mainly set by our
        authentication provider (Clerk) to keep you signed in between
        visits. We don't use cookies for third-party advertising. You can
        block cookies in your browser settings, though this may prevent
        signing in.
      </>
    ),
  },
  {
    title: "5. Third parties",
    body: (
      <>
        We rely on a small number of service providers to run Zurl —
        currently authentication (Clerk) and hosting/infrastructure. Each
        only receives the data needed to perform their function, and
        none are permitted to use it for their own purposes. Zurl is not
        responsible for the content or privacy practices of destination
        URLs that short links point to.
      </>
    ),
  },
  {
    title: "6. Your rights",
    body: (
      <>
        <p className="mb-3">
          Depending on where you live, you may have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-[#F5B700]">
          <li>Request a copy of the data we hold about you</li>
          <li>Ask us to correct inaccurate information</li>
          <li>Ask us to delete your account and associated data</li>
          <li>Object to or restrict certain processing</li>
        </ul>
        <p className="mt-3">
          To exercise any of these, email us — we aim to respond within
          one month.
        </p>
      </>
    ),
  },
  {
    title: "7. Children's privacy",
    body: (
      <>
        Zurl is not directed at children under 13, and we do not
        knowingly collect personal information from them. If you believe
        a child has created an account or provided information to us,
        please contact us and we'll remove it.
      </>
    ),
  },
  {
    title: "8. Changes to this policy",
    body: (
      <>
        We may update this policy as Zurl changes. If we make material
        changes, we'll update the date below. Continued use of Zurl after
        changes means you accept the revised policy.
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase">
          Legal
        </span>

        <h1
          className={
            display.className +
            " text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-[#10131A]"
          }
        >
          Privacy Policy
        </h1>

        <p className="text-sm text-[#8A8F98] mt-4">
          Last updated: {LAST_UPDATED}
        </p>

        <p className="text-base sm:text-lg text-[#5B6168] mt-6 leading-7">
          This page explains what Zurl collects when you shorten links or
          generate QR codes, and how that information is used. If
          anything here isn't clear, reach out — our contact details are
          at the bottom of this page.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white border border-[#E7E7E3] rounded-2xl p-6 sm:p-7"
            >
              <h2
                className={
                  display.className +
                  " text-lg sm:text-xl font-semibold text-[#10131A] mb-3"
                }
              >
                {section.title}
              </h2>
              <div className="text-sm sm:text-base text-[#5B6168] leading-7">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 bg-white border border-[#E7E7E3] rounded-2xl p-6 sm:p-7 text-center">
          <h2
            className={
              display.className +
              " text-lg sm:text-xl font-semibold text-[#10131A] mb-2"
            }
          >
            Contact us
          </h2>
          <p className="text-sm sm:text-base text-[#5B6168] mb-4">
            Questions about this policy or your data? Email us directly.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-[#16233F] text-white rounded-xl font-medium text-sm h-11 px-5 transition-all duration-200 ease-in-out hover:bg-[#1E3057] active:scale-95"
            style={{ fontFamily: "monospace" }}
          >
            {EMAIL}
          </a>
          <p className="text-sm text-[#5B6168] mt-4">
            Or visit our{" "}
            <Link
              href="/contact"
              className="text-[#16233F] font-medium hover:underline underline-offset-4"
            >
              contact page
            </Link>{" "}
            for more ways to reach us.
          </p>
        </div>
      </div>
    </main>
  );
}