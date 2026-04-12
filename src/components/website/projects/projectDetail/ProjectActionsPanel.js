import { bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiExternalLink, FiMail } from "react-icons/fi";

export default function ProjectActionsPanel({ project }) {
  const liveLink = (project?.ctaLink || "").trim();

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, border: `1px solid ${bordergrayColor}` }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1.4 }}>Actions</Typography>
      <Stack spacing={1.2}>
        <Link href="/contact" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            startIcon={<FiMail />}
            sx={{
              bgcolor: primaryColor,
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { bgcolor: primaryHover },
            }}
          >
            Contact
          </Button>
        </Link>
        {liveLink ? (
          <Link
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              startIcon={<FiExternalLink />}
              sx={{
                border: `1px solid ${bordergrayColor}`,
                color: "#111",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { borderColor: primaryColor, color: primaryColor, bgcolor: "rgba(251,134,30,0.08)" },
              }}
            >
              View Live
            </Button>
          </Link>
        ) : null}
      </Stack>
    </Paper>
  );
}
