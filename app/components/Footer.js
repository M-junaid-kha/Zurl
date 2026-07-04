import Link from "next/link";
import { FaEnvelope, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const EMAIL = "m.junaidkhan.dev@gmail.com";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "QR Code", href: "/qrcode" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [{ label: "Privacy Policy", href: "/privicy" }];

const socials = [
  { label: "GitHub", href: "https://github.com/M-junaid-kha", icon: <FaGithub /> },
  { label: "Twitter", href: "https://twitter.com/zurl", icon: <FaTwitter /> },
  { label: "Instagram", href: "https://instagram.com/zurl.app", icon: <FaInstagram /> },
];

const linkClass =
  "text-sm text-[#5B6168] hover:text-[#16233F] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/20 rounded";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F7F7F5] border-t border-[#E7E7E3] px-4 sm:px-6 pt-14 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className={
                display.className +
                " text-xl font-bold text-[#10131A] tracking-tight"
              }
            >
              zurl<span className="text-[#F5B700]">.</span>
            </Link>
            <p className="text-sm text-[#5B6168] mt-3 leading-6">
              Short links and QR codes, generated instantly — clean,
              customizable, and free to start.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-white border border-[#E7E7E3] text-[#5B6168] hover:text-[#16233F] hover:border-[#16233F]/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16233F]/20"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-[#8A8F98]">
              Navigate
            </span>
            <ul className="flex flex-col gap-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + legal */}
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-[#8A8F98]">
              Get in touch
            </span>
            <ul className="flex flex-col gap-3 mt-4">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className={linkClass + " flex items-center gap-2 break-all"}
                >
                  <FaEnvelope className="text-[#B3843C] not-last:shrink-0" />
                  {EMAIL}
                </a>
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-6 border-t border-[#E7E7E3]">
          <p className="text-xs text-[#8A8F98] text-center sm:text-left">
            © {year} Zurl. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#8A8F98]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5B700]" />
            Built by M-junaid-kha
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;