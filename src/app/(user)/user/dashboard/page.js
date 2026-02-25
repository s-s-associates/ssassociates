"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { FiMoreVertical, FiUploadCloud } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineSportsEsports } from "react-icons/md";
import { TbFileText } from "react-icons/tb";

function formatTimeAgo(date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

const createTeamSchema = Yup.object().shape({
  teamName: Yup.string().trim().required("Team name is required"),
  season: Yup.string().trim().required("Season is required"),
  games: Yup.number()
    .typeError("Must be a number")
    .required("Games is required")
    .integer("Must be a whole number")
    .min(0, "Cannot be negative"),
  plays: Yup.number()
    .typeError("Must be a number")
    .required("Plays is required")
    .integer("Must be a whole number")
    .min(0, "Cannot be negative"),
  session: Yup.string()
    .trim()
    .required("Session (year) is required")
    .matches(/^\d{4}$/, "Enter a valid year (e.g. 2024)"),
});

function getDisplayName(authUser, authEmail) {
  if (authUser?.firstName && authUser?.lastName) {
    return `${authUser.firstName} ${authUser.lastName}`.trim();
  }
  return authUser?.email || authEmail || "User";
}

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06)";
const ACTIVITY = [
  { text: "Uploaded Week 5 vs Tigers.csv", time: "2h" },
  { text: "Updated mappings for Varsity Team", time: "1d" },
  { text: "Viewed Formation Usage dashboard", time: "1d" },
];
const STATS_CONFIG = [
  { key: "teams", label: "Teams", image: "/images/teams.png" },
  { key: "games", label: "Games", image: "/images/games.png" },
  { key: "plays", label: "Plays", image: "/images/plays.png" },
];

