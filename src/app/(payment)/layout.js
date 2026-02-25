import { Box } from "@mui/material";

export default function PaymentLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      {children}
    </Box>
  );
}
