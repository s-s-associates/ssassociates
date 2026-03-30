import {
  bordergrayColor,
  grayColor,
  primaryColor,
  whiteColor,
} from "@/components/utils/Colors";
import AccessTime from "@mui/icons-material/AccessTime";
import Apartment from "@mui/icons-material/Apartment";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Layers from "@mui/icons-material/Layers";
import SquareFoot from "@mui/icons-material/SquareFoot";
import { Box, Chip, Stack, Typography } from "@mui/material";

function formatMonthYear(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function formatDurationRange(start, end) {
  const a = formatMonthYear(start);
  const b = formatMonthYear(end);
  if (a && b) return `${a} — ${b}`;
  if (a) return a;
  if (b) return b;
  return "";
}

function areaDisplay(project) {
  const area = (project.projectArea || "").trim();
  const unit = (project.projectAreaUnit || "").trim();
  if (!area) return "";
  return unit ? `${area} ${unit}` : area;
}

function FactCard({ icon: Icon, label, value }) {
  const display = (value || "").trim() || "N/A";
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "14px",
        bgcolor: whiteColor,
        border: `1px solid ${bordergrayColor}`,
        boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
        height: "100%",
        "&:hover": {
          borderColor: primaryColor,
          transform: "translateY(-2px)",
        },
        transition: "all 0.25s ease",
      }}
    >
      <Stack alignItems="center" spacing={1.25} textAlign="center">
        <Box sx={{ color: primaryColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon sx={{ fontSize: 28 }} />
        </Box>
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.45)",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 700,
            color: grayColor,
            lineHeight: 1.35,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {display}
        </Typography>
      </Stack>
    </Box>
  );
}

/** Key project facts as a row of icon cards (data from `project`). */
export default function ProjectFactsPanel({ project }) {
  const p = project || {};
  const durationValue = formatDurationRange(p.durationStart, p.durationEnd);

  const facts = [
    { key: "client", icon: Apartment, label: "Client", value: p.clientName },
    { key: "area", icon: SquareFoot, label: "Area", value: areaDisplay(p) },
    { key: "budget", icon: AttachMoney, label: "Budget", value: p.budget },
    { key: "duration", icon: AccessTime, label: "Duration", value: durationValue },
    { key: "floors", icon: Layers, label: "Floors", value: p.floors },
  ];

  const tagline = (p.tagline || "").trim();

  return (
    <Box mb={10} mx={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 10 }}>
      <Stack alignItems="center" spacing={1.5} sx={{ mb: 3, width: "100%", textAlign: "center" }}>
        <Chip
          label="Project facts"
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: primaryColor,
            bgcolor: "rgba(255, 159, 69, 0.12)",
            border: `1px solid rgba(255, 159, 69, 0.35)`,
            "& .MuiChip-label": { px: 1.5 },
          }}
        />
        {tagline ? (
          <Typography
            sx={{
              width: "100%",
              maxWidth: 640,
              mx: "auto",
              textAlign: "center",
              fontSize: 15,
              fontWeight: 500,
              color: "rgba(0,0,0,0.55)",
              lineHeight: 1.45,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tagline}
          </Typography>
        ) : null}
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{
          width: "100%",
          overflowX: { xs: "auto", lg: "visible" },
          flexWrap: { xs: "nowrap", md: "wrap" },
          pb: { xs: 0.5, md: 0 },
          scrollbarWidth: "thin",
        }}
      >
        {facts.map(({ key, icon, label, value }) => (
          <Box
            key={key}
            sx={{
              flex: { xs: "0 0 auto", md: "1 1 0" },
              minWidth: { xs: 200, md: 0 },
              maxWidth: { xs: 220, md: "none" },
            }}
          >
            <FactCard icon={icon} label={label} value={value} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
