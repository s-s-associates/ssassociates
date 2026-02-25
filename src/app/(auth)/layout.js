import AuthNav from "@/components/website/auth/AuthNav";
import Footer from "@/components/website/bars/Footer";
import Navbar from "@/components/website/bars/Navbar";
import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <>
      <AuthNav />
      <Box component="main" sx={{ minHeight: "30vh", pt: 10, pb: 6 }}>
        {children}
      </Box>
      <Footer/>
    </>
  );
}
