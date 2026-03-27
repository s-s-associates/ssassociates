'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { whiteColor, secondaryColor, primaryColor, textGrayDark } from '@/components/utils/Colors';
import { mainHeadingSize, mainSubHeadingSize } from '@/components/utils/Sizes';

const STEP_COLORS = [primaryColor, secondaryColor, '#f97316', '#22c55e'];

const STEP_EASE = [0.22, 1, 0.36, 1];

const steps = [
  {
    id: 1,
    label: 'Consultation & Site Assessment',
    image: "/images/about/our-process/step1.jpg",
    description:
      'We meet with you on site to understand your vision, budget, and timeline. We review the property, local codes, and feasibility so your project starts on solid ground.',
  },
  {
    id: 2,
    label: 'Design & Estimation',
    image: "/images/about/our-process/step2.jpg",
    description:
      'Our team develops layouts, material options, and a clear scope of work. You receive transparent estimates and a phased plan before any build begins.',
  },
  {
    id: 3,
    label: 'Construction & Quality Control',
    image: "/images/about/our-process/step3.jpg",
    description:
      'Skilled crews execute the build with strict safety standards and regular site inspections. We coordinate trades, manage schedules, and keep you updated at every milestone.',
  },
  {
    id: 4,
    label: 'Support & Maintenance',
    image: "/images/about/our-process/step4.jpg",
    description:
      'We walk you through the finished space, address punch-list items, and provide documentation. Optional maintenance and warranty support help protect your investment.',
  },
];

const OurProcess = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(null);
  const tickingRef = useRef(false);
  const stepIndex = Math.min(3, Math.floor(scrollProgress * 4));
  const timelineColor = STEP_COLORS[stepIndex];

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const center = viewportHeight * 0.5;
      const progress = section.height > 0 ? (center - section.top) / section.height : 0;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Run after layout so timeline line/dot is correct on first load (fixes "line doesn't move until reload")
    const runAfterLayout = () => {
      rafRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(updateProgress);
      });
    };
    runAfterLayout();
    window.addEventListener('load', runAfterLayout);
    const timeoutId = setTimeout(runAfterLayout, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', runAfterLayout);
      clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundColor: whiteColor,
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box mx="auto" sx={{ maxWidth: '1200px' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: STEP_EASE }}
          >
            <Typography
              variant="h2"
              sx={{
                color: secondaryColor,
                fontSize: mainHeadingSize.fontSize,
                fontWeight: mainHeadingSize.fontWeight,
                lineHeight: mainHeadingSize.lineHeight,
                mb: 2,
                textTransform: 'lowercase',
                '&::first-letter': { textTransform: 'uppercase' },
              }}
            >
              Our <Box component="span" sx={{ color: primaryColor }}>process</Box>
            </Typography>
            <Typography
              sx={{
                color: textGrayDark,
                fontSize: mainSubHeadingSize.fontSize,
                fontWeight: mainSubHeadingSize.fontWeight,
                lineHeight: mainSubHeadingSize.lineHeight,
                opacity: 0.9,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              From consultation to ongoing support, we guide you through every step—without the stress.
            </Typography>
          </motion.div>
        </Box>

        {/* Journey Steps + Timeline */}
        <Box ref={timelineRef} sx={{ position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#E0E0E0',
              display: { xs: 'none', md: 'block' },
              transform: 'translateX(-50%)',
              zIndex: 1,
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <Box
              component={motion.div}
              animate={{ scaleY: scrollProgress }}
              transition={{ type: 'tween', duration: 0.1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: timelineColor,
                transformOrigin: 'top',
              }}
            />
          </Box>

          {/* Moving Dot */}
          <Box
            component={motion.div}
            animate={{ top: `${scrollProgress * 100}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
            sx={{
              position: 'absolute',
              left: '50%',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: timelineColor,
              border: `4px solid ${whiteColor}`,
              transform: 'translateX(-50%)',
              zIndex: 3,
              display: { xs: 'none', md: 'block' },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          />

          {/* Step 1: Text Left, Visual Right */}
          <Grid container spacing={{ xs: 3, md: 6 }} data-step="0" sx={{ mb: { xs: 6, md: 8 }, position: 'relative', zIndex: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE }}>
                <Typography variant="h3" sx={{ color: secondaryColor, fontSize: { xs: '22px', md: '26px', lg: '28px' }, fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
                  {steps[0].label}
                </Typography>
                <Typography sx={{ color: textGrayDark, fontSize: { xs: '15px', md: '16px' }, lineHeight: 1.8, fontWeight: 400 }}>
                  {steps[0].description}
                </Typography>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE, delay: 0.08 }}>
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, md: 280 }, borderRadius: '16px', overflow: 'hidden', border: `2px solid ${secondaryColor}30` }}>
                  <Image src={steps[0].image} alt={steps[0].label} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Step 2: Visual Left, Text Right */}
          <Grid container spacing={{ xs: 3, md: 6 }} data-step="1" sx={{ mb: { xs: 6, md: 8 }, position: 'relative', zIndex: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE }}>
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, md: 280 }, borderRadius: '16px', overflow: 'hidden', border: `2px solid ${secondaryColor}30` }}>
                  <Image src={steps[1].image} alt={steps[1].label} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE, delay: 0.08 }}>
                <Typography variant="h3" sx={{ color: secondaryColor, fontSize: { xs: '22px', md: '26px', lg: '28px' }, fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
                  {steps[1].label}
                </Typography>
                <Typography sx={{ color: textGrayDark, fontSize: { xs: '15px', md: '16px' }, lineHeight: 1.8, fontWeight: 400 }}>
                  {steps[1].description}
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          {/* Step 3: Text Left, Visual Right */}
          <Grid container spacing={{ xs: 3, md: 6 }} data-step="2" sx={{ mb: { xs: 6, md: 8 }, position: 'relative', zIndex: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE }}>
                <Typography variant="h3" sx={{ color: secondaryColor, fontSize: { xs: '22px', md: '26px', lg: '28px' }, fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
                  {steps[2].label}
                </Typography>
                <Typography sx={{ color: textGrayDark, fontSize: { xs: '15px', md: '16px' }, lineHeight: 1.8, fontWeight: 400 }}>
                  {steps[2].description}
                </Typography>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE, delay: 0.08 }}>
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, md: 280 }, borderRadius: '16px', overflow: 'hidden', border: `2px solid ${secondaryColor}30` }}>
                  <Image src={steps[2].image} alt={steps[2].label} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Step 4: Visual Left, Text Right */}
          <Grid container spacing={{ xs: 3, md: 6 }} data-step="3" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE }}>
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, md: 280 }, borderRadius: '16px', overflow: 'hidden', border: `2px solid ${secondaryColor}30` }}>
                  <Image src={steps[3].image} alt={steps[3].label} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: STEP_EASE, delay: 0.08 }}>
                <Typography variant="h3" sx={{ color: secondaryColor, fontSize: { xs: '22px', md: '26px', lg: '28px' }, fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
                  {steps[3].label}
                </Typography>
                <Typography sx={{ color: textGrayDark, fontSize: { xs: '15px', md: '16px' }, lineHeight: 1.8, fontWeight: 400 }}>
                  {steps[3].description}
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OurProcess;
