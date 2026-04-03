import { Quicksand } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { GlobalWebsiteJsonLd } from "@/components/seo/SEO";
import { bggrayColor } from "@/components/utils/Colors";
import { getMetaKeywordsString } from "@/lib/seo-keywords";
import {
  getDefaultOgImagePath,
  getSearchVerificationMetadata,
  getSiteUrl,
  SITE_NAME,
  truncateMetaDescription,
} from "@/lib/site-config";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();
const defaultDescription = truncateMetaDescription(
  "S&S Associates provides residential and commercial construction, grey structure, fit-outs, and project management across Pakistan — quality-driven building solutions from planning to handover."
);
const defaultTitle = `${SITE_NAME} | Construction & Building Solutions`;
const ogImage = { url: getDefaultOgImagePath(), width: 1200, height: 630, alt: SITE_NAME };
const verification = getSearchVerificationMetadata();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: getMetaKeywordsString(),
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "construction",
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
  ...(verification ? { verification } : {}),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: siteUrl,
      "en-US": siteUrl,
      "x-default": siteUrl,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [getDefaultOgImagePath()],
    ...(process.env.NEXT_PUBLIC_TWITTER_HANDLE
      ? {
          creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
          site: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
        }
      : {}),
  },
  other: {
    "geo.region": "PK",
    "geo.placename": "Pakistan",
    "content-language": "en",
    distribution: "global",
    "apple-mobile-web-app-title": SITE_NAME,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.variable}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/home/home-banner-person.png"
          fetchPriority="high"
        />
      </head>
      <body style={{ backgroundColor: bggrayColor, maxWidth: "1700px", margin: "0 auto" }}>
        <GlobalWebsiteJsonLd baseUrl={siteUrl} contact={{}} />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
