import { primaryColor, primaryLight, secondaryDark } from "@/components/utils/Colors";
import { toStringArray } from "@/lib/project-challenges-solutions";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

const bodyMuted = "rgba(248, 250, 252, 0.78)";
const borderSubtle = "rgba(255, 255, 255, 0.12)";

const bodyTextSx = {
  color: bodyMuted,
  lineHeight: 1.75,
  textAlign: "justify",
  textJustify: "inter-word",
};

function IconBadge({ children }) {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: primaryColor,
        bgcolor: "rgba(251, 134, 30, 0.14)",
        border: "1px solid rgba(251, 134, 30, 0.35)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      {children}
    </Box>
  );
}

function Panel({ icon, title, children }) {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 2.5,
        p: { xs: 2.25, md: 2.75 },
        bgcolor: "rgba(45, 55, 72, 0.72)",
        border: `1px solid ${borderSubtle}`,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        backgroundImage: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%)",
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.75} alignItems="center">
          <IconBadge>{icon}</IconBadge>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 17 },
              fontWeight: 700,
              color: primaryColor,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
}

function ListBody({ body }) {
  const items = toStringArray(body);
  const showList = items.length > 0;

  if (!showList) {
    return (
      <Typography sx={{ ...bodyTextSx, color: "rgba(248,250,252,0.45)", fontStyle: "italic" }}>
        No information provided.
      </Typography>
    );
  }

  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        pl: 2.5,
        listStyleType: "disc",
        "& li::marker": { color: primaryColor },
        ...bodyTextSx,
      }}
    >
      {items.map((line, i) => (
        <Typography
          key={i}
          component="li"
          sx={{
            mb: 0.85,
            textAlign: "justify",
            textJustify: "inter-word",
            "&:last-of-type": { mb: 0 },
          }}
        >
          {line}
        </Typography>
      ))}
    </Box>
  );
}

function PlainBody({ body }) {
  const paras = toStringArray(typeof body === "string" ? body : String(body ?? ""));
  if (paras.length === 0) {
    return (
      <Typography sx={{ ...bodyTextSx, color: "rgba(248,250,252,0.45)", fontStyle: "italic" }}>
        No information provided.
      </Typography>
    );
  }
  if (paras.length === 1) {
    return <Typography sx={bodyTextSx}>{paras[0]}</Typography>;
  }
  return (
    <Stack spacing={1.25}>
      {paras.map((p, i) => (
        <Typography key={i} sx={bodyTextSx}>
          {p}
        </Typography>
      ))}
    </Stack>
  );
}

export default function ChallengesAndSolutions({ project }) {
  const challenges = project?.challengesFaced;
  const solutions = project?.solutionsImplemented;
  const approach = project?.uniqueApproach;

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 5, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 5 },
        background: `linear-gradient(165deg, ${secondaryDark} 0%, rgb(12, 18, 28) 45%, ${secondaryDark} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 85% 70% at 100% -10%, rgba(251, 134, 30, 0.18), transparent 52%),
            radial-gradient(ellipse 75% 60% at -5% 105%, rgba(255, 255, 255, 0.06), transparent 55%),
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251, 134, 30, 0.1), transparent 55%),
            linear-gradient(118deg, rgba(251, 134, 30, 0.06) 0%, transparent 42%, rgba(255, 255, 255, 0.03) 100%)
          `,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.4,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 40%, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 40%, black 15%, transparent 70%)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "12%",
          right: "6%",
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          borderRadius: "32% 68% 65% 35% / 42% 36% 64% 58%",
          background: "linear-gradient(145deg, rgba(251, 134, 30, 0.16), rgba(255, 184, 116, 0.08))",
          filter: "blur(0.5px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "8%",
          left: "4%",
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
          borderRadius: "63% 37% 42% 58% / 55% 48% 52% 45%",
          border: "1px solid rgba(251, 134, 30, 0.22)",
          background: "rgba(255, 255, 255, 0.04)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 1120, mx: "auto", position: "relative", zIndex: 1 }}>
        <Stack alignItems="center" spacing={1} sx={{ mb: { xs: 3, md: 4 }, textAlign: "center" }}>
          <Typography
            sx={{
              color: primaryLight,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            How we overcame constraints
          </Typography>
          <Typography
            component="h2"
            sx={{
              color: "#f8fafc",
              fontFamily: '"Times New Roman", Georgia, serif',
              fontSize: { xs: 28, sm: 34, md: 38 },
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 520,
            }}
          >
            Challenges &amp; solutions
          </Typography>
          <Typography
            sx={{
              color: "rgba(248,250,252,0.55)",
              fontSize: 15,
              maxWidth: 560,
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            On-site realities, engineered responses, and the approach that kept delivery on track.
          </Typography>
        </Stack>

        <Grid container spacing={2.25}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Panel
              icon={<ReportProblemOutlinedIcon sx={{ fontSize: 26 }} />}
              title="Challenges faced"
            >
              <ListBody body={challenges} />
            </Panel>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Panel
              icon={<TaskAltOutlinedIcon sx={{ fontSize: 26 }} />}
              title="Solutions implemented"
            >
              <ListBody body={solutions} />
            </Panel>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 2.5, md: 3 }, borderColor: borderSubtle }} />

        <Panel icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 26 }} />} title="Unique approach">
          <PlainBody body={approach} />
        </Panel>
      </Box>
    </Box>
  );
}
