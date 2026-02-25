"use client";

import { bggrayColor, primaryColor, statusGreen, statusGreenBg } from "@/components/utils/Colors";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { FiCheck, FiDownload } from "react-icons/fi";

const PLAN_FEATURES = [
  "Unlimited CSV uploads",
  "10 pre-built dashboards",
  "Smart data normalization",
  "Email support",
];

const BILLING_HISTORY = [
  { date: "Feb 10, 2026", amount: "$29.00", status: "Paid" },
  { date: "Jan 10, 2026", amount: "$29.00", status: "Paid" },
  { date: "Dec 10, 2026", amount: "$29.00", status: "Paid" },
];

export default function BillingSubscription() {
  return (
    <Box sx={{ p: 3, mx: "auto",bgcolor: bggrayColor,minHeight: "100vh" }}>
      <Typography
        component="h1"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#000",
          m: 0,
          mb: 3,
        }}
      >
        Billing & Subscription
      </Typography>
<Box bgcolor={"white"} borderRadius={"16px"} p={3}  mb={2}>
      {/* Current Plan */}
      <Typography sx={{ fontWeight: 600, fontSize: 16, color: "#000", mb: 2 }}>
        Current Plan
      </Typography>
      <Box
        sx={{
          background: "linear-gradient(135deg, #8A38F5 0%, #6E31BD 100%)",
          borderRadius: "24px",
          p: 3,
          mb: 4,
          boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3)",
          maxWidth: 350,
          // minHeight: 200,
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: 16, fontWeight: 600, mb: 1 }}>
          Starter
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 2 }}>
          <Typography sx={{ color: "#fff", fontSize: 36, fontWeight: 700 }}>
            $29
          </Typography>
          <Typography sx={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>
            /Month
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 1.5,
            borderRadius:2,
            my: 2,
            background: "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(138, 56, 245, 1))",
          }}
        />
        <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 600, mb: 1.5 }}>
          Includes:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          {PLAN_FEATURES.map((feature, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  // bgcolor: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <FiCheck size={14} style={{ color: "#fff" }} /> */}
                <Image  
                src={"/images/tick.png"}
                alt={"check"}
                width={20}
                height={20}
                style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography sx={{ color: "#fff", fontSize: 14 }}>{feature}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#fff",
            color: "black",
            fontWeight: 600,
            fontSize: 14,
            py: 1.25,
            px: 2,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { color: primaryColor },
          }}
        >
          Start 14 Days Free Trial
        </Button>
        <Typography sx={{ color: "white", textAlign: "center", fontSize: 12, mt: 1.5 }}>
          Cancel anytime. No contracts.
        </Typography>
      </Box>
      </Box>

      {/* Billing History */}
     <Box bgcolor={"white"} p={3} borderRadius={"16px"} >
     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16, color: "#000" }}>
          Billing History
        </Typography>
        <Box
          component="button"
          type="button"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 14,
            color: "black",
            "&:hover": { color: "#000" },
          }}
        >
          Download All
          <FiDownload size={16} />
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "16px",
          // boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#000", fontSize: 14 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {BILLING_HISTORY.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                }}
              >
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.date}</TableCell>
                <TableCell sx={{ fontSize: 14, color: "#000" }}>{row.amount}</TableCell>
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
                      color: statusGreen,
                      bgcolor: statusGreenBg,
                    }}
                  >
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    sx={{
                      color: "rgba(0,0,0,0.6)",
                      "&:hover": { color: "#000", bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    <FiDownload size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
     </Box>
    </Box>
  );
}
