/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import {
  primaryColor,
  primaryLight,
  secondaryColor,
  secondaryBg,
  textGrayDark,
  whiteColor,
  primaryBg,
} from "@/components/utils/Colors";
import { sectionRadius } from "@/components/utils/GlobalVariables";
import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

const FACE_FRONT_URL =
  "/images/about/whoweare-1.jpg";
const FACE_BACK_URL =
  "/images/about/whoweare-2.jpg";
const FACE_TOP_URL =
  "/images/about/whoweare-3.jpeg";
const FACE_BOTTOM_URL =
  "/images/about/whoweare-4.jpg";

const highlights = [
  { label: `${process.env.NEXT_PUBLIC_COMPANY_EXPERIENCE}+`, sub: "Years experience" },
  { label: "2001", sub: "Founded" },
  { label: "360°", sub: "Delivery focus" },
];

export default function WhoWeAre() {
  return (
    <>
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 6, md: 9 },
          background: `linear-gradient(165deg, ${whiteColor} 0%, rgba(244, 246, 250, 1) 42%, ${secondaryBg} 100%)`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-12%",
            right: "-8%",
            width: { xs: 280, md: 420 },
            height: { xs: 280, md: 420 },
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(251, 134, 30, 0.14), transparent 68%)`,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-18%",
            left: "-10%",
            width: { xs: 320, md: 480 },
            height: { xs: 320, md: 480 },
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(16, 24, 40, 0.06), transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="center"
            alignItems="flex-end"
            spacing={{ xs: 5, lg: 6 }}
            sx={{ px: { xs: 0, sm: 1 } }}
          >
            <Box sx={{ width: "100%", maxWidth: { xs: "100%", lg: 640 }, flex: { lg: "1 1 0" } }}>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: primaryColor,
                    mb: 1.5,
                  }}
                >
                  About us
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "var(--font-app)",
                    fontWeight: 800,
                    color: secondaryColor,
                    fontSize: { xs: 32, sm: 38, md: 44 },
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    mb: 2,
                  }}
                >
                  Who We Are
                </Typography>

                <Box
                  sx={{
                    width: 56,
                    height: 4,
                    borderRadius: 2,
                    mb: 2.5,
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})`,
                  }}
                />

                <Stack direction="row" flexWrap="wrap" gap={1.25} sx={{ mb: 3 }}>
                  {highlights.map((h) => (
                    <Box
                      key={h.label}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        border: "1px solid rgba(16, 24, 40, 0.08)",
                        background: primaryBg,
                        boxShadow: "0 8px 28px rgba(8, 12, 20, 0.06)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "var(--font-app)",
                          fontWeight: 800,
                          fontSize: 16,
                          lineHeight: 1,
                          color: primaryColor,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {h.label}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: textGrayDark, opacity: 0.85, mt: 0.35 }}>
                        {h.sub}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Box
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: sectionRadius,
                    bgcolor: "rgba(255, 255, 255, 0.72)",
                    border: "1px solid rgba(16, 24, 40, 0.06)",
                    boxShadow: "0 16px 48px rgba(8, 12, 20, 0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      color: textGrayDark,
                      fontSize: { xs: 15, sm: 16 },
                      lineHeight: 1.88,
                      fontWeight: 400,
                      mb: 2.5,
                    }}
                  >
                    {process.env.NEXT_PUBLIC_COMPANY_NAME} is a premier construction company with over {process.env.NEXT_PUBLIC_COMPANY_EXPERIENCE} years of experience in delivering
                    exceptional building solutions. Founded in 2001, we have grown from a small local contractor to one
                    of the most trusted names in the construction industry.
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      color: textGrayDark,
                      fontSize: { xs: 15, sm: 16 },
                      lineHeight: 1.88,
                      fontWeight: 400,
                      mb: 2.5,
                    }}
                  >
                    Our commitment to quality, innovation, and customer satisfaction has earned us a reputation for
                    excellence. We specialize in residential, commercial, and industrial construction, as well as
                    renovation and interior design services.
                  </Typography>
                </Box>
              </motion.div>
            </Box>

            <Box p={5} pb={2} m={1} display={{ xs: "none", lg: "block" }}>
      <div id="viewStage">
        <div id="cube1" className="cube">
          <div className="facefront fb" />
          <div className="faceback fb" />
          <div className="faceleft lr" />
          <div className="faceright lr" />
          <div className="facetop tb" />
          <div className="facebottom tb" />
        </div>

        <div id="cube2" className="cube">
          <div className="facefront fb" />
          <div className="faceback fb" />
          <div className="faceleft lr" />
          <div className="faceright lr" />
          <div className="facetop tb" />
          <div className="facebottom tb" />
        </div>

        <div id="cube3" className="cube">
          <div className="facefront fb" />
          <div className="faceback fb" />
          <div className="faceleft lr" />
          <div className="faceright lr" />
          <div className="facetop tb" />
          <div className="facebottom tb" />
        </div>
      </div>
      
     </Box>
          </Stack>
        </Container>
      </Box>

      <style jsx global>{`
        /*** View Stage ***/
        #viewStage {
          width: 450px;
          height: 300px;
        //   margin: 200px auto;
          -webkit-perspective: 450px;
          -webkit-perspective-origin: 50% 50%;
          transform: scale(0.75);
          transform-origin: center;
        }

        /*** Browsers fix ***/
        #overlay {
          width: 100%;
          height: 100%;
          background-color: #f4f4f4;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
        }
        #overlay span {
          display: block;
          width: 500px;
          margin: 9em auto;
          font-size: 24px;
          line-height: 175%;
          text-align: center;
        }
        .support {
          display: none;
        }
        .unsupport {
          display: block;
        }

        /*** Mozilla fix ***/
        @-moz-document url-prefix() {
          #overlay {
            display: none;
          }
          #viewStage {
            overflow: hidden;
          }
          .support {
            display: none;
          }
          .unsupport {
            display: block;
          }
        }

        /*** Webkit browser ***/
        @media screen and (-webkit-transform-3d) {
          #overlay {
            display: none;
          }
          .support {
            display: block;
          }
          .unsupport {
            display: none;
          }
        }

        /*** Keyframes ***/
        @-webkit-keyframes rotation {
          from,
          to {
          }
          10%,
          25% {
            -webkit-transform: rotateX(-90deg);
          }
          35%,
          50% {
            -webkit-transform: rotateX(-180deg);
          }
          60%,
          75% {
            -webkit-transform: rotateX(-270deg);
          }
          85%,
          100% {
            -webkit-transform: rotateX(-360deg);
          }
        }
        @-moz-keyframes rotation {
          from,
          to {
          }
          10%,
          25% {
            -moz-transform: translateY(0px);
          }
          35%,
          50% {
            -moz-transform: translateY(-300px);
          }
          60%,
          75% {
            -moz-transform: translateY(-600px);
          }
          85%,
          100% {
            -moz-transform: translateY(-900px);
          }
        }

        /*** Cube ***/
        .cube {
          position: relative;
          float: left;
          width: 150px;
          height: 300px;

          /* Transform */
          -webkit-transform-style: preserve-3d;
          -webkit-transform-origin: 50% 50%;

          /* Animation */
          -webkit-animation-name: rotation;
          -webkit-animation-timing-function: ease;
          -webkit-animation-timing-function: cubic-bezier(0.6, -1, 0.4, 1.5);
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-duration: 15s;

          -moz-animation-name: rotation;
          -moz-animation-timing-function: ease;
          -moz-animation-iteration-count: infinite;
          -moz-animation-duration: 15s;
        }

        /* Cube delay and z-index fix */
        #cube1 {
        margin-right: -0.5px;
          z-index: 1;
          -webkit-animation-delay: 1s;
          -moz-animation-delay: 1s;
        }
        #cube2 {
          z-index: 2;
          -webkit-animation-delay: 1.2s;
          -moz-animation-delay: 1.2s;
        }
        #cube3 {
          z-index: 1;
          -webkit-animation-delay: 1.4s;
          -moz-animation-delay: 1.4s;
        }

        /*** Cube's face Style ***/
        .cube div {
          background-color: #000;
          background-size: 450px 300px;
          position: absolute;

          -webkit-transform-origin: 50% 50%;
          -moz-transform-origin: 50% 50%;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
        }
        .cube div.fb {
          width: 150px;
          height: 300px;
        }
        .cube div.tb {
          width: 150px;
          height: 300px;
        }
        .cube div.lr {
          width: 300px;
          height: 300px;
        }

        /* Face image and position */
        .facefront {
          background-image: url("${FACE_FRONT_URL}");
          -webkit-transform: translateZ(150px);
          -moz-transform: translateY(0px);
        }
        .faceback {
          background-image: url("${FACE_BACK_URL}");
          -webkit-transform: rotateY(180deg) rotateZ(180deg) translateZ(150px);
          -moz-transform: translateY(300px);
        }
        .facetop {
          background-image: url("${FACE_TOP_URL}");
          -webkit-transform: rotateX(90deg) translateZ(150px);
          -moz-transform: translateY(600px);
        }
        .facebottom {
          background-image: url("${FACE_BOTTOM_URL}");
          -webkit-transform: rotateX(-90deg) translateZ(150px);
          -moz-transform: translateY(900px);
        }
        .faceleft {
          background-color: #000;
          -webkit-transform: rotateY(90deg) translateZ(0px);
          -moz-transform: scaleX(0);
        }
        .faceright {
          background-color: #000;
          -webkit-transform: rotateY(-90deg) translateZ(150px);
          -moz-transform: scaleX(0);
        }

        #cube1 div {
          background-position: 0 0;
        }
        #cube2 div {
          background-position: -150px 0;
        }
        #cube3 div {
          background-position: -300px 0;
        }
      `}</style>
    </>
  );
}
