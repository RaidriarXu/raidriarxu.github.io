import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header, Footer } from "@/components/ui";
import { profile } from "@/content/site";
import { absoluteUrl, assetPath } from "@/lib/paths";

const title = "Hongyu Xu — Software Engineer & Applied AI";
const description =
  "Hongyu Xu is a UIUC student building applied AI, LLM agents, and full-stack software for real business workflows. Graduating May 2027.";
export const metadata: Metadata = {
  title: { default: title, template: "%s | Hongyu Xu" },
  description,
  authors: [{ name: profile.name }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  alternates: { canonical: absoluteUrl("/") },
  icons: { icon: [{ url: assetPath("/favicon.svg"), type: "image/svg+xml" }] },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Hongyu Xu",
    url: absoluteUrl("/"),
    images: [
      {
        url:
          absoluteUrl("/images/social-card.png") ||
          assetPath("/images/social-card.png"),
        width: 1200,
        height: 630,
        alt: "Hongyu Xu — Applied AI and full-stack software engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      absoluteUrl("/images/social-card.png") ||
        assetPath("/images/social-card.png"),
    ],
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f7f3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
