"use client";

import { primaryColor } from "@/components/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { getAuth } from "@/lib/auth-storage";

const CHART_COLORS = [primaryColor, "#0EA5E9", "#10B981", "#F59E0B", "#EF4444"];
const DEFAULT_TREND = [
  { month: "Jan", value: 2 },
  { month: "Feb", value: 4 },
  { month: "Mar", value: 3 },
  { month: "Apr", value: 6 },
  { month: "May", value: 5 },
  { month: "Jun", value: 8 },
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export function useDashboardData() {
  const { token } = getAuth();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ projects: 0, categories: 0, admins: 0 });
  const [projectsByCategory, setProjectsByCategory] = useState([]);
  const [projectsByStatus, setProjectsByStatus] = useState([]);
  const [trendData, setTrendData] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setCounts({ projects: 0, categories: 0, admins: 0 });
      setProjectsByCategory([]);
      setProjectsByStatus([]);
      setTrendData(DEFAULT_TREND);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [projRes, catRes, admRes] = await Promise.all([
        fetch("/api/projects", { headers }),
        fetch("/api/categories", { headers }),
        fetch("/api/admins", { headers }),
      ]);
      const projData = projRes.ok ? await projRes.json() : { projects: [] };
      const catData = catRes.ok ? await catRes.json() : { categories: [] };
      const admData = admRes.ok ? await admRes.json() : { admins: [] };

      const projects = projData.projects || [];
      const categories = catData.categories || [];
      const admins = admData.admins || [];

      setCounts({
        projects: projects.length,
        categories: categories.length,
        admins: admins.length,
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
      if (trend.every((t) => t.value === 0) && projects.length > 0)
        setTrendData(MONTHS.map((m, i) => ({ month: m, value: i + 1 })));
      else setTrendData(trend);
    } catch {
      setCounts({ projects: 0, categories: 0, admins: 0 });
      setProjectsByCategory([]);
      setProjectsByStatus([]);
      setTrendData(DEFAULT_TREND);
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
  };
}
