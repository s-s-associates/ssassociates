import Footer from "@/components/website/bars/Footer";
import Navbar from "@/components/website/bars/Navbar";
import { Box } from "@mui/material";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        {children}
        <Footer />
      </Box>
      <Navbar />
    </>
  );
}
  