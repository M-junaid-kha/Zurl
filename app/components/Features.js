import { Space_Grotesk } from "next/font/google";
import {
  FaLink,
  FaQrcode,
  FaChartLine,
  FaUserCircle,
  FaHistory,
  FaBolt,
  FaLock,
  FaMagic,
} from "react-icons/fa";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const spotlight = {
  icon: <FaLink />,
  title: "URL Shortening",
  desc: "Instantly convert long, messy URLs into short, clean, shareable links — no sign-up required to get started.",
};

const features = [
  {
    icon: <FaMagic />,
    title: "Custom Aliases",
    desc: "Create personalized, memorable short URLs instead of random characters.",
    accent: "navy",
  },
  {
    icon: <FaQrcode />,
    title: "QR Codes",
    desc: "Every shortened link comes with an auto-generated QR code.",
    accent: "gold",
  },
  {
    icon: <FaChartLine />,
    title: "Click Tracking",
    desc: "See how many clicks each link gets and when they happen.",
    accent: "navy",
  },
  {
    icon: <FaUserCircle />,
    title: "Dashboard",
    desc: "Manage every link you've created from one place.",
    accent: "gold",
  },
  {
    icon: <FaHistory />,
    title: "Link History",
    desc: "Look back at and reuse anything you've shortened before.",
    accent: "navy",
  },
  {
    icon: <FaBolt />,
    title: "Fast",
    desc: "Links and QR codes generate in under a second.",
    accent: "gold",
  },
  {
    icon: <FaLock />,
    title: "Secure Storage",
    desc: "Your links stay safe and available whenever you sign in.",
    accent: "navy",
  },
];

const accentStyles = {
  navy: {
    text: "text-[#16233F]",
    bg: "bg-[#16233F]/8",
    border: "group-hover:border-[#16233F]/50",
    bar: "bg-[#16233F]",
    shadow: "group-hover:shadow-[0_16px_32px_-20px_rgba(22,35,63,0.35)]",
  },
  gold: {
    text: "text-[#B3843C]",
    bg: "bg-[#F5B700]/12",
    border: "group-hover:border-[#F5B700]/60",
    bar: "bg-[#F5B700]",
    shadow: "group-hover:shadow-[0_16px_32px_-20px_rgba(245,183,0,0.35)]",
  },
};

const Features = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#F7F7F5]">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#B3843C] uppercase">
          What you get
        </span>
        <h2
          className={
            display.className +
            " text-3xl sm:text-5xl lg:text-6xl font-bold mt-3 text-[#10131A]"
          }
        >
          Built for speed and control
        </h2>
        <div className="h-1 w-14 bg-[#F5B700] rounded-full mx-auto mt-5" />
        <p className="text-[#5B6168] mt-5 text-base sm:text-lg">
          One core job, done well — plus everything around it to organize,
          track, and reuse your links.
        </p>
      </div>

      {/* Bento grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Spotlight card */}
        <div className="group sm:col-span-2 lg:col-span-1 lg:row-span-2 relative overflow-hidden bg-white border border-[#E7E7E3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#16233F]/40 hover:shadow-[0_20px_40px_-24px_rgba(22,35,63,0.35)] min-h-55 lg:min-h-55">
          <div className="h-14 w-14 rounded-xl bg-[#16233F]/8 flex items-center justify-center text-3xl text-[#16233F] mb-6 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
            {spotlight.icon}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#10131A] mb-3">
              {spotlight.title}
            </h3>
            <p className="text-[#5B6168] leading-7 text-base">
              {spotlight.desc}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#16233F] transition-all duration-300 ease-out group-hover:w-full" />
        </div>

        {/* Feature cards */}
        {features.map((feature, index) => {
          const style = accentStyles[feature.accent];
          return (
            <div
              key={index}
              className={`group relative overflow-hidden bg-white border border-[#E7E7E3] rounded-3xl p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 ${style.border} ${style.shadow}`}
            >
              <div
                className={`h-11 w-11 rounded-lg ${style.bg} flex items-center justify-center text-xl ${style.text} mb-5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#10131A] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#5B6168] leading-6 text-sm">
                {feature.desc}
              </p>
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 ease-out group-hover:w-full ${style.bar}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;