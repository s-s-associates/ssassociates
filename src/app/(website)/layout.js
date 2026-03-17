import Footer from "@/components/website/bars/Footer";
import Navbar from "@/components/website/bars/Navbar";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
        {children}
        <Footer />
    </>
  );
}
  