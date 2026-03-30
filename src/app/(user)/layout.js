import UserGuard from "@/components/user/UserGuard";
import Navbar from "@/components/user/bars/Navbar";
import Sidebar from "@/components/user/bars/Sidebar";
import { Box } from "@mui/material";

export const metadata = {
  title: { absolute: "Admin dashboard | S&S Associates" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function UserLayout({ children }) {
  return (
    <UserGuard>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          display={{ xs: "none", md: "block" }}
          sx={{ width: 280, flexShrink: 0 }}
          aria-hidden
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <Navbar />
          <Box component="main" sx={{ flex: 1, overflowY: "auto" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </UserGuard>
  );
}
