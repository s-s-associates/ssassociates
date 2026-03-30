import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { bggrayColor } from "@/components/utils/Colors";
import { getSiteUrl, SITE_NAME, truncateMetaDescription } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: truncateMetaDescription(
    "S&S Associates — construction, grey structure, and building solutions in Pakistan."
  ),
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/ss-logo.png",
    apple: "/ss-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakartaSans.variable}`} style={{backgroundColor: bggrayColor, maxWidth: "1700px", margin: "0 auto"}}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
