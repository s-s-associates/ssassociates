import PrivacyPolicy from "@/components/website/privacyPolicy/PrivacyPolicy";
import { truncateMetaDescription } from "@/lib/site-config";

export const metadata = {
  title: "Privacy policy",
  description: truncateMetaDescription(
    "Privacy policy for S&S Associates — how we collect, use, and protect your personal information."
  ),
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

