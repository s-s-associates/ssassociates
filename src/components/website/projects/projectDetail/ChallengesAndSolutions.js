import { bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Divider, Paper, Typography } from "@mui/material";

function Block({ title, body }) {
  const text = String(body || "").trim();
  return (
    <Box sx={{ mb: 2.5, "&:last-of-type": { mb: 0 } }}>
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: primaryColor, mb: 1 }}>{title}</Typography>
      <Typography sx={{ color: "rgba(0,0,0,0.72)", lineHeight: 1.75 }}>
        {text || "No information provided."}
      </Typography>
    </Box>
  );
}

export default function ChallengesAndSolutions({ project }) {
  const challenges = project?.challengesFaced;
  const solutions = project?.solutionsImplemented;
  const approach = project?.uniqueApproach;

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>Challenges &amp; solutions</Typography>

      <Block title="Challenges faced" body={challenges} />
      <Divider sx={{ my: 2 }} />
      <Block title="Solutions implemented" body={solutions} />
      <Divider sx={{ my: 2 }} />
      <Block title="Unique approach" body={approach} />
    </Paper>
  );
}
