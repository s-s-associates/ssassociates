import { ServicePageJsonLd } from "@/components/seo/SEO";
import ServiceDetailView from "@/components/website/services/ServiceDetailView";
import { bggrayColor, bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import { connectDB } from "@/lib/db";
import { getSiteUrl, truncateMetaDescription } from "@/lib/site-config";
import Service from "@/models/Service";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export async function generateMetadata({ params }) {
  const resolved = await params;
  const id = decodeURIComponent(resolved?.id || "");
  const base = getSiteUrl();
  const path = `/services/${id}`;
  await connectDB();
  const service = await Service.findById(id).select("title description imageUrl").lean();
  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }
  const desc = truncateMetaDescription(service.description || service.title || "");
  const canonical = `${base}${path}`;
  return {
    title: `${service.title} | Services`,
    description: desc || undefined,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: service.title || "Service",
      description: desc || undefined,
      url: canonical,
      type: "website",
      images: service.imageUrl ? [{ url: service.imageUrl, alt: service.title || "Service" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title || "Service",
      description: desc || undefined,
      images: service.imageUrl ? [service.imageUrl] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolved = await params;
  const id = decodeURIComponent(resolved?.id || "");
  await connectDB();
  const raw = await Service.findById(id).lean();

  if (!raw) {
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
          <Typography sx={{ fontSize: 26, fontWeight: 700, mb: 1 }}>Service Not Found</Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.6)", mb: 3 }}>
            This service is not available. It may have been removed or the link is incorrect.
          </Typography>
          <Link href="/services" style={{ textDecoration: "none" }}>
            <Button
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
              Back to Services
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

  const service = JSON.parse(JSON.stringify(raw));
  const base = getSiteUrl();
  const path = `/services/${id}`;
  return (
    <>
      <ServicePageJsonLd service={service} baseUrl={base} path={path} />
      <ServiceDetailView service={service} />
    </>
  );
}
