"use client";

import { bggrayColor, primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FiAlertTriangle, FiCheck, FiChevronDown, FiX } from "react-icons/fi";

const TABS = ["Personnel", "Formation", "Concept", "Play Family"];

const MAPPINGS_ROWS = [
  { sourceValue: "11P", count: "142", canonicalValue: "11", conf: 95 },
  { sourceValue: "12 Personnel", count: "87", canonicalValue: "12", conf: 98 },
  { sourceValue: "ACE", count: "45", canonicalValue: "11", conf: 72 },
  { sourceValue: "21P", count: "34", canonicalValue: "12", conf: 99 },
  { sourceValue: "Unknown_X", count: "12", canonicalValue: "", conf: 0 },
];

const CANONICAL_OPTIONS = ["11", "12", "Select"];

function ConfIcon({ conf }) {
  if (conf >= 85) return <FiCheck size={18} style={{ color: "#22c55e", verticalAlign: "middle", marginRight: 4 }} />;
  if (conf >= 60) return <FiAlertTriangle size={18} style={{ color: "#f59e0b", verticalAlign: "middle", marginRight: 4 }} />;
  return <FiX size={18} style={{ color: "#dc2626", verticalAlign: "middle", marginRight: 4 }} />;
}

export default function ReviewDataMappings() {
  const [activeTab, setActiveTab] = useState(0);
  const [rows, setRows] = useState(MAPPINGS_ROWS.map((r) => ({ ...r, canonicalValue: r.canonicalValue })));

  const handleCanonicalChange = (index, value) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], canonicalValue: value };
      return next;
    });
  };

  return (
    <Box sx={{ p: 3,mx: "auto",bgcolor: bggrayColor,minHeight: "100vh" }}>
      <Typography
        component="h1"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#000",
          m: 0,
          mb: 0.5,
        }}
      >
        Review Data Mappings
      </Typography>
      <Typography sx={{ fontSize: 15, color: "rgba(21,21,29,0.7)", mb: 3 }}>
        Week5_vs_Tigers.csv
      </Typography>

      {/* Tabs - scroll on small screens so all tabs visible */}
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          mb: 2,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Box sx={{ display: "flex", minWidth: "max-content" }}>
          {TABS.map((label, i) => (
            <Box
              key={label}
              component="button"
              type="button"
              onClick={() => setActiveTab(i)}
              sx={{
                border: "none",
                fontFamily: "inherit",
                fontSize: 15,
                fontWeight: 600,
                py: 1.25,
                px: 2,
                cursor: "pointer",
                color: activeTab === i ? "#fff" : "#000",
                bgcolor: activeTab === i ? primaryColor : "transparent",
                borderRadius: i === 0 ? "8px 0 0 0" : i === TABS.length - 1 ? "0 8px 0 0" : 0,
                flexShrink: 0,
                "&:hover": {
                  bgcolor: activeTab === i ? primaryColor : "rgba(0,0,0,0.04)",
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Table - horizontal scroll on small screens */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          overflow: "hidden",
          overflowX: { xs: "auto", md: "visible" },
          WebkitOverflowScrolling: "touch",
          mb: 3,
        }}
      >
        <Table sx={{ minWidth: { xs: 520, md: "auto" } }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Source Value</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Count</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Canonical Value</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Conf</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  bgcolor: "rgba(0,0,0,0.02)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }}
              >
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.sourceValue}</TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.count}</TableCell>
                <TableCell sx={{ fontSize: 14 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={row.canonicalValue || "select"}
                      displayEmpty
                      onChange={(e) => handleCanonicalChange(i, e.target.value === "select" ? "" : e.target.value)}
                      sx={{
                        fontSize: 14,
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.2)" },
                      }}
                    >
                      <MenuItem value="select">Select</MenuItem>
                      {CANONICAL_OPTIONS.filter((o) => o !== "Select").map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>
                  <ConfIcon conf={row.conf} />
                  {row.conf}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Footer: Legend + Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          pt: 2,
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000", mb: 1 }}>
            Confidence Legend
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 13, color: "#000" }}>
              <FiCheck size={16} style={{ color: "#22c55e" }} />
              High (&gt;85%)
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 13, color: "#000" }}>
              <FiAlertTriangle size={16} style={{ color: "#f59e0b" }} />
              Medium (60-85%)
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: 13, color: "#000" }}>
              <FiX size={16} style={{ color: "#dc2626" }} />
              Low (&lt;60%)
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            endIcon={<FiChevronDown size={16} />}
            sx={{
              borderColor: "rgba(0,0,0,0.2)",
              color: "#000",
              fontWeight: 600,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { borderColor: "rgba(0,0,0,0.4)", bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            Bulk Actions
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              py: 1,
              px: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "#7A2FE5" },
            }}
          >
            Save All Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