export default function DashboardPage() {
  const { user: authUser, email: authEmail, token } = getAuth();
  const displayName = getDisplayName(authUser, authEmail);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuTeam, setMenuTeam] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const initialTeamValues = {
    teamName: "",
    season: "",
    games: "",
    plays: "",
    session: "",
  };

  const fetchTeams = useCallback(async () => {
    if (!token) return;
    setTeamsLoading(true);
    try {
      const res = await fetch("/api/teams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.teams)) setTeams(data.teams);
    } catch {
      setTeams([]);
    } finally {
      setTeamsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Close 3-dots menu on scroll so it stays "with" the card (no floating menu)
  useEffect(() => {
    if (!menuAnchor) return;
    const closeOnScroll = () => {
      setMenuAnchor(null);
      setMenuTeam(null);
    };
    window.addEventListener("scroll", closeOnScroll, true);
    return () => window.removeEventListener("scroll", closeOnScroll, true);
  }, [menuAnchor]);

  const handleAddTeam = async (values, { setSubmitting, resetForm }) => {
    if (!token) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teamName: values.teamName.trim(),
          season: values.season.trim(),
          games: Number(values.games),
          plays: Number(values.plays),
          session: String(values.session).trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to create team", confirmButtonColor: primaryColor });
        setSubmitting(false);
        return;
      }
      setOpenTeamModal(false);
      resetForm({ values: initialTeamValues });
      await fetchTeams();
      Swal.fire({
        icon: "success",
        title: "Team created",
        text: "Your team has been created successfully.",
        confirmButtonColor: primaryColor,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong", confirmButtonColor: primaryColor });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to delete team", confirmButtonColor: primaryColor });
        return;
      }
      await fetchTeams();
      Swal.fire({
        icon: "success",
        title: "Team deleted",
        text: "The team has been removed.",
        confirmButtonColor: primaryColor,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong", confirmButtonColor: primaryColor });
    }
  };

  const handleUpdateTeam = async (values, { setSubmitting }) => {
    if (!token || !editingTeam?._id) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/teams/${editingTeam._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teamName: values.teamName.trim(),
          season: values.season.trim(),
          games: Number(values.games),
          plays: Number(values.plays),
          session: String(values.session).trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to update team", confirmButtonColor: primaryColor });
        setSubmitting(false);
        return;
      }
      setOpenEditModal(false);
      setEditingTeam(null);
      await fetchTeams();
      Swal.fire({
        icon: "success",
        title: "Team updated",
        text: "Your team has been updated successfully.",
        confirmButtonColor: primaryColor,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong", confirmButtonColor: primaryColor });
    } finally {
      setSubmitting(false);
    }
  };

  const stats = {
    teams: teams.length,
    games: teams.reduce((s, t) => s + (t.games || 0), 0),
    plays: teams.reduce((s, t) => s + (t.plays || 0), 0),
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Welcome */}
      <Box sx={{ mb: 3 }}>
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
          Welcome back, {displayName}! 👋
        </Typography>
        <Typography sx={{ color: "rgba(21,21,29,0.6)", fontSize: 15 }}>
          Overview of your data and insights.
        </Typography>
      </Box>

      {/* Top row: Your Data card + Recent Activity */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 340px" },
          gap: 2,
          mb: 2,
        }}
      >
        {/* Your Data. Your Edge. */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: CARD_SHADOW,
          }}
        >
          {/* Blurred background image */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/images/data.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(12px)",
              transform: "scale(1.08)",
            }}
          />
          {/* Dark overlay for text readability */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
            }}
          />
          {/* Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 22, mb: 0.5 }}>
            Your Data. Your Edge.
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 14, mb: 2 }}>
            Upload play data, explore insights, and manage teams from one powerful dashboard.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/user/upload-data/new"
              variant="contained"
              startIcon={<FiUploadCloud size={18} />}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                py: 1,
                px: 2,
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { bgcolor: "#7A2FE5", boxShadow: "none" },
              }}
            >
              Upload Game Data
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenTeamModal(true)}
              sx={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                py: 1,
                px: 2,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { borderColor: "rgba(255,255,255,0.7)", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              Add Team
            </Button>
          </Box>
          </Box>
        </Box>

        {/* Recent Activity */}
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            p: 2.5,
            // boxShadow: CARD_SHADOW,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2 }}>
            Recent Activity
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {ACTIVITY.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: `1px solid ${bordergrayColor}`,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: 14, color: "#000" }}>{item.text}</Typography>
                <Typography sx={{ fontSize: 13, color: "rgba(21,21,29,0.5)" }}>{item.time}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Stats row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        {STATS_CONFIG.map(({ key, label, image }) => (
          <Box
            key={key}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              p: 2.5,
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", alignItems: "center", justifyContent: "center", top: 16, right: 16, bgcolor: bggrayColor, borderRadius: "100%", p: 1, display: "flex" }}>
              <Image src={image} alt={label} width={24} height={24} style={{ objectFit: "contain" }} />
            </Box>
            {teamsLoading ? (
              <Skeleton variant="text" width={48} height={40} sx={{ fontSize: 32 }} />
            ) : (
              <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#000" }}>{stats[key]}</Typography>
            )}
            <Typography sx={{ fontSize: 14, color: "rgba(21,21,29,0.6)" }}>{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Your Team */}
      <Box bgcolor={"#fff"} p={2.5} borderRadius={2} >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#000" }}>
            Your Team
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenTeamModal(true)}
            sx={{
              bgcolor: primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              py: 1,
              px: 2,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#7A2FE5", boxShadow: "none" },
            }}
          >
            New Team
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {teamsLoading ? (
            [1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  p: 2,
                  border: "1px solid #D9D9D9",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="circular" width={22} height={22} />
                    <Box>
                      <Skeleton variant="text" width={80} height={22} />
                      <Skeleton variant="text" width={60} height={18} sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ pt: 1.5, borderTop: "1px solid #D9D9D9", display: "flex", justifyContent: "space-around" }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Skeleton variant="text" width={24} height={24} sx={{ mx: "auto" }} />
                    <Typography sx={{ fontSize: 12, color: "rgba(21,21,29,0.5)" }}>Games</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Skeleton variant="text" width={32} height={24} sx={{ mx: "auto" }} />
                    <Typography sx={{ fontSize: 12, color: "rgba(21,21,29,0.5)" }}>Plays</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Skeleton variant="text" width={28} height={24} sx={{ mx: "auto" }} />
                    <Typography sx={{ fontSize: 12, color: "rgba(21,21,29,0.5)" }}>Session</Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            teams.map((team) => (
              <Box
                key={team._id}
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  p: 2,
                  border: "1px solid #D9D9D9",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ bgcolor: bggrayColor, borderRadius: "100%", p: 1 }}>
                      <img
                        src="/images/ball.png"
                        alt=""
                        width={24}
                        height={24}
                        style={{ objectFit: "contain", display: "block" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 15, color: "#000" }}>{team.teamName}</Typography>
                      <Typography sx={{ fontSize: 13, color: "rgba(21,21,29,0.5)" }}>{formatTimeAgo(team.createdAt)}</Typography>
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    sx={{ color: "rgba(0,0,0,0.5)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuAnchor(e.currentTarget);
                      setMenuTeam(team);
                    }}
                  >
                    <FiMoreVertical size={18} />
                  </IconButton>
                </Box>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 1.5, borderTop: "1px solid #D9D9D9" }}>
                  <Grid justifyContent="center" alignItems="center" size={4} sx={{ borderRight: "1px solid #D9D9D9" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000" }}>{team.games}</Typography>
                    <Typography sx={{ fontSize: 12, color: "rgba(21,21,29,0.5)" }}>Games</Typography>
                  </Grid>
                  <Grid justifyContent="center" alignItems="center" size={4} sx={{ borderRight: "1px solid #D9D9D9" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000" }}>{team.plays}</Typography>
                    <Typography sx={{ fontSize: 12, color: "rgba(21,21,29,0.5)" }}>Plays</Typography>
                  </Grid>
                  <Grid justifyContent="center" alignItems="center" size={4}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000" }}>{team.session}</Typography>
                    <Typography sx={{ fontSize: 12, color: "rgba(21,21,29,0.5)" }}>Session</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* Three-dots menu */}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => { setMenuAnchor(null); setMenuTeam(null); }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 120 } }}
      >
        <MenuItem
          onClick={() => {
            if (menuTeam) {
              setEditingTeam(menuTeam);
              setOpenEditModal(true);
            }
            setMenuAnchor(null);
            setMenuTeam(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            const teamId = menuTeam?._id;
            setMenuAnchor(null);
            setMenuTeam(null);
            if (!teamId) return;
            Swal.fire({
              title: "Delete team?",
              text: "This cannot be undone.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: primaryColor,
              cancelButtonColor: "#666",
            }).then((result) => {
              if (result.isConfirmed) handleDeleteTeam(teamId);
            });
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {/* Create New Team Modal */}
      <Dialog
        open={openTeamModal}
        onClose={() => setOpenTeamModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            minWidth: 400,
            zIndex: 1300,
          },
        }}
      >
        <Formik
          initialValues={initialTeamValues}
          validationSchema={createTeamSchema}
          onSubmit={handleAddTeam}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogTitle sx={{ fontWeight: 700, fontSize: 18, color: "#000" }}>
                Create New Team
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 0.5 }}>
                  <Box>
                    <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                      Team Name
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="teamName"
                      placeholder="eg: Gladiator"
                      value={values.teamName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.teamName && !!errors.teamName}
                      helperText={touched.teamName && errors.teamName}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                      Season
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="season"
                      placeholder="eg: Snow"
                      value={values.season}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.season && !!errors.season}
                      helperText={touched.season && errors.season}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                      Games
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="games"
                      type="number"
                      placeholder="eg: 8"
                      value={values.games}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.games && !!errors.games}
                      helperText={touched.games && errors.games}
                      inputProps={{ min: 0, step: 1 }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                      Plays
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="plays"
                      type="number"
                      placeholder="eg: 456"
                      value={values.plays}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.plays && !!errors.plays}
                      helperText={touched.plays && errors.plays}
                      inputProps={{ min: 0, step: 1 }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                      Session (Year)
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="session"
                      placeholder="eg: 2024"
                      value={values.session}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.session && !!errors.session}
                      helperText={touched.session && errors.session}
                      inputProps={{ maxLength: 4 }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "#fafafa",
                          "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  onClick={() => setOpenTeamModal(false)}
                  disabled={isSubmitting}
                  sx={{
                    color: "#000",
                    borderColor: "rgba(0,0,0,0.2)",
                    fontWeight: 600,
                    borderRadius: "10px",
                    textTransform: "none",
                    "&:hover": { borderColor: "rgba(0,0,0,0.4)", bgcolor: "rgba(0,0,0,0.04)" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="medium"
                  disabled={isSubmitting}
                  sx={{
                    bgcolor: primaryColor,
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "10px",
                    minHeight: 40,
                    "&:hover": { bgcolor: "#7A2FE5" },
                  }}
                >
                  {isSubmitting ? <BeatLoader color="#fff" size={10} /> : "Add Team"}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      {/* Edit Team Modal */}
      <Dialog
        open={openEditModal && !!editingTeam}
        onClose={() => { setOpenEditModal(false); setEditingTeam(null); }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            minWidth: 400,
            zIndex: 1300,
          },
        }}
      >
        {editingTeam && (
          <Formik
            key={editingTeam._id}
            initialValues={{
              teamName: editingTeam.teamName || "",
              season: editingTeam.season || "",
              games: String(editingTeam.games ?? ""),
              plays: String(editingTeam.plays ?? ""),
              session: editingTeam.session || "",
            }}
            enableReinitialize
            validationSchema={createTeamSchema}
            onSubmit={handleUpdateTeam}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} noValidate>
                <DialogTitle sx={{ fontWeight: 700, fontSize: 18, color: "#000" }}>
                  Edit Team
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 0.5 }}>
                    <Box>
                      <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                        Team Name
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="teamName"
                        placeholder="eg: Gladiator"
                        value={values.teamName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.teamName && !!errors.teamName}
                        helperText={touched.teamName && errors.teamName}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                        Season
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="season"
                        placeholder="eg: Snow"
                        value={values.season}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.season && !!errors.season}
                        helperText={touched.season && errors.season}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                        Games
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="games"
                        type="number"
                        placeholder="eg: 8"
                        value={values.games}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.games && !!errors.games}
                        helperText={touched.games && errors.games}
                        inputProps={{ min: 0, step: 1 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                        Plays
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="plays"
                        type="number"
                        placeholder="eg: 456"
                        value={values.plays}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.plays && !!errors.plays}
                        helperText={touched.plays && errors.plays}
                        inputProps={{ min: 0, step: 1 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography component="label" sx={{ display: "block", fontWeight: 600, fontSize: 14, color: "#000", mb: 0.5 }}>
                        Session (Year)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="session"
                        placeholder="eg: 2024"
                        value={values.session}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.session && !!errors.session}
                        helperText={touched.session && errors.session}
                        inputProps={{ maxLength: 4 }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#fafafa",
                            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    fullWidth
                    size="medium"
                    onClick={() => { setOpenEditModal(false); setEditingTeam(null); }}
                    disabled={isSubmitting}
                    sx={{
                      color: "#000",
                      borderColor: "rgba(0,0,0,0.2)",
                      fontWeight: 600,
                      borderRadius: "10px",
                      textTransform: "none",
                      "&:hover": { borderColor: "rgba(0,0,0,0.4)", bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="medium"
                    disabled={isSubmitting}
                    sx={{
                      bgcolor: primaryColor,
                      color: "#fff",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "10px",
                      minHeight: 40,
                      "&:hover": { bgcolor: "#7A2FE5" },
                    }}
                  >
                    {isSubmitting ? <BeatLoader color="#fff" size={10} /> : "Update Team"}
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        )}
      </Dialog>
    </Box>
  );
}
