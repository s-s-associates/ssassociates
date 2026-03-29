import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box component="main" sx={{ minHeight: "100vh", p: 0, m: 0 }}>
      {children}
    </Box>
  );
}
