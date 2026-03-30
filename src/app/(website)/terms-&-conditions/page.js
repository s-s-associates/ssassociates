import TermsConditions from "@/components/terms-&-conditions/TermsConditions";
import { truncateMetaDescription } from "@/lib/site-config";

export const metadata = {
  title: "Terms & conditions",
  description: truncateMetaDescription(
    "Terms and conditions for using the S&S Associates website and services."
  ),
  alternates: { canonical: "/terms-&-conditions" },
  robots: { index: true, follow: true },
};

export default function TermsConditionsPage() {
  return <TermsConditions />;
}

