import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider} from '@clerk/nextjs'
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "zurl - Free URL Shortener",
  description: "zurl is a free and fast URL shortener that allows you to create short, memorable links for easy sharing. Generate custom aliases, track clicks, and manage your links with our user-friendly dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F7F5]">
        <ClerkProvider>
        <Navbar />
        {children}
        <Footer />
         </ClerkProvider>
      </body>
    </html>
  );
}
