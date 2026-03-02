"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  InputAdornment,
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

export default function SubscribersPage() {
  const { token } = getAuth();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredSubscribers = subscribers.filter((row) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return true;
    const email = (row.email || "").toLowerCase();
    return email.includes(q);
  });

  const paginatedSubscribers = filteredSubscribers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchSubscribers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.subscribers)) setSubscribers(data.subscribers);
      else setSubscribers([]);
    } catch {
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}>
          Subscribers
        </Typography>
        <Button
          startIcon={<FiRefreshCw size={18} />}
          onClick={() => fetchSubscribers()}
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

      <Box sx={{ mb: 2, maxWidth: 320 }}>
        <TextField
          placeholder="Search by email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={18} style={{ color: "rgba(0,0,0,0.5)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "#fff",
              "& fieldset": { borderColor: bordergrayColor },
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 2 },
            },
          }}
        />
        {searchQuery.trim() && (
          <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.6)", mt: 0.5 }}>
            {filteredSubscribers.length} result{filteredSubscribers.length !== 1 ? "s" : ""}
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
        ) : subscribers.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No subscribers yet.
            </Typography>
          </Box>
        ) : filteredSubscribers.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No results match your search.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ overflowX: "auto", width: "100%" }}>
              <Table size="medium" sx={{ minWidth: 400 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: bggrayColor }}>
                    <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 200 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 120 }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedSubscribers.map((row) => (
                    <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                      <TableCell sx={{ color: "rgba(0,0,0,0.8)" }}>{row.email || "—"}</TableCell>
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
              count={filteredSubscribers.length}
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
