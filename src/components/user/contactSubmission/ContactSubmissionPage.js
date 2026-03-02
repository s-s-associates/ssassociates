"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import React, { useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";

export default function ContactSubmissionPage() {
  const { token } = getAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredSubmissions = submissions.filter((row) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      const name = (row.fullName || "").toLowerCase();
      const email = (row.email || "").toLowerCase();
      const phone = (row.phone || "").toLowerCase();
      const message = (row.message || "").toLowerCase();
      const company = (row.companyName || "").toLowerCase();
      const address = (row.address || "").toLowerCase();
      if (!name.includes(q) && !email.includes(q) && !phone.includes(q) && !message.includes(q) && !company.includes(q) && !address.includes(q)) return false;
    }
    if (dateFilter !== "all" && row.createdAt) {
      const d = new Date(row.createdAt);
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(todayStart);
      todayEnd.setHours(23, 59, 59, 999);
      if (dateFilter === "today") {
        if (d < todayStart || d > todayEnd) return false;
      } else if (dateFilter === "7") {
        const weekAgo = new Date(todayStart);
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (d < weekAgo || d > now) return false;
      } else if (dateFilter === "30") {
        const monthAgo = new Date(todayStart);
        monthAgo.setDate(monthAgo.getDate() - 30);
        if (d < monthAgo || d > now) return false;
      }
    }
    return true;
  });

  const paginatedSubmissions = filteredSubmissions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchSubmissions = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact-submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.submissions)) setSubmissions(data.submissions);
      else setSubmissions([]);
    } catch {
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}>
          Contact submissions
        </Typography>
        <Button
          startIcon={<FiRefreshCw size={18} />}
          onClick={() => fetchSubmissions()}
          disabled={loading}
          variant="outlined"
          size="small"
          sx={{
            borderColor: bordergrayColor,
            color: "#000",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: primaryColor,
              color: primaryColor,
              bgcolor: "rgba(138,56,245,0.06)",
            },
          }}
        >
          Refresh
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 1.5,
          mb: 2,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <TextField
          placeholder="Search by name, email, phone..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={18} style={{ color: "rgba(0,0,0,0.5)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: { xs: "1 1 0", sm: "none" },
            minWidth: 0,
            "& .MuiOutlinedInput-input": { minWidth: 0 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "#fff",
              "& fieldset": { borderColor: bordergrayColor },
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 2 },
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: { xs: 120, sm: 160 }, flexShrink: 0 }}>
          <Select
            value={dateFilter}
            displayEmpty
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(0);
            }}
            sx={{
              borderRadius: 2,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: bordergrayColor },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
            }}
          >
            <MenuItem value="all">All time</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
          </Select>
        </FormControl>
        {(searchQuery.trim() || dateFilter !== "all") && (
          <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.6)", flexShrink: 0, whiteSpace: "nowrap" }}>
            {filteredSubmissions.length} result{filteredSubmissions.length !== 1 ? "s" : ""}
          </Typography>
        )}
      </Box>

      <Box
        bgcolor="white"
        borderRadius={2}
        sx={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          border: `1px solid ${bordergrayColor}`,
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={48} sx={{ mb: 1, borderRadius: 1 }} />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 1, borderRadius: 1 }} />
            ))}
          </Box>
        ) : submissions.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No contact submissions yet.
            </Typography>
          </Box>
        ) : filteredSubmissions.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No results match your search or filter.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ overflowX: "auto", width: "100%" }}>
              <Table size="medium" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: bggrayColor }}>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 120 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 160 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 100 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 140 }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 100 }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSubmissions.map((row) => (
                  <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                        {row.fullName || "—"}
                      </Typography>
                      {row.companyName ? (
                        <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>{row.companyName}</Typography>
                      ) : null}
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.8)" }}>{row.email || "—"}</TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.8)" }}>{row.phone || "—"}</TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.8)", maxWidth: 280 }}>
                      {row.message ? (row.message.length > 60 ? row.message.slice(0, 60) + "…" : row.message) : "—"}
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.6)", fontSize: 13 }}>
                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Box>
            <TablePagination
              component="div"
              count={filteredSubmissions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: `1px solid ${bordergrayColor}`,
                bgcolor: bggrayColor,
                "& .MuiTablePagination-selectLabel": { fontSize: 14, color: "rgba(0,0,0,0.7)" },
                "& .MuiTablePagination-displayedRows": { fontSize: 14, color: "#000", fontWeight: 500 },
                "& .MuiTablePagination-select": { fontSize: 14 },
                "& .MuiIconButton-root": {
                  color: "rgba(0,0,0,0.7)",
                  "&:hover": { bgcolor: "rgba(138,56,245,0.08)", color: primaryColor },
                  "&.Mui-disabled": { color: "rgba(0,0,0,0.26)" },
                },
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
