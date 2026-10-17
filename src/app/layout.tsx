import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shiva Bharti | Full-Stack Developer & Aspiring AI Engineer",
  description:
    "Personal portfolio of Shiva Bharti. Full-stack developer, mobile product builder, workflow automation specialist, and aspiring AI engineer.",
  keywords: [
    "Shiva Bharti",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Flutter",
    "Python Automation",
    "AI Engineer",
  ],
  authors: [{ name: "Shiva Bharti", url: "https://github.com/shivabharti9080" }],
  creator: "Shiva Bharti",
  metadataBase: new URL(process.env.AUTH_URL || "https://shivabharti.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shiva Bharti | Full-Stack Developer & Aspiring AI Engineer",
    description:
      "Engineering ideas into digital reality. Full-stack web applications, mobile products, automation solutions, and AI prototypes.",
    siteName: "Shiva Bharti Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Shiva Bharti - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiva Bharti | Full-Stack Developer & Aspiring AI Engineer",
    description:
      "Engineering ideas into digital reality. Full-stack web applications, mobile products, automation solutions, and AI prototypes.",
    images: ["/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-[#64748B] min-h-screen selection:bg-[#1E3A5F] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
