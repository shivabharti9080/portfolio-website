import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#080808] text-white min-h-screen selection:bg-[#F4B400]/30 selection:text-[#FFF4D6]">
        {children}
      </body>
    </html>
  );
}
