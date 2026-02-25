"use client";

import { primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { TbFileUpload } from "react-icons/tb";
import Swal from "sweetalert2";

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06)";

const TEAMS = [
  { id: "varsity", name: "Varsity Team" },
  { id: "jv", name: "JV Team" },
];

const MAX_FILE_SIZE_MB = 50;

function formatMb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

export default function NewUploadPage() {
  const [team, setTeam] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedMb, setUploadedMb] = useState(0);
  const [totalMb, setTotalMb] = useState(0);
  const intervalRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped && dropped.name.toLowerCase().endsWith(".csv")) {
      setFile(dropped);
    }
  };

  const handleChange = (e) => {
    const chosen = e.target?.files?.[0];
    if (chosen && chosen.name.toLowerCase().endsWith(".csv")) {
      setFile(chosen);
    }
  };

  const startUpload = () => {
    if (!file) return;
    const total = file.size;
    setTotalMb(Number(formatMb(total)));
    setUploadedMb(0);
    setProgress(0);
    setUploadOpen(true);

    const duration = 2500;
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      setUploadedMb(Number((Number(formatMb(total)) * (p / 100)).toFixed(1)));
      if (p >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setUploadOpen(false);
        setFile(null);
        Swal.fire({
          icon: "success",
          title: "Upload successful",
          text: "Your file has been uploaded successfully.",
          confirmButtonColor: primaryColor,
        });
      }
    }, 80);
  };

  const handleCloseUpload = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setUploadOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 640, mx: "auto" }}>
      <Typography
        component="h1"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#000",
          m: 0,
          mb: 3,
          textAlign: "center",
        }}
      >
        Upload Play Data
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="upload-select-team-label" sx={{ color: "#000" }}>
          Select Team
        </InputLabel>
        <Select
          labelId="upload-select-team-label"
          value={team}
          label="Select Team"
          onChange={(e) => setTeam(e.target.value)}
          sx={{
            borderRadius: 2,
            bgcolor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.2)" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.35)" },
          }}
        >
          {TEAMS.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        component="label"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          display: "block",
          border: "2px dashed",
          borderColor: dragActive ? primaryColor : "rgba(0,0,0,0.2)",
          borderRadius: 2,
          bgcolor: dragActive ? "rgba(138, 56, 245, 0.04)" : "#fafafa",
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.2s, background-color 0.2s",
          boxShadow: CARD_SHADOW,
        }}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2, color: "rgba(0,0,0,0.4)" }}>
          <TbFileUpload size={48} />
        </Box>
        <Typography sx={{ fontSize: 15, color: "#000", mb: 1 }}>
          Drag & Drop your CSV file here or click to{" "}
          <Typography component="span" sx={{ color: primaryColor, fontWeight: 600 }}>
            Upload
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(21,21,29,0.6)" }}>
          Max File Size: {MAX_FILE_SIZE_MB}MB
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(21,21,29,0.6)" }}>
          Supported Format: CSV
        </Typography>
        {file && (
          <Typography sx={{ fontSize: 13, color: primaryColor, fontWeight: 600, mt: 1 }}>
            Selected: {file.name}
          </Typography>
        )}
      </Box>

      {file && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={startUpload}
            sx={{
              bgcolor: primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              py: 1.25,
              px: 3,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "#7A2FE5" },
            }}
          >
            Upload
          </Button>
        </Box>
      )}

      <Dialog
        open={uploadOpen}
        onClose={handleCloseUpload}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 400,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, color: "#000", pb: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Uploading
            <IconButton size="small" onClick={handleCloseUpload} sx={{ color: "#000" }}>
              ×
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {file && (
            <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.7)", mb: 1 }}>{file.name}</Typography>
          )}
          <Box sx={{ position: "relative", mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 28,
                borderRadius: 2,
                bgcolor: "rgba(0,0,0,0.08)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: primaryColor,
                  borderRadius: 2,
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.5)",
              }}
            >
              {Math.round(progress)}%
            </Box>
          </Box>
          <Typography sx={{ textAlign: "center", fontSize: 14, color: "#000" }}>
            {uploadedMb} MB of {totalMb} MB uploaded
          </Typography>
        </DialogContent>
      </Dialog>

      <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "#000" }}>
        Sample CSV Format:{" "}
        <Typography
          component="a"
          href="#"
          sx={{
            color: primaryColor,
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Download
        </Typography>
      </Typography>
    </Box>
  );
}
