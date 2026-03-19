import Footer from "@/components/website/bars/Footer";
import Navbar from "@/components/website/bars/Navbar";
import { WebsiteNavigationLoaderProvider } from "@/components/website/bars/WebsiteNavigationLoaderProvider";

export default function WebsiteLayout({ children }) {
  return (
    <WebsiteNavigationLoaderProvider>
      <Navbar />
      {children}
      <Footer />
    </WebsiteNavigationLoaderProvider>
  );
}
  