import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Chatbot } from "@/components/chat/Chatbot";
import { CustomCursor } from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amanullah — Web Developer & Freelancer",
  description:
    "Portfolio of Md Amanullah. Web developer and software freelancer based in Bhubaneswar, India. Building functional, modern web applications.",
  keywords: [
    "web developer",
    "freelancer",
    "React",
    "Next.js",
    "Bhubaneswar",
    "India",
  ],
  authors: [{ name: "Md Amanullah" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://amaan.dev",
    title: "Amanullah — Web Developer & Freelancer",
    description: "Portfolio of Md Amanullah. Building functional, modern web applications.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanullah — Web Developer & Freelancer",
    images: ["/images/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
          <CustomCursor />
          <Chatbot />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
