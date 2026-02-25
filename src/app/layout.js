import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { bggrayColor } from "@/components/utils/Colors";

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
  title: "CoachScout",
  description: "CoachScout is a platform for coaches to find the best players for their team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakartaSans.variable}`} style={{backgroundColor: bggrayColor}}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
