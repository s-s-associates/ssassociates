// "use client";

// import { primaryColor, getStatusColors } from "@/components/utils/Colors";
// import {
//   Box,
//   Button,
//   FormControl,
//   IconButton,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const UPLOAD_HISTORY = [
//   { fileName: "Week5_vs_Tigers.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 10", status: "Ready" },
//   { fileName: "Week4 data.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 4", status: "Ready" },
//   { fileName: "BadFile.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 28", status: "Process" },
//   { fileName: "Week5_vs_Tigers.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 10", status: "Ready" },
//   { fileName: "JV_Week3.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 25", status: "Error" },
//   { fileName: "Week4 data.csv", team: "Varsity", plays: 435, games: 8, date: "Feb 4", status: "Ready" },
//   { fileName: "BadFile.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 28", status: "Process" },
//   { fileName: "JV_Week3.csv", team: "Varsity", plays: 435, games: 8, date: "Jan 25", status: "Error" },
// ];

// export default function UploadDataPage() {
//   const [teamFilter, setTeamFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const totalPages = 7;

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "stretch", sm: "center" },
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <Typography
//           component="h1"
//           sx={{
//             fontSize: 24,
//             fontWeight: 700,
//             color: "#000",
//             m: 0,
//           }}
//         >
//           Upload History
//         </Typography>
//         <Button
//           component={Link}
//           href="/user/upload-data/new"
//           variant="contained"
//           sx={{
//             bgcolor: primaryColor,
//             color: "#fff",
//             fontWeight: 600,
//             fontSize: 14,
//             py: 1,
//             px: 2,
//             borderRadius: 2,
//             textTransform: "none",
//             alignSelf: { xs: "stretch", sm: "center" },
//             "&:hover": { bgcolor: "#7A2FE5" },
//           }}
//         >
//           New Upload
//         </Button>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 1.5,
//           justifyContent: "flex-end",
//           mb: 2,
//         }}
//       >
//         <FormControl size="small" sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}>
//           <Select
//             value={teamFilter}
//             displayEmpty
//             onChange={(e) => setTeamFilter(e.target.value)}
//             sx={{
//               fontSize: 14,
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.15)" },
//             }}
//           >
//             <MenuItem value="">Team</MenuItem>
//             <MenuItem value="varsity">Varsity</MenuItem>
//             <MenuItem value="jv">JV Team</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl size="small" sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}>
//           <Select
//             value={statusFilter}
//             displayEmpty
//             onChange={(e) => setStatusFilter(e.target.value)}
//             sx={{
//               fontSize: 14,
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.15)" },
//             }}
//           >
//             <MenuItem value="">Status</MenuItem>
//             <MenuItem value="ready">Ready</MenuItem>
//             <MenuItem value="process">Process</MenuItem>
//             <MenuItem value="error">Error</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl size="small" sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}>
//           <Select
//             value={dateFilter}
//             displayEmpty
//             onChange={(e) => setDateFilter(e.target.value)}
//             sx={{
//               fontSize: 14,
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.15)" },
//             }}
//           >
//             <MenuItem value="">Date</MenuItem>
//             <MenuItem value="feb">Feb 2025</MenuItem>
//             <MenuItem value="jan">Jan 2025</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Box
//         sx={{
//           bgcolor: "#fff",
//           borderRadius: 2,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
//           overflow: "hidden",
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "rgba(0,0,0,0.04)" }}>
//               <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>File Name</TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Team</TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Plays</TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Games</TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Date</TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {UPLOAD_HISTORY.map((row, i) => (
//               <TableRow
//                 key={i}
//                 sx={{
//                   "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
//                   borderBottom: "1px solid rgba(0,0,0,0.06)",
//                 }}
//               >
//                 <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.fileName}</TableCell>
//                 <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.team}</TableCell>
//                 <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.plays}</TableCell>
//                 <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.games}</TableCell>
//                 <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.date}</TableCell>
//                 <TableCell>
//                   <Box
//                     component="span"
//                     sx={{
//                       display: "inline-block",
//                       px: 1.5,
//                       py: 0.5,
//                       borderRadius: 2,
//                       fontSize: 13,
//                       fontWeight: 600,
//                       ...getStatusColors(row.status),
//                     }}
//                   >
//                     {row.status}
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.5,
//           mt: 3,
//         }}
//       >
//         <IconButton
//           size="small"
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           sx={{
//             border: "1px solid rgba(0,0,0,0.15)",
//             borderRadius: 1,
//             "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
//           }}
//         >
//           <FiChevronLeft size={18} />
//         </IconButton>
//         {[1, 2, 3].map((n) => (
//           <IconButton
//             key={n}
//             size="small"
//             onClick={() => setPage(n)}
//             sx={{
//               minWidth: 36,
//               height: 36,
//               borderRadius: 1,
//               fontSize: 14,
//               fontWeight: 600,
//               bgcolor: page === n ? "rgba(0,0,0,0.08)" : "transparent",
//               color: "#000",
//               border: "1px solid rgba(0,0,0,0.1)",
//               "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
//             }}
//           >
//             {n}
//           </IconButton>
//         ))}
//         <Typography component="span" sx={{ px: 0.5, fontSize: 14, color: "#000" }}>
//           ...
//         </Typography>
//         <IconButton
//           size="small"
//           onClick={() => setPage(totalPages)}
//           sx={{
//             minWidth: 36,
//             height: 36,
//             borderRadius: 1,
//             fontSize: 14,
//             fontWeight: 600,
//             bgcolor: page === totalPages ? "rgba(0,0,0,0.08)" : "transparent",
//             color: "#000",
//             border: "1px solid rgba(0,0,0,0.1)",
//             "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
//           }}
//         >
//           {totalPages}
//         </IconButton>
//         <IconButton
//           size="small"
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           sx={{
//             border: "1px solid rgba(0,0,0,0.15)",
//             borderRadius: 1,
//             "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
//           }}
//         >
//           <FiChevronRight size={18} />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }
"use client";

import { bggrayColor, primaryColor } from "@/components/utils/Colors";
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
import Swal from "sweetalert2";

// Document with checkmark icon (outline, folded corner) – dark grey
function DocumentCheckIcon({ size = 64, color = "#333333" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
      <path d="M12 8h28l12 12v32a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M40 8v12h12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 34l6 6 14-14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  <>
  <Box sx={{ bgcolor: bggrayColor ,minHeight: "100vh"}}>
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

      <Typography
        component="h1"
        sx={{
          fontSize: 28,
          fontWeight: 600,
          color: "#515151",
          m: 0,
          mb: 1,
          // textAlign: "center",
        }}
      >
     Select Team
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        {/* <InputLabel id="upload-select-team-label" sx={{ color: "#000" }}>
          Select Team
        </InputLabel> */}

        <Select
          labelId="upload-select-team-label"
          value={team}
          // label="Select Team"
          placeholder="Select Team"
          onChange={(e) => setTeam(e.target.value)}
          sx={{
            borderRadius: 2,
            bgcolor: "#ffffff",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "none",border: "none" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "none",border: "none" },
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
          border: "2px dashed #B6B6B6",
          borderColor: dragActive ? "#333333" : "rgba(0,0,0,0.2)",
          borderRadius: "20px",
          bgcolor: "#ffffff",
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
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <DocumentCheckIcon size={64} color="#333333" />
        </Box>
        <Typography sx={{ textAlign: "center", mb: 0.5 }}>
          <Box component="span" sx={{ fontWeight: 700, fontSize: 22, color: "#515151" }}>
            Drag & Drop
          </Box>
          <Box component="span" sx={{ fontWeight: 400, fontSize: 18, color: "#999999" }}>
            {" "}your CSV file here
          </Box>
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 2 }}>
          <Box component="span" sx={{ fontWeight: 400, fontSize: 18, color: "#999999" }}>
            or click to{" "}
          </Box>
          <Box component="span" sx={{ fontWeight: 700, fontSize: 22, color: "#515151", textDecoration: "underline" }}>
            Upload
          </Box>
        </Typography>
        <Typography sx={{ textAlign: "center", fontSize: 16, color: "#333333", fontWeight: 400, mb: 2 }}>
          Max File Size: {MAX_FILE_SIZE_MB}MB • Supported Format: CSV
        </Typography>
        <Typography sx={{ textAlign: "center", fontSize: 16, color: "#333333", fontWeight: 400 }}>
          Sample CSV Format:{" "}
          <Box
            component="a"
            href="#"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            sx={{
              color: "#515151",
              fontWeight: 700,
              textDecoration: "underline",
              "&:hover": { color: "#333333" },
            }}
          >
            Download
          </Box>
        </Typography>
        {file && (
          <Typography sx={{ fontSize: 13, color: "#333333", fontWeight: 600, mt: 1 }}>
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
    </Box>
  </Box>
  </>
  );
}
