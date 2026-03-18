/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { secondaryColor, textGrayDark } from "@/components/utils/Colors";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

const FACE_FRONT_URL =
  "https://img.freepik.com/free-photo/medium-shot-man-looking-document_23-2148751962.jpg?t=st=1773859500~exp=1773863100~hmac=d86ba1a6396695711824fd8c0ffb760358f239f47bab00834015e5ef2abbea4f&w=1480";
const FACE_BACK_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9yT-i-HqFTfeHDt2tAXSIQuRF3_7n3HJNg&s";
const FACE_TOP_URL =
  "https://t3.ftcdn.net/jpg/01/52/05/90/360_F_152059080_aGjnTtv3MhoRzt7OYlsqcQl6g81vC6Gc.jpg";
const FACE_BOTTOM_URL =
  "https://st2.depositphotos.com/1092019/10107/i/450/depositphotos_101075562-stock-photo-who-we-are-question-through.jpg";

export default function WhoWeAre() {
  return (
    <>
 <Stack direction={'row'}  p={5} justifyContent={'center'} alignItems={'center'} gap={5}>
          <Box  maxWidth={700}>
          <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Typography
                component="h2"
                sx={{
                  fontFamily:
                    "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  color: secondaryColor,
                  fontSize: { xs: 30, sm: 34, md: 40 },
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                Who We Are
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: textGrayDark,
                  fontSize: { xs: 14, sm: 15, md: 15 },
                  lineHeight: 1.85,
                  fontWeight: 400,
                  mb: 3,
                }}
              >
                S&amp;S Associates is a premier construction company with over 25
                years of experience in delivering exceptional building solutions.
                Founded in 2001, we have grown from a small local contractor to
                one of the most trusted names in the construction industry.
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: textGrayDark,
                  fontSize: { xs: 14, sm: 15, md: 15 },
                  lineHeight: 1.85,
                  fontWeight: 400,
                  mb: 3,
                }}
              >
                Our commitment to quality, innovation, and customer satisfaction
                has earned us a reputation for excellence. We specialize in
                residential, commercial, and industrial construction, as well as
                renovation and interior design services.
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: textGrayDark,
                  fontSize: { xs: 14, sm: 15, md: 15 },
                  lineHeight: 1.85,
                  fontWeight: 400,
                }}
              >
                With a team of skilled professionals and state-of-the-art
                equipment, we bring your vision to life while maintaining the
                highest standards of safety and sustainability.
              </Typography>
            </motion.div>
          </Box>


     <Box p={5} m={1}>

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
