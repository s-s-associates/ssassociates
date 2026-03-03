"use client";

import { primaryColor } from "@/components/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { getAuth } from "@/lib/auth-storage";

const CHART_COLORS = [primaryColor, "#0EA5E9", "#10B981", "#F59E0B", "#EF4444"];
const DEFAULT_TREND = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const DEFAULT_COUNTS = {
  projects: 0,
  categories: 0,
  admins: 0,
  clients: 0,
  contactSubmissions: 0,
  subscribers: 0,
  services: 0,
  testimonials: 0,
  faqs: 0,
};

export function useDashboardData() {
  const { token } = getAuth();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState(DEFAULT_COUNTS);
  const [projectsByCategory, setProjectsByCategory] = useState([]);
  const [projectsByStatus, setProjectsByStatus] = useState([]);
  const [trendData, setTrendData] = useState(DEFAULT_TREND);
  const [websiteContent, setWebsiteContent] = useState([]);
  const [submissionsTrend, setSubmissionsTrend] = useState([]);
  const [subscribersTrend, setSubscribersTrend] = useState([]);
  const [overviewComboData, setOverviewComboData] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setCounts(DEFAULT_COUNTS);
      setProjectsByCategory([]);
      setProjectsByStatus([]);
      setTrendData(DEFAULT_TREND);
      setWebsiteContent([]);
      setSubmissionsTrend([]);
      setSubscribersTrend([]);
      setOverviewComboData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}`, cache: "no-store" };
      const [
        projRes,
        catRes,
        admRes,
        clientsRes,
        submissionsRes,
        subscribersRes,
        servicesRes,
        testimonialsRes,
        faqsRes,
      ] = await Promise.all([
        fetch("/api/projects", { headers }),
        fetch("/api/categories", { headers }),
        fetch("/api/admins", { headers }),
        fetch("/api/clients", { headers }),
        fetch("/api/contact-submissions", { headers }),
        fetch("/api/subscribers", { headers }),
        fetch("/api/services", { headers }),
        fetch("/api/testimonials", { headers }),
        fetch("/api/faqs", { headers }),
      ]);

      const projects = projRes.ok ? (await projRes.json()).projects || [] : [];
      const categories = catRes.ok ? (await catRes.json()).categories || [] : [];
      const admins = admRes.ok ? (await admRes.json()).admins || [] : [];
      const clients = clientsRes.ok ? (await clientsRes.json()).clients || [] : [];
      const submissions = submissionsRes.ok ? (await submissionsRes.json()).submissions || [] : [];
      const subscribers = subscribersRes.ok ? (await subscribersRes.json()).subscribers || [] : [];
      const services = servicesRes.ok ? (await servicesRes.json()).services || [] : [];
      const testimonials = testimonialsRes.ok ? (await testimonialsRes.json()).testimonials || [] : [];
      const faqs = faqsRes.ok ? (await faqsRes.json()).faqs || [] : [];

      setCounts({
        projects: projects.length,
        categories: categories.length,
        admins: admins.length,
        clients: clients.length,
        contactSubmissions: submissions.length,
        subscribers: subscribers.length,
        services: services.length,
        testimonials: testimonials.length,
        faqs: faqs.length,
      });

      const byCategory = {};
      projects.forEach((p) => {
        const cat = p.category || "Other";
        byCategory[cat] = (byCategory[cat] || 0) + 1;
      });
      setProjectsByCategory(
        Object.entries(byCategory).map(([name, count]) => ({
          name,
          count,
          fill: CHART_COLORS[Object.keys(byCategory).indexOf(name) % CHART_COLORS.length],
        }))
      );

      const byStatus = {};
      projects.forEach((p) => {
        const s = p.status || "Upcoming";
        byStatus[s] = (byStatus[s] || 0) + 1;
      });
      setProjectsByStatus(Object.entries(byStatus).map(([name, value]) => ({ name, value })));

      const byMonth = {};
      MONTHS.forEach((_, i) => {
        byMonth[i] = 0;
      });
      projects.forEach((p) => {
        if (p.createdAt) {
          const m = new Date(p.createdAt).getMonth();
          if (byMonth[m] !== undefined) byMonth[m]++;
        }
      });
      const trend = MONTHS.map((month, i) => ({ month, value: byMonth[i] || 0 }));
      setTrendData(trend.every((t) => t.value === 0) ? DEFAULT_TREND : trend);

      const subByMonth = {};
      MONTHS.forEach((_, i) => {
        subByMonth[i] = 0;
      });
      submissions.forEach((s) => {
        if (s.createdAt) {
          const m = new Date(s.createdAt).getMonth();
          if (subByMonth[m] !== undefined) subByMonth[m]++;
        }
      });
      setSubmissionsTrend(MONTHS.map((month, i) => ({ month, value: subByMonth[i] || 0 })));

      const subrByMonth = {};
      MONTHS.forEach((_, i) => {
        subrByMonth[i] = 0;
      });
      subscribers.forEach((s) => {
        if (s.createdAt) {
          const m = new Date(s.createdAt).getMonth();
          if (subrByMonth[m] !== undefined) subrByMonth[m]++;
        }
      });
      setSubscribersTrend(MONTHS.map((month, i) => ({ month, value: subrByMonth[i] || 0 })));

      setOverviewComboData(
        MONTHS.map((month, i) => ({
          month,
          projects: byMonth[i] || 0,
          submissions: subByMonth[i] || 0,
          subscribers: subrByMonth[i] || 0,
        }))
      );

      setWebsiteContent([
        { name: "Services", value: services.length, fill: primaryColor },
        { name: "Testimonials", value: testimonials.length, fill: "#0EA5E9" },
        { name: "FAQs", value: faqs.length, fill: "#10B981" },
      ]);
    } catch {
      setCounts(DEFAULT_COUNTS);
      setProjectsByCategory([]);
      setProjectsByStatus([]);
      setTrendData(DEFAULT_TREND);
      setWebsiteContent([]);
      setSubmissionsTrend([]);
      setSubscribersTrend([]);
      setOverviewComboData([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    loading,
    counts,
    trendData,
    projectsByCategory,
    projectsByStatus,
    websiteContent,
    submissionsTrend,
    subscribersTrend,
    overviewComboData,
    refresh: fetchDashboardData,
  };
}
