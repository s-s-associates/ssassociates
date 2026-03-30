import { Box, Grid, Stack, Typography } from "@mui/material";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { primaryColor, secondaryBg, secondaryDark } from "@/components/utils/Colors";

const cardsConfig = [
  {
    key: "structureType",
    label: "Structure Type",
    icon: LayersOutlinedIcon,
    fallback: "No structure details available.",
  },
  {
    key: "materialsUsed",
    label: "Materials Used",
    icon: HandymanOutlinedIcon,
    fallback: "No material details available.",
  },
  {
    key: "foundationType",
    label: "Foundation",
    icon: AccountBalanceOutlinedIcon,
    fallback: "No foundation details available.",
  },
  {
    key: "safetyStandards",
    label: "Safety Standards",
    icon: VerifiedUserOutlinedIcon,
    fallback: "No safety standards listed.",
  },
  {
    key: "sustainabilityFeatures",
    label: "Sustainability",
    icon: EnergySavingsLeafIcon,
    fallback: "No sustainability details available.",
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: WorkspacePremiumOutlinedIcon,
    fallback: "No certifications listed.",
  },
];

export default function ProjectSpecifications({ project }) {
  return (
    <Box
      sx={{
        p: { xs: 5, sm: 6, md: 10 },
        background: secondaryDark
      }}
    >
      <Stack alignItems="center" sx={{ mb: 2.8 }}>
        <Typography
          sx={{
            color: "#ff9f45",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            mb: 0.8,
          }}
        >
          Technical Details
        </Typography>
        <Typography
          component="h2"
          sx={{
            color: "#f8fafc",
            fontFamily: '"Times New Roman", Georgia, serif',
            fontSize: { xs: 34, sm: 40 },
            fontWeight: 700,
            lineHeight: 1.05,
            textAlign: "center",
          }}
        >
          Project Specifications
        </Typography>
      </Stack>

      <Grid container spacing={1.8}>
        {cardsConfig.map((item) => {
          const Icon = item.icon;
          const rawValue = project?.[item.key];
          const value = Array.isArray(rawValue)
            ? rawValue.map((v) => String(v ?? "").trim()).filter(Boolean).join("\n")
            : String(rawValue ?? "").trim();
          const displayValue = value || item.fallback;
          return (
            <Grid key={item.key} size={{ xs: 12, md: 6, lg: 4 }}>
              <Box
                sx={{
                  borderRadius: 2.3,
                  p: 2.1,
                  minHeight: 165,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: secondaryBg,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 26px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: primaryColor,
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 0 0 1px rgba(251,138,30,0.4), 0 18px 44px rgba(251,138,30,0.24), inset 0 1px 0 rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.8,
                    bgcolor: "rgba(255,159,69,0.15)",
                    color: "#ff9f45",
                    border: "1px solid rgba(255,159,69,0.2)",
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </Box>
                <Typography
                  sx={{
                    color: "#f8fafc",
                    fontFamily: '"Times New Roman", Georgia, serif',
                    fontSize: 16,
                    lineHeight: 1.15,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    mb: 1.1,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    color: displayValue === item.fallback ? "rgba(226,232,240,0.62)" : "rgba(226,232,240,0.9)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    fontStyle: displayValue === item.fallback ? "italic" : "normal",
                  }}
                >
                  {displayValue}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
