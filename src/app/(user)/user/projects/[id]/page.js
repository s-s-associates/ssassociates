import {
  bggrayColor,
  bordergrayColor,
  primaryColor,
  primaryHover,
} from "@/components/utils/Colors";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiHome, FiMail } from "react-icons/fi";

const projects = [
  {
    _id: "alpha-hq-fitout",
    bannerUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80",
    title: "Alpha HQ Workplace Transformation",
    tagline: "Modern collaborative workspace with high-efficiency systems",
    location: "Dublin, Ireland",
    status: "Completed",
    year: "2025",
    ctaType: "Contact Us",
    ctaLink: "https://example.com/contact",
    description:
      "This project delivered a full office interior transformation for Alpha HQ, focused on flexible team zones, acoustic comfort, and improved circulation. The scope included planning, structural refinements, premium finishes, and handover support to ensure business continuity during transition phases.",
    clientName: "Alpha Group",
    category: "Corporate Interior",
    projectArea: "8200",
    projectAreaUnit: "sq ft",
    budget: "€1.8M",
    durationStart: "2024-05-10",
    durationEnd: "2025-01-22",
    structureType: "Steel + reinforced slab retrofit",
    floors: "4",
    materialsUsed:
      "Engineered timber, Low-VOC paint, Acoustic PET panels, LED smart lighting, Raised flooring",
    foundationType: "Existing foundation retained",
    safetyStandards:
      "ISO 45001 site controls, Fire compartmentation upgrades, Emergency route compliance",
    sustainabilityFeatures:
      "Low-VOC materials, Occupancy-based lighting controls, Water-efficient fixtures, Recycled content finishes",
    certifications: "LEED Silver readiness, Local fire compliance certification",
    imageGallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    ],
    videoUrl: "https://example.com/videos/alpha-hq-tour",
    challengesFaced:
      "Active office operations during construction and strict delivery windows for critical materials.",
    solutionsImplemented:
      "Night-shift sequencing, zone-wise handovers, and a phased logistics plan minimized disruption.",
    uniqueApproach:
      "Integrated BIM coordination with weekly stakeholder demos accelerated approvals and reduced revisions.",
  },
  {
    _id: "metro-campus-phase-2",
    bannerUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
    title: "Metro Campus Phase 2",
    tagline: "Scalable workspace for hybrid teams",
    location: "Belfast, UK",
    status: "Ongoing",
    year: "2026",
    ctaType: "Get Quote",
    ctaLink: "https://example.com/quote",
    description:
      "Metro Campus Phase 2 expands capacity and introduces adaptable collaboration zones. The project blends fit-out, MEP enhancement, and ergonomic design principles to support future growth with minimal operational downtime.",
    clientName: "Metro Ventures",
    category: "Office Fit-Out",
    projectArea: "11500",
    projectAreaUnit: "sq ft",
    budget: "€2.4M",
    durationStart: "2025-11-01",
    durationEnd: "2026-08-30",
    structureType: "Composite frame with retrofit partitions",
    floors: "6",
    materialsUsed:
      "Glass partitions, Acoustic baffles, Modular furniture systems, Smart HVAC controls",
    foundationType: "Existing mat foundation",
    safetyStandards:
      "CDM-compliant workflow, Fire-safe cable routing, Enhanced access-control safety",
    sustainabilityFeatures:
      "Daylight optimization, Sensor-driven HVAC, FSC-certified joinery materials",
    certifications: "BREEAM-aligned implementation checklist",
    imageGallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600494603989-9650cf6dad51?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1400&q=80",
    ],
    videoUrl: "https://example.com/videos/metro-campus-progress",
    challengesFaced:
      "Long-lead procurement timelines and an evolving occupancy plan from stakeholder teams.",
    solutionsImplemented:
      "Parallel procurement tracks and modular planning packages enabled controlled phase delivery.",
    uniqueApproach:
      "A digital twin handover model was prepared for operations and future maintenance planning.",
  },
  {
    _id: "horizon-rd-center",
    bannerUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80",
    title: "Horizon R&D Center",
    tagline: "Precision-focused technical workspace with premium detailing",
    location: "Manchester, UK",
    status: "Upcoming",
    year: "2026",
    ctaType: "View Brochure",
    ctaLink: "https://example.com/brochure",
    description:
      "Horizon R&D Center is designed as a high-performance technical office environment with mixed-use labs and support zones. The scheme emphasizes durability, safety, and operational flexibility while maintaining a refined visual language.",
    clientName: "Horizon Labs",
    category: "Research Facility",
    projectArea: "9600",
    projectAreaUnit: "sq ft",
    budget: "€3.1M",
    durationStart: "2026-03-12",
    durationEnd: "2026-12-18",
    structureType: "RC frame with seismic detailing upgrades",
    floors: "5",
    materialsUsed:
      "Epoxy flooring, Stainless steel trims, Anti-static panels, HEPA-compatible ceiling modules",
    foundationType: "Pile foundation enhancement",
    safetyStandards:
      "Laboratory zone safety protocols, Enhanced fire suppression, Controlled-access compliance",
    sustainabilityFeatures:
      "High-efficiency envelope detailing, Reduced embodied carbon finishes, Smart metering",
    certifications: "Targeting WELL-aligned interior strategy",
    imageGallery: [
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1487015307662-6ce6210680f1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    ],
    videoUrl: "https://example.com/videos/horizon-preview",
    challengesFaced:
      "Complex compliance planning for mixed-use technical spaces and strict performance targets.",
    solutionsImplemented:
      "Detailed preconstruction validation, mock-up testing, and integrated consultant workshops.",
    uniqueApproach:
      "Compliance and design were coordinated in one approval stream to shorten decision cycles.",
  },
];

