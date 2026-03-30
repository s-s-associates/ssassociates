import { Box } from "@mui/material";

export const metadata = {
  title: { absolute: "Sign in | S&S Associates" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AuthLayout({ children }) {
  return (
    <Box component="main" sx={{ minHeight: "100vh", p: 0, m: 0 }}>
      {children}
    </Box>
  );
}
