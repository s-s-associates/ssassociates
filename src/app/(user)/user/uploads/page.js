"use client";

import { primaryColor, getStatusColors, bggrayColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const UPLOAD_HISTORY = [
  { fileName: "Week5_vs_Tigers.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 10", status: "Ready" },
  { fileName: "Week4 data.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 4", status: "Ready" },
  { fileName: "BadFile.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 28", status: "Process" },
  { fileName: "Week5_vs_Tigers.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 10", status: "Ready" },
  { fileName: "JV_Week3.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 25", status: "Error" },
  { fileName: "Week4 data.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 4", status: "Ready" },
  { fileName: "BadFile.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 28", status: "Process" },
  { fileName: "JV_Week3.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 25", status: "Error" },
];

export default function UploadDataPage() {
  const [teamFilter, setTeamFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const totalPages = 7;

  return (
    <Box sx={{ p: 3 ,bgcolor: bggrayColor ,minHeight: "100vh"}}> 
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#000",
            m: 0,
          }}
        >
          Upload History
        </Typography>
        <Button
          component={Link}
          href="/user/upload-data/new"
          variant="contained"
          sx={{
            bgcolor: primaryColor,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            py: 1,
            px: 2,
            borderRadius: 2,
            textTransform: "none",
            alignSelf: { xs: "stretch", sm: "center" },
            "&:hover": { bgcolor: "#7A2FE5" },
          }}
        >
          New Upload
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}>
          <Select
            value={teamFilter}
            displayEmpty
            onChange={(e) => setTeamFilter(e.target.value)}
            sx={{
              fontSize: 14,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.15)" },
            }}
          >
            <MenuItem value="">Team</MenuItem>
            <MenuItem value="varsity">Varsity</MenuItem>
            <MenuItem value="jv">JV Team</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}>
          <Select
            value={statusFilter}
            displayEmpty
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              fontSize: 14,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.15)" },
            }}
          >
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="ready">Ready</MenuItem>
            <MenuItem value="process">Process</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}>
          <Select
            value={dateFilter}
            displayEmpty
            onChange={(e) => setDateFilter(e.target.value)}
            sx={{
              fontSize: 14,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.15)" },
            }}
          >
            <MenuItem value="">Date</MenuItem>
            <MenuItem value="feb">Feb 2025</MenuItem>
            <MenuItem value="jan">Jan 2025</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          overflow: "hidden",
          overflowX: { xs: "auto", md: "visible" },
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Table sx={{ minWidth: { xs: 560, sm: "auto" } }}>
          <TableHead>
            <TableRow >
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>File Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Team</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Plays</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Games</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UPLOAD_HISTORY.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.fileName}</TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.team}</TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.plays}</TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.games}</TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.date}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 600,
                      ...getStatusColors(row.status),
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          mt: 3,
        }}
      >
        <IconButton
          size="small"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          sx={{
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 1,
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
          }}
        >
          <FiChevronLeft size={18} />
        </IconButton>
        {[1, 2, 3].map((n) => (
          <IconButton
            key={n}
            size="small"
            onClick={() => setPage(n)}
            sx={{
              minWidth: 36,
              height: 36,
              borderRadius: 1,
              fontSize: 14,
              fontWeight: 600,
              bgcolor: page === n ? "rgba(0,0,0,0.08)" : "transparent",
              color: "#000",
              border: "1px solid rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
            }}
          >
            {n}
          </IconButton>
        ))}
        <Typography component="span" sx={{ px: 0.5, fontSize: 14, color: "#000" }}>
          ...
        </Typography>
        <IconButton
          size="small"
          onClick={() => setPage(totalPages)}
          sx={{
            minWidth: 36,
            height: 36,
            borderRadius: 1,
            fontSize: 14,
            fontWeight: 600,
            bgcolor: page === totalPages ? "rgba(0,0,0,0.08)" : "transparent",
            color: "#000",
            border: "1px solid rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
          }}
        >
          {totalPages}
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          sx={{
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 1,
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
          }}
        >
          <FiChevronRight size={18} />
        </IconButton>
      </Box>
    </Box>
  );
}