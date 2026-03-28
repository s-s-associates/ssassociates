"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Grid,
  Skeleton,
  Button,
  Tabs,
  Tab,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon, Add, Edit, Delete, Visibility, Send } from "@mui/icons-material";
import Swal from "sweetalert2";
import { primaryColor, primaryHover, bggrayColor, bordergrayColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";

const API_SUBSCRIBERS = "/api/subscribers";
const API_TEMPLATES = "/api/email-templates";
const API_SEND_BULK = "/api/send-bulk-email";
const API_EMAIL_LOGS = "/api/email-logs";
const API_EMAIL_STATS = "/api/email-logs/stats";
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];
const APP_URL = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_APP_URL || window.location.origin) : "";

const PRESET_EMAIL_TEMPLATES = [
  {
    id: "preset-welcome",
    title: "Welcome Email",
    category: "Onboarding",
    categoryColor: "#10b981",
    description: `Welcome new subscribers and introduce ${process.env.NEXT_PUBLIC_COMPANY_NAME} services.`,
    subject: `Welcome to ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    heading: `Welcome to ${process.env.NEXT_PUBLIC_COMPANY_NAME}!`,
    body: "Hello {{name}},\n\nThank you for subscribing. We're glad to have you.\n\nExplore our services and get in touch for more information.",
    ctaText: "Explore Services",
    ctaUrl: `${APP_URL}/services`,
    isPreset: true,
  },
  {
    id: "preset-newsletter",
    title: "Monthly Newsletter",
    category: "Engagement",
    categoryColor: "#3b82f6",
    description: "Monthly update on projects, services, and company news.",
    subject: `${process.env.NEXT_PUBLIC_COMPANY_NAME} – Monthly Update`,
    heading: `Your Monthly Update – ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    body: "Hello {{name}},\n\nHere's our latest update: new projects, service highlights, and news.\n\nStay connected with us.",
    ctaText: "Visit Website",
    ctaUrl: APP_URL || "/",
    isPreset: true,
  },
  {
    id: "preset-promotion",
    title: "Service Offer",
    category: "Promotion",
    categoryColor: "#f59e0b",
    description: "Special offer or update on services for subscribers.",
    subject: `Special Offer – ${process.env.NEXT_PUBLIC_COMPANY_NAME} Services`,
    heading: `Limited Time Offer – ${process.env.NEXT_PUBLIC_COMPANY_NAME} Services`,
    body: "Hello {{name}},\n\nWe have a special update on our services this month. Contact us for more details.\n\nDon't miss out.",
    ctaText: "Get in Touch",
    ctaUrl: `${APP_URL}/contact`,
    isPreset: true,
  },
  {
    id: "preset-announcement",
    title: "New Service / Project",
    category: "Announcement",
    categoryColor: "#8b5cf6",
    description: "Announce a new service, project, or company milestone.",
    subject: `New from ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    heading: "We're Expanding Our Services",
    body: "Hello {{name}},\n\nWe're excited to share our latest updates. Reach out to learn how we can support you.",
    ctaText: "Learn More",
    ctaUrl: APP_URL || "/",
    isPreset: true,
  },
];

function getAuthHeaders() {
  const { token } = getAuth();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function TableSkeleton({ rows = 3 }) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton variant="text" width={40} /></TableCell>
          <TableCell><Skeleton variant="text" width={200} /></TableCell>
          <TableCell><Skeleton variant="text" width={120} /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function buildPreviewHtml(body, ctaText, ctaUrl, heading) {
  const hasCta = ctaText && ctaUrl;
  const ctaBlock = hasCta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0 0 0;"><tr><td align="center"><a href="${ctaUrl}" target="_blank" rel="noopener" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); color: #fff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">${ctaText}</a></td></tr></table>`
    : "";
  const headingBlock = heading ? `<h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1f2937;">${heading}</h1>` : "";
  const content = (body || "").replace(/\n/g, "<br>");
  const inner = `${headingBlock}<div style="color: #1f2937; font-size: 16px; line-height: 1.65;">${content}</div>${ctaBlock}`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f0f2f5;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f2f5; padding: 24px;"><tr><td align="center"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);"><tr><td style="padding: 40px 32px;">${inner}</td></tr><tr><td style="padding: 20px 32px; background-color: #f8fafc; border-radius: 0 0 12px 12px; text-align: center;"><p style="margin: 0; color: #64748b; font-size: 12px;">This email was sent from ${process.env.NEXT_PUBLIC_COMPANY_NAME}.</p></td></tr></table></td></tr></table></body></html>`;
}

export default function SubscribersPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState(0);

  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateForm, setTemplateForm] = useState({ title: "", subject: "", description: "", ctaText: "", ctaUrl: "" });
  const [templateSaving, setTemplateSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState({ body: "", ctaText: "", ctaUrl: "" });

  const [composeOpen, setComposeOpen] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeHeading, setComposeHeading] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeCtaText, setComposeCtaText] = useState("");
  const [composeCtaUrl, setComposeCtaUrl] = useState("");
  const [composeTemplateId, setComposeTemplateId] = useState("");
  const [composeTemplateTitle, setComposeTemplateTitle] = useState("");
  const [composePreviewOpen, setComposePreviewOpen] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [composeSelectedIds, setComposeSelectedIds] = useState(new Set());

  const [emailStats, setEmailStats] = useState({ totalSent: 0, totalCampaigns: 0 });
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const [logs, setLogs] = useState([]);
  const [logsTotal, setLogsTotal] = useState(0);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsPage, setLogsPage] = useState(0);
  const logsLimit = 10;

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_SUBSCRIBERS, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const subs = (data.subscribers || []).map((s) => ({ ...s, id: s._id || s.id }));
      setList(Array.isArray(data.subscribers) ? subs : []);
    } catch (err) {
      setList([]);
      Swal.fire({ title: "Failed to load", text: "Could not load subscribers.", icon: "error", confirmButtonColor: primaryColor });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTemplates = useCallback(async () => {
    setTemplatesLoading(true);
    try {
      const res = await fetch(API_TEMPLATES, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch templates");
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setTemplates(arr.map((t) => ({ ...t, id: (t._id || t.id)?.toString() })));
    } catch (err) {
      setTemplates([]);
      Swal.fire({ title: "Failed to load", text: "Could not load email templates.", icon: "error", confirmButtonColor: primaryColor });
    } finally {
      setTemplatesLoading(false);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const res = await fetch(`${API_EMAIL_LOGS}?page=${logsPage}&limit=${logsLimit}`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      setLogs(data.logs || []);
      setLogsTotal(data.total ?? 0);
    } catch (err) {
      setLogs([]);
      setLogsTotal(0);
    } finally {
      setLogsLoading(false);
    }
  }, [logsPage]);

  const fetchEmailStats = useCallback(async () => {
    try {
      const res = await fetch(API_EMAIL_STATS, { headers: getAuthHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      setEmailStats({ totalSent: data.totalSent ?? 0, totalCampaigns: data.totalCampaigns ?? 0 });
    } catch {
      setEmailStats({ totalSent: 0, totalCampaigns: 0 });
    }
  }, []);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);
  useEffect(() => { fetchEmailStats(); }, [fetchEmailStats]);
  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);
  useEffect(() => { if (activeTab === 1) fetchLogs(); }, [activeTab, logsPage, fetchLogs]);

  const displayTemplates = useMemo(() => {
    const apiTemplates = (templates || []).map((t) => ({
      ...t,
      description: t.description || t.subject || "",
      body: t.body || t.description || "",
      heading: t.heading || "",
      isPreset: false,
    }));
    return [...PRESET_EMAIL_TEMPLATES, ...apiTemplates];
  }, [templates]);

  const filteredList = useMemo(() => {
    let result = list;
    const q = searchQuery.trim().toLowerCase();
    if (q) result = result.filter((s) => (s.email || "").toLowerCase().includes(q));
    if (dateFrom) {
      const fromStart = new Date(dateFrom);
      fromStart.setHours(0, 0, 0, 0);
      result = result.filter((s) => s.createdAt && new Date(s.createdAt) >= fromStart);
    }
    if (dateTo) {
      const toEnd = new Date(dateTo);
      toEnd.setHours(23, 59, 59, 999);
      result = result.filter((s) => s.createdAt && new Date(s.createdAt) <= toEnd);
    }
    return result;
  }, [list, searchQuery, dateFrom, dateTo]);

  const paginatedList = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredList.slice(start, start + rowsPerPage);
  }, [filteredList, page, rowsPerPage]);

  const allOnPageSelected = paginatedList.length > 0 && paginatedList.every((s) => selectedIds.has(s.id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allOnPageSelected) {
      const toRemove = new Set(paginatedList.map((s) => s.id));
      setSelectedIds((prev) => new Set([...prev].filter((id) => !toRemove.has(id))));
    } else {
      setSelectedIds((prev) => new Set([...prev, ...paginatedList.map((s) => s.id)]));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAllSubscribers = () => {
    if (selectedIds.size === filteredList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredList.map((s) => s.id)));
    }
  };

  const openTemplateDialog = (template = null) => {
    setEditingTemplate(template);
    setTemplateForm({
      title: template?.title ?? "",
      subject: template?.subject ?? "",
      description: template?.description ?? template?.body ?? "",
      ctaText: template?.ctaText ?? "",
      ctaUrl: template?.ctaUrl ?? "",
    });
    setTemplateDialogOpen(true);
  };

  const saveTemplate = async () => {
    const { title, subject, description, ctaText, ctaUrl } = templateForm;
    if (!title.trim()) {
      Swal.fire({ title: "Required", text: "Template title is required.", icon: "warning", confirmButtonColor: primaryColor });
      return;
    }
    setTemplateSaving(true);
    try {
      const payload = { title: title.trim(), subject: subject.trim(), description: description.trim(), body: description.trim(), ctaText: ctaText.trim(), ctaUrl: ctaUrl.trim() };
      const url = editingTemplate ? `${API_TEMPLATES}/${editingTemplate.id}` : API_TEMPLATES;
      const method = editingTemplate ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        Swal.fire({ title: "Error", text: data.error || data.message || "Failed to save template.", icon: "error", confirmButtonColor: primaryColor });
        return;
      }
      const normalized = { ...data, id: (data._id || data.id)?.toString() };
      if (editingTemplate) {
        setTemplates((prev) => prev.map((t) => (t.id === editingTemplate.id ? normalized : t)));
      } else {
        setTemplates((prev) => [normalized, ...prev]);
      }
      setTemplateDialogOpen(false);
      setEditingTemplate(null);
      Swal.fire({ title: "Saved", text: "Template saved successfully.", icon: "success", confirmButtonColor: primaryColor });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message || "Failed to save.", icon: "error", confirmButtonColor: primaryColor });
    } finally {
      setTemplateSaving(false);
    }
  };

  const deleteTemplate = (t) => {
    if (t.isPreset) return;
    Swal.fire({
      title: "Delete template?",
      text: `Remove "${t.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await fetch(`${API_TEMPLATES}/${t.id}`, { method: "DELETE", headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Delete failed");
        setTemplates((prev) => prev.filter((x) => x.id !== t.id));
        Swal.fire({ title: "Deleted", text: "Template removed.", icon: "success", confirmButtonColor: primaryColor });
      } catch {
        Swal.fire({ title: "Error", text: "Could not delete template.", icon: "error", confirmButtonColor: primaryColor });
      }
    });
  };

  const handleDeleteSubscriber = (s) => {
    if (!s?.id) return;
    Swal.fire({
      title: "Delete subscriber?",
      text: `Remove ${s.email} from the list?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await fetch(`${API_SUBSCRIBERS}/${s.id}`, { method: "DELETE", headers: getAuthHeaders() });
        const data = res.ok ? await res.json().catch(() => ({})) : null;
        if (!res.ok) throw new Error(data?.error || data?.message || "Delete failed");
        await fetchSubscribers();
        Swal.fire({ title: "Deleted", text: "Subscriber removed.", icon: "success", confirmButtonColor: primaryColor });
      } catch {
        Swal.fire({ title: "Error", text: "Could not delete subscriber.", icon: "error", confirmButtonColor: primaryColor });
      }
    });
  };

  const openPreview = (body, ctaText, ctaUrl, subject, heading) => {
    setPreviewContent({
      body: body || "",
      ctaText: ctaText || "",
      ctaUrl: ctaUrl || "",
      subject: subject || "",
      heading: heading || "",
    });
    setPreviewOpen(true);
  };

  const openPreviewFromTemplate = (template) => {
    if (!template) return;
    const body = template.body ?? template.description ?? "";
    setPreviewTemplate(template);
    setPreviewContent({
      subject: template.subject || "",
      heading: template.heading || "",
      body,
      ctaText: template.ctaText || "",
      ctaUrl: template.ctaUrl || "",
    });
    setPreviewOpen(true);
  };

  const openSendFromPreview = () => {
    setPreviewOpen(false);
    if (previewTemplate) {
      setComposeSubject(previewContent.subject || previewTemplate.subject || "");
      setComposeHeading(previewContent.heading || previewTemplate.heading || "");
      setComposeBody(previewContent.body || previewTemplate.body || previewTemplate.description || "");
      setComposeCtaText(previewContent.ctaText || previewTemplate.ctaText || "");
      setComposeCtaUrl(previewContent.ctaUrl || previewTemplate.ctaUrl || "");
      setComposeTemplateId(previewTemplate.id || "");
      setComposeTemplateTitle(previewTemplate.title || "");
    }
    setComposeOpen(true);
  };

  const openCompose = (template = null) => {
    if (template) {
      setComposeSubject(template.subject || "");
      setComposeHeading(template.heading || "");
      setComposeBody(template.body ?? template.description ?? "");
      setComposeCtaText(template.ctaText || "");
      setComposeCtaUrl(template.ctaUrl || "");
      setComposeTemplateId(template.id || "");
      setComposeTemplateTitle(template.title || "");
    } else {
      setComposeSubject("");
      setComposeHeading("");
      setComposeBody("");
      setComposeCtaText("");
      setComposeCtaUrl("");
      setComposeTemplateId("");
      setComposeTemplateTitle("");
    }
    setComposeSelectedIds(selectedIds.size > 0 ? new Set(selectedIds) : new Set(filteredList.map((s) => s.id)));
    setComposeOpen(true);
  };

  const sendBulkEmail = async () => {
    if (!composeSubject.trim()) {
      Swal.fire({ title: "Required", text: "Email subject is required.", icon: "warning", confirmButtonColor: primaryColor });
      return;
    }
    if (!composeBody.trim()) {
      Swal.fire({ title: "Required", text: "Email body is required.", icon: "warning", confirmButtonColor: primaryColor });
      return;
    }
    const recipients = list.filter((s) => composeSelectedIds.has(s.id)).map((s) => s.email);
    if (recipients.length === 0) {
      Swal.fire({ title: "No recipients", text: "Select at least one subscriber or add subscribers first.", icon: "warning", confirmButtonColor: primaryColor });
      return;
    }
    const bodyWithHeading = composeHeading.trim()
      ? `<h1 style="margin:0 0 16px 0;font-size:24px;">${composeHeading.trim()}</h1>\n${composeBody.trim().replace(/\n/g, "<br>")}`
      : composeBody.trim().replace(/\n/g, "<br>");
    setSendLoading(true);
    try {
      const res = await fetch(API_SEND_BULK, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          subject: composeSubject.trim(),
          body: bodyWithHeading,
          heading: composeHeading.trim(),
          ctaText: composeCtaText.trim() || undefined,
          ctaUrl: composeCtaUrl.trim() || undefined,
          recipientEmails: recipients,
          templateId: composeTemplateId || undefined,
          templateTitle: composeTemplateTitle,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        Swal.fire({ title: "Send failed", text: data.error || data.message || "Could not send emails.", icon: "error", confirmButtonColor: primaryColor });
        return;
      }
      setComposeOpen(false);
      setComposeSelectedIds(new Set());
      setSelectedIds(new Set());
      fetchEmailStats();
      Swal.fire({
        title: "Emails sent",
        html: `Success: <strong>${data.successCount ?? 0}</strong>${(data.failedCount ?? 0) > 0 ? `, Failed: <strong>${data.failedCount}</strong>` : ""}.`,
        icon: "success",
        confirmButtonColor: primaryColor,
      });
      if (activeTab === 1) fetchLogs();
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message || "Failed to send.", icon: "error", confirmButtonColor: primaryColor });
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh", minWidth: 0, overflowX: "hidden" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
          Subscribers &amp; Email
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage subscribers, email templates, and send bulk emails.
        </Typography>
      </Box>

      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tab label="Subscribers & Emails" id="main-tab" />
        <Tab label="Email Logs" id="logs-tab" />
      </Tabs>

      {activeTab === 0 && (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: 2, p: 2, height: "100%", borderColor: bordergrayColor }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography variant="h5" fontWeight={700} color="primary">{displayTemplates.length}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Email Templates</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: 2, p: 2, height: "100%", borderColor: bordergrayColor }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography variant="h5" fontWeight={700}>{emailStats.totalSent}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Emails Sent</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: 2, p: 2, height: "100%", borderColor: bordergrayColor }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography variant="h5" fontWeight={700}>{list.length}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Total Subscribers</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card variant="outlined" sx={{ borderRadius: 2, p: 2, height: "100%", borderColor: bordergrayColor }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography variant="h5" fontWeight={700}>—</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Open Rate</Typography>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>Email templates</Typography>
            <Button startIcon={<Add />} size="small" variant="outlined" onClick={() => openTemplateDialog(null)} sx={{ textTransform: "none", borderColor: bordergrayColor, color: "#000", "&:hover": { borderColor: primaryColor, color: primaryColor } }}>Add Template</Button>
          </Box>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {displayTemplates.map((t) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.id}>
                <Card variant="outlined" sx={{ borderRadius: 2, p: 2, height: "100%", display: "flex", flexDirection: "column", borderColor: bordergrayColor }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, flexWrap: "wrap" }}>
                    <Typography variant="subtitle1" fontWeight={600}>{t.title}</Typography>
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.25,
                        borderRadius: 10,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        bgcolor: t.categoryColor || "grey.200",
                        color: "#fff",
                      }}
                    >
                      {t.category || "Email"}
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t.description || t.subject || "—"}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button size="small" variant="outlined" startIcon={<Visibility />} onClick={() => openPreviewFromTemplate(t)} sx={{ textTransform: "none" }}>Preview</Button>
                    <Button size="small" variant="contained" startIcon={<Send />} onClick={() => openCompose(t)} sx={{ bgcolor: primaryColor, textTransform: "none", "&:hover": { bgcolor: primaryHover } }}>Send</Button>
                    {!t.isPreset && (
                      <>
                        <Button size="small" startIcon={<Edit />} onClick={() => openTemplateDialog(t)} sx={{ textTransform: "none" }}>Edit</Button>
                        <IconButton size="small" onClick={() => deleteTemplate(t)} sx={{ color: "#dc2626" }}><Delete fontSize="small" /></IconButton>
                      </>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Subscribed Emails ({someSelected ? `${selectedIds.size} selected` : "0 selected"})
          </Typography>
          <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden", borderColor: bordergrayColor, bgcolor: "#fff" }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 2, pb: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField size="small"
                      fullWidth
                      placeholder="Search by email..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ "& .MuiInputBase-root": { backgroundColor: bggrayColor } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6, md: 2 }}>
                    <TextField size="small"
                      fullWidth
                      label="From date"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => { setDateFrom(e.target.value); setPage(0); }}
                      InputLabelProps={{ shrink: true }}
                      sx={{ "& .MuiInputBase-root": { backgroundColor: bggrayColor, height: 40 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6, md: 2 }}>
                    <TextField size="small"
                      fullWidth
                      label="To date"
                      type="date"
                      value={dateTo}
                      onChange={(e) => { setDateTo(e.target.value); setPage(0); }}
                      InputLabelProps={{ shrink: true }}
                      sx={{ "& .MuiInputBase-root": { backgroundColor: bggrayColor, height: 40 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 5 }} sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", justifyContent: { md: "flex-end" } }}>
                    <Typography variant="body2" color="text.secondary">
                      {filteredList.length} result{filteredList.length !== 1 ? "s" : ""}
                    </Typography>
                    <Button size="small" variant="outlined" onClick={handleSelectAllSubscribers} sx={{ textTransform: "none" }}>
                      {selectedIds.size === filteredList.length && filteredList.length > 0 ? "Deselect all" : "Select all"}
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Send />}
                      disabled={filteredList.length === 0}
                      onClick={() => openCompose(null)}
                      sx={{ bgcolor: primaryColor, textTransform: "none", "&:hover": { bgcolor: primaryHover } }}
                    >
                      Send email {someSelected ? `(${selectedIds.size})` : "(all)"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="Subscribers table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: bggrayColor }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={someSelected && !allOnPageSelected}
                          checked={paginatedList.length > 0 && allOnPageSelected}
                          onChange={handleSelectAll}
                          size="small"
                          aria-label="Select all on page"
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Subscribed at</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {loading ? (
                    <TableSkeleton rows={3} />
                  ) : filteredList.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                          <Typography color="text.secondary">
                            {list.length === 0 ? "No subscribers yet." : "No results match your search."}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {paginatedList.map((s) => (
                        <TableRow key={s.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedIds.has(s.id)}
                              onChange={() => handleToggleSelect(s.id)}
                              size="small"
                              aria-label={`Select ${s.email}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>{s.email}</Typography>
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            <Typography variant="body2" color="text.secondary">{formatDate(s.createdAt)}</Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteSubscriber(s)}
                              aria-label={`Delete ${s.email}`}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>

              {!loading && filteredList.length > 0 && (
                <TablePagination
                  component="div"
                  count={filteredList.length}
                  page={page}
                  onPageChange={(_, p) => setPage(p)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                  rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                  labelRowsPerPage="Per page:"
                  sx={{ borderTop: 1, borderColor: "divider", bgcolor: bggrayColor }}
                />
              )}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 1 && (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden", borderColor: bordergrayColor, bgcolor: "#fff" }}>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ p: 2, pb: 1 }}>Sending history</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: bggrayColor }}>
                    <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Recipients</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Success / Failed</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                {logsLoading ? (
                  <TableSkeleton rows={3} />
                ) : logs.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Typography color="text.secondary">No email logs yet.</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {logs.map((l) => (
                      <TableRow key={l.id || l._id} hover>
                        <TableCell><Typography variant="body2">{l.subject || "—"}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{l.recipientCount}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{l.successCount} / {l.failedCount}</Typography></TableCell>
                        <TableCell><Typography variant="body2" color={l.status === "failed" ? "error.main" : "text.secondary"}>{l.status}</Typography></TableCell>
                        <TableCell><Typography variant="body2" color="text.secondary">{formatDate(l.createdAt)}</Typography></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {!logsLoading && logsTotal > 0 && (
              <TablePagination
                component="div"
                count={logsTotal}
                page={logsPage}
                onPageChange={(_, p) => setLogsPage(p)}
                rowsPerPage={logsLimit}
                rowsPerPageOptions={[logsLimit]}
                labelRowsPerPage=""
                sx={{ borderTop: 1, borderColor: "divider", bgcolor: bggrayColor }}
              />
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={templateDialogOpen} onClose={() => !templateSaving && setTemplateDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle>{editingTemplate ? "Edit Template" : "Add Template"}</DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField size="small" fullWidth label="Template title" value={templateForm.title} onChange={(e) => setTemplateForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Newsletter January" />
          <TextField size="small" fullWidth label="Email subject" value={templateForm.subject} onChange={(e) => setTemplateForm((f) => ({ ...f, subject: e.target.value }))} placeholder="e.g. Update from SsAssociates" />
          <TextField size="small" fullWidth label="Email body" value={templateForm.description} onChange={(e) => setTemplateForm((f) => ({ ...f, description: e.target.value }))} multiline rows={6} placeholder="Hello {{name}}, ..." helperText="{{name}} and {{email}} are replaced per recipient when sending." />
          <TextField size="small" fullWidth label="CTA button text (optional)" value={templateForm.ctaText} onChange={(e) => setTemplateForm((f) => ({ ...f, ctaText: e.target.value }))} placeholder="e.g. Visit our website" />
          <TextField size="small" fullWidth label="CTA button URL (optional)" value={templateForm.ctaUrl} onChange={(e) => setTemplateForm((f) => ({ ...f, ctaUrl: e.target.value }))} placeholder="https://..." />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setTemplateDialogOpen(false)} disabled={templateSaving}>Cancel</Button>
          <Button variant="contained" onClick={saveTemplate} disabled={templateSaving} sx={{ borderRadius: 2, bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>
            {templateSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2, maxHeight: "85vh" } }}>
        <DialogTitle>Email Preview</DialogTitle>
        <DialogContent dividers sx={{ p: 0, display: "flex", flexDirection: "column" }}>
          {previewContent.subject && (
            <Box sx={{ px: 2, py: 1.5, bgcolor: bggrayColor, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="body2" color="text.secondary">Subject</Typography>
              <Typography variant="body1" fontWeight={500}>{previewContent.subject}</Typography>
            </Box>
          )}
          <Box sx={{ p: 2, flex: 1, minHeight: 400 }}>
            <iframe
              title="Email preview"
              srcDoc={buildPreviewHtml(previewContent.body, previewContent.ctaText, previewContent.ctaUrl, previewContent.heading)}
              style={{ width: "100%", minHeight: 380, border: "none", borderRadius: 8 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Send />} onClick={openSendFromPreview} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>Send Email</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={composeOpen} onClose={() => !sendLoading && setComposeOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2, maxHeight: "90vh" } }}>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField size="small" fullWidth label="Subject Line" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} placeholder="e.g. Welcome to SsAssociates" />
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Recipients ({composeSelectedIds.size} selected)</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <Button size="small" variant="outlined" onClick={() => setComposeSelectedIds(new Set(filteredList.map((s) => s.id)))} sx={{ textTransform: "none" }}>Select all</Button>
              <Button size="small" variant="outlined" onClick={() => setComposeSelectedIds(new Set())} sx={{ textTransform: "none" }}>Deselect all</Button>
            </Box>
            <Box sx={{ maxHeight: 220, overflowY: "auto", border: 1, borderColor: "divider", borderRadius: 1, p: 0 }}>
              {filteredList.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No subscribers to show. Add subscribers first.</Typography>
              ) : (
                filteredList.map((s) => (
                  <Box key={s.id} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 0.75, borderBottom: 1, borderColor: "divider", "&:last-child": { borderBottom: 0 } }}>
                    <Checkbox
                      size="small"
                      checked={composeSelectedIds.has(s.id)}
                      onChange={() => {
                        setComposeSelectedIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(s.id)) next.delete(s.id);
                          else next.add(s.id);
                          return next;
                        });
                      }}
                      aria-label={`Select ${s.email}`}
                    />
                    <Typography variant="body2" sx={{ wordBreak: "break-all" }}>{s.email}</Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>
          <TextField size="small" fullWidth label="Template (optional)" select SelectProps={{ native: true }} value={composeTemplateId} onChange={(e) => { const id = e.target.value; const t = displayTemplates.find((x) => x.id === id); if (t) { setComposeSubject(t.subject || ""); setComposeHeading(t.heading || ""); setComposeBody(t.body ?? t.description ?? ""); setComposeCtaText(t.ctaText || ""); setComposeCtaUrl(t.ctaUrl || ""); setComposeTemplateId(t.id); setComposeTemplateTitle(t.title || ""); } else { setComposeTemplateId(""); setComposeTemplateTitle(""); } }}>
            <option value="">Blank</option>
            {displayTemplates.map((t) => (<option key={t.id} value={t.id}>{t.title}</option>))}
          </TextField>
          <TextField size="small" fullWidth label="Heading (optional)" value={composeHeading} onChange={(e) => setComposeHeading(e.target.value)} placeholder="e.g. Special Offer" helperText="Shown as main heading at top of email." />
          <TextField size="small" fullWidth label="Body" value={composeBody} onChange={(e) => setComposeBody(e.target.value)} multiline rows={6} placeholder="Hello {{name}}, ..." helperText="{{name}} and {{email}} are replaced per recipient (e.g. Hello John)." />
          <TextField size="small" fullWidth label="CTA button text (optional)" value={composeCtaText} onChange={(e) => setComposeCtaText(e.target.value)} placeholder="e.g. Visit our website" />
          <TextField size="small" fullWidth label="CTA button URL (optional)" value={composeCtaUrl} onChange={(e) => setComposeCtaUrl(e.target.value)} placeholder="https://..." />
          <Box sx={{ py: 1, px: 1.5, bgcolor: "info.light", borderRadius: 1 }}>
            <Typography variant="body2" color="info.dark">
              This email will be sent to {composeSelectedIds.size} recipient{composeSelectedIds.size !== 1 ? "s" : ""}.
            </Typography>
          </Box>
          <Button size="small" variant="outlined" onClick={() => { setPreviewContent({ body: composeBody, ctaText: composeCtaText, ctaUrl: composeCtaUrl, subject: composeSubject, heading: composeHeading }); setComposePreviewOpen(true); }} sx={{ alignSelf: "flex-start" }}>Preview</Button>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setComposeOpen(false)} disabled={sendLoading}>Cancel</Button>
          <Button variant="contained" startIcon={sendLoading ? <CircularProgress size={20} color="inherit" /> : <Send />} onClick={sendBulkEmail} disabled={sendLoading || composeSelectedIds.size === 0} sx={{ borderRadius: 2, bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>
            Send Email
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={composePreviewOpen} onClose={() => setComposePreviewOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2, maxHeight: "85vh" } }}>
        <DialogTitle>Email Preview</DialogTitle>
        <DialogContent dividers>
          <iframe title="Compose preview" srcDoc={buildPreviewHtml(previewContent.body, previewContent.ctaText, previewContent.ctaUrl, previewContent.heading)} style={{ width: "100%", minHeight: 400, border: "none", borderRadius: 8 }} />
        </DialogContent>
        <DialogActions><Button onClick={() => setComposePreviewOpen(false)}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
