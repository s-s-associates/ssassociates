import Footer from "@/components/website/bars/Footer";
import Navbar from "@/components/website/bars/Navbar";
import { WebsiteNavigationLoaderProvider } from "@/components/website/bars/WebsiteNavigationLoaderProvider";
import {
  getDefaultOgImagePath,
  getSearchVerificationMetadata,
  getSiteUrl,
  SITE_NAME,
  truncateMetaDescription,
} from "@/lib/site-config";

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
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "construction",
  /** Explicit allow — safe for Google + Vercel edge */
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

/** Crawlers and mobile previews */
export const viewport = {
  themeColor: "#fb861e",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function WebsiteLayout({ children }) {
  return (
    <WebsiteNavigationLoaderProvider>
      <Navbar />
      {children}
      <Footer />
    </WebsiteNavigationLoaderProvider>
  );
}
  