function splitToList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value) {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function getStatusColor(status) {
  if (status === "Completed") return { bg: "rgba(16,185,129,0.16)", color: "#047857" };
  if (status === "Ongoing") return { bg: "rgba(245,158,11,0.18)", color: "#b45309" };
  return { bg: "rgba(99,102,241,0.16)", color: "#4338ca" };
}

export default async function ProjectDetailsPage({ params }) {
  const id = decodeURIComponent(params.id || "");
  const project = projects.find((item) => item._id === id);

  if (!project) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: bggrayColor, minHeight: "100vh" }}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 820,
            mx: "auto",
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: `1px solid ${bordergrayColor}`,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 26, fontWeight: 700, mb: 1 }}>Project Not Found</Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.6)", mb: 3 }}>
            The requested project details are not available in this demo preview.
          </Typography>
          <Button
            component={Link}
            href="/user/projects"
            startIcon={<FiArrowLeft />}
            sx={{
              bgcolor: primaryColor,
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              px: 2.2,
              "&:hover": { bgcolor: primaryHover },
            }}
          >
            Back to Projects
          </Button>
        </Paper>
      </Box>
    );
  }

  const statusStyle = getStatusColor(project.status);
  const technologyItems = splitToList(project.materialsUsed);
  const featureItems = [
    project.sustainabilityFeatures,
    project.safetyStandards,
    project.certifications,
  ]
    .filter(Boolean)
    .flatMap((text) => splitToList(text));

  return (
    <Box sx={{ p: { xs: 2, sm: 10 }, bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, flexWrap: "wrap", gap: 1.5 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "rgba(0,0,0,0.6)" }}>
            <Link href="/user/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "inherit", textDecoration: "none" }}>
              <FiHome size={14} />
              Home
            </Link>
            <Link href="/user/projects" style={{ color: "inherit", textDecoration: "none" }}>
              Projects
            </Link>
            <Typography sx={{ color: "rgba(0,0,0,0.9)" }}>Details</Typography>
          </Breadcrumbs>

          <Button
            component={Link}
            href="/user/projects"
            startIcon={<FiArrowLeft />}
            sx={{
              border: `1px solid ${bordergrayColor}`,
              color: "#111",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { borderColor: primaryColor, color: primaryColor, bgcolor: "rgba(251,134,30,0.08)" },
            }}
          >
            Back to Projects
          </Button>
        </Stack>

        <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
          <Box sx={{ position: "relative", height: { xs: 260, md: 420 }, overflow: "hidden" }}>
            <Box
              component="img"
              src={project.bannerUrl}
              alt={project.title}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s ease",
                "&:hover": { transform: "scale(1.04)" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 12%, rgba(0,0,0,0.2) 58%, transparent 100%)",
              }}
            />
            <Box sx={{ position: "absolute", left: { xs: 16, md: 28 }, right: { xs: 16, md: 28 }, bottom: { xs: 16, md: 24 }, color: "#fff" }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1.2, flexWrap: "wrap" }}>
                <Chip label={project.category || "Uncategorized"} size="small" sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }} />
                <Chip label={project.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 700 }} />
              </Stack>
              <Typography sx={{ fontSize: { xs: 26, md: 42 }, fontWeight: 800, lineHeight: 1.12 }}>{project.title}</Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, opacity: 0.92, mt: 0.8 }}>{project.tagline || project.location}</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1.2, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 13 }}>Client: {project.clientName || "N/A"}</Typography>
                <Typography sx={{ fontSize: 13 }}>Duration: {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}</Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.2 }}>Overview</Typography>
              <Typography sx={{ color: "rgba(0,0,0,0.72)", lineHeight: 1.75 }}>{project.description || "No description provided."}</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Features</Typography>
              {featureItems.length ? (
                <Grid container spacing={1.4}>
                  {featureItems.map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item}>
                      <Box
                        sx={{
                          p: 1.4,
                          borderRadius: 2,
                          bgcolor: "#fff",
                          border: `1px solid ${bordergrayColor}`,
                          transition: "all 0.25s ease",
                          "&:hover": { borderColor: primaryColor, transform: "translateY(-2px)" },
                        }}
                      >
                        <Typography sx={{ color: "rgba(0,0,0,0.75)", fontSize: 14 }}>{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>No feature entries available.</Typography>
              )}
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Technologies</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {technologyItems.length ? (
                  technologyItems.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: "rgba(251,134,30,0.1)", color: "#9a4a08", fontWeight: 600 }} />
                  ))
                ) : (
                  <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>No material/technology details available.</Typography>
                )}
              </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}` }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Image Gallery</Typography>
              <Grid container spacing={1.5}>
                {(project.imageGallery || []).map((url, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${url}-${index}`}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: `1px solid ${bordergrayColor}`,
                        height: 180,
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={url}
                        alt={`${project.title} ${index + 1}`}
                        loading="lazy"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.45s ease",
                          "&:hover": { transform: "scale(1.06)" },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1.2 }}>Project Meta</Typography>
              <MetaRow label="Client" value={project.clientName} />
              <MetaRow label="Category" value={project.category} />
              <MetaRow label="Status" value={project.status} />
              <MetaRow label="Year" value={project.year} />
              <MetaRow label="Location" value={project.location} />
              <MetaRow label="Area" value={`${project.projectArea || "N/A"} ${project.projectAreaUnit || ""}`} />
              <MetaRow label="Budget" value={project.budget} />
              <MetaRow label="Structure Type" value={project.structureType} />
              <MetaRow label="Floors" value={project.floors} />
              <MetaRow label="Foundation Type" value={project.foundationType} />
              <MetaRow label="Duration Start" value={formatDate(project.durationStart)} />
              <MetaRow label="Duration End" value={formatDate(project.durationEnd)} />
              <MetaRow label="Video URL" value={project.videoUrl || "N/A"} isLink />
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, border: `1px solid ${bordergrayColor}` }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1.4 }}>Actions</Typography>
              <Stack spacing={1.2}>
                <Button
                  component={Link}
                  href="/contact"
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
                <Button
                  component={Link}
                  href={project.ctaLink || "https://example.com/live"}
                  target="_blank"
                  rel="noopener noreferrer"
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
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function MetaRow({ label, value, isLink = false }) {
  const safe = value || "N/A";
  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ py: 1 }}>
        <Typography sx={{ color: "rgba(0,0,0,0.58)", fontSize: 13 }}>{label}</Typography>
        {isLink && typeof safe === "string" && safe.startsWith("http") ? (
          <Link href={safe} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", fontWeight: 600, fontSize: 13 }}>
            Open
          </Link>
        ) : (
          <Typography sx={{ color: "#111", fontSize: 13, fontWeight: 600, textAlign: "right" }}>{safe}</Typography>
        )}
      </Stack>
      <Divider />
    </>
  );
}
