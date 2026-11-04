import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Instagram } from '@mui/icons-material';
import MailingListModal from '../components/MailingListModal';
import LeadInviteModal from '../components/home/LeadInviteModal';
import Footer from '../components/Footer';
import { programs } from '../data/programs';
import { siteSeason } from '../data/season';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors } from '../theme/colors';
import { pinkPaper } from '../theme/textures';
import { LabelTape, MaskingTape, RansomWord, TintedPhoto } from '../components/brand';

const kenBurns = keyframes`
  from { transform: scale(1.04); }
  to { transform: scale(1.12); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: colors.black,
  borderBottom: `2px solid ${colors.ink}`,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(20,16,18,0.38)',
    zIndex: 1,
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'rgba(20,16,18,0.42)',
    },
  },
}));

const MasonryGrid = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'none',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: 4,
  padding: 0,
  zIndex: 0,
  [theme.breakpoints.up('md')]: {
    display: 'grid',
  },
}));

/** Mobile: rotating top/bottom pair. */
const MobileStage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const images = [
  { src: '/grid/cultural-dance.webp', alt: 'Cultural dance', span: 2, position: 'center 22%' },
  { src: '/grid/picnic.webp', alt: 'SEA Picnic', span: 1, position: 'center 40%' },
  { src: '/grid/laony-dance.webp', alt: 'LaoNY cultural dance', span: 1, position: 'center 45%' },
  { src: '/grid/lny.webp', alt: 'Lunar New Year', span: 2, position: 'center 30%' },
  { src: '/grid/abby_sydney.webp', alt: 'SEA Grad celebration', span: 2, position: 'center 28%' },
  { src: '/grid/bursa-dance.webp', alt: 'BURSA cultural dance at Night Market', span: 1, position: 'center 42%' },
];

const mobilePairs = [
  [images[0], images[1]],
  [images[2], images[3]],
  [images[4], images[5]],
] as const;

const onDarkOutline = {
  borderColor: colors.textOnBlack,
  color: colors.textOnBlack,
  '&:hover': {
    borderColor: colors.textOnBlack,
    bgcolor: 'rgba(247,240,230,0.1)',
  },
};

const sections = [
  {
    title: 'How it started',
    paragraphs: [
      'In 2000, Professor Khatharya Um organized a Southeast Asian conference at Berkeley. Lao, Hmong, Cambodian, and Vietnamese students ran the youth program, kept meeting after it ended, and turned into a coalition focused on getting SEA students into Berkeley and helping them stay.',
    ],
    aboutLink: true,
    instagramPost: 'https://www.instagram.com/p/8mkvEjw-66',
    align: 'left' as const,
  },
  {
    title: 'SEAGrad',
    paragraphs: [
      'SEAGrad is our graduation for Southeast Asian seniors and the families who got them here. There are speeches, performances, and cultural sashes. It’s a lot smaller than commencement, and the people calling your name usually know you.',
      'For a lot of first-gen students, graduating is something the whole family did. Alumni come back for it and current members run the night.',
    ],
    instagramPost: 'https://www.instagram.com/p/DZBGmcWElwT',
    align: 'right' as const,
  },
  {
    title: 'SEAMentorship',
    paragraphs: [
      'SEAM pairs Berkeley students with Southeast Asian high schoolers. Mentors help with essays, deadlines, and financial aid forms, and answer the questions that are hard to ask when nobody in your family has applied to college.',
      'Mentees come from all over California. The program ends with a few days at Berkeley, and SEAM covers food and housing.',
    ],
    instagramPost: 'https://www.instagram.com/p/DKpgpl5pGhL',
    align: 'left' as const,
  },
];

const Home = () => {
  usePageTitle();
  const [mailingListOpen, setMailingListOpen] = useState(false);
  const [leadInviteOpen, setLeadInviteOpen] = useState(false);
  const [pairIndex, setPairIndex] = useState(0);
  const { mode, nextEvent } = siteSeason;
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#programs') {
      document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    if (mode !== 'recruitment') return;
    try {
      if (localStorage.getItem('lead_invite_dismissed_fall_2026') === '1') return;
    } catch {
      // Continue showing the modal if localStorage is unavailable.
    }
    const id = window.setTimeout(() => setLeadInviteOpen(true), 1200);
    return () => window.clearTimeout(id);
  }, [mode]);

  const handleLeadInviteClose = () => {
    try {
      localStorage.setItem('lead_invite_dismissed_fall_2026', '1');
    } catch {
      // Continue closing if localStorage is unavailable.
    }
    setLeadInviteOpen(false);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setPairIndex((prev) => (prev + 1) % mobilePairs.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  const primaryCta =
    mode === 'recruitment'
      ? { label: 'Lead with SASC', href: '/lead', external: false }
      : mode === 'active' && nextEvent
        ? {
            label: nextEvent.href ? `See ${nextEvent.title}` : 'See upcoming events',
            href: nextEvent.href || '/events',
            external: Boolean(nextEvent.href?.startsWith('http')),
          }
        : mode === 'active'
          ? { label: 'See upcoming events', href: '/events', external: false }
          : null;

  return (
    <Box>
      <HeroSection sx={{ minHeight: { xs: '100dvh', md: '100vh' } }}>
        <MasonryGrid>
          {images.map((img) => (
            <TintedPhoto
              key={img.src}
              src={img.src}
              alt={img.alt}
              position={img.position}
              loading="eager"
              sx={{ gridColumn: `span ${img.span}` }}
            />
          ))}
        </MasonryGrid>

        <MobileStage aria-hidden>
          {mobilePairs.map((pair, i) => {
            const tallTop = i % 2 === 0;
            return (
              <Box
                key={pair[0].src}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  gridTemplateRows: tallTop ? '1.15fr 0.85fr' : '0.85fr 1.15fr',
                  gap: '4px',
                  opacity: i === pairIndex ? 1 : 0,
                  transition: 'opacity 1s ease',
                  pointerEvents: 'none',
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                {pair.map((img, row) => (
                  <TintedPhoto
                    key={img.src}
                    src={img.src}
                    position={img.position}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    sx={{ minHeight: 0 }}
                    imgSx={{
                      animation: i === pairIndex ? `${kenBurns} 4.8s ease-out forwards` : 'none',
                      animationDelay: row === 0 ? '0s' : '0.15s',
                      '@media (prefers-reduced-motion: reduce)': {
                        animation: 'none',
                      },
                    }}
                  />
                ))}
              </Box>
            );
          })}
        </MobileStage>

        <Container
          sx={{
            position: 'relative',
            zIndex: 2,
            py: { xs: 8, md: 10 },
            display: 'flex',
            alignItems: { xs: 'flex-end', md: 'center' },
            minHeight: { xs: '100dvh', md: '100vh' },
          }}
        >
          <Box sx={{ maxWidth: 640, width: '100%', mb: { xs: 2, md: 0 } }}>
            <LabelTape color="black" tilt={-2} sx={{ mb: { xs: 2.5, md: 3 } }}>
              Est. 2000 · UC Berkeley
            </LabelTape>

            <RansomWord
              word="SASC"
              component="h1"
              size={{ xs: 76, sm: 104, md: 132 }}
              sx={{ mb: { xs: 2.5, md: 3 }, ml: '-0.04em' }}
            />

            <Typography
              component="p"
              sx={{
                color: colors.textOnBlack,
                fontSize: { xs: '1.35rem', md: '1.7rem' },
                fontWeight: 700,
                letterSpacing: '-0.015em',
                maxWidth: 520,
                mb: 1.5,
                lineHeight: 1.2,
              }}
            >
              Southeast Asian Student Coalition
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: colors.textOnBlack,
                fontWeight: 500,
                maxWidth: 460,
                mb: 4,
                lineHeight: 1.55,
                textShadow: '0 1px 2px rgba(20,16,18,0.6)',
              }}
            >
              Southeast Asian students at Berkeley since 2000. We run SEAM for high schoolers, SEAGrad in May,
              Night Market in the spring, and general meetings that usually have free food.
            </Typography>

            {nextEvent && (
              <Box
                sx={{
                  position: 'relative',
                  mb: 4,
                  px: 2.25,
                  pt: 2.5,
                  pb: 2,
                  maxWidth: 400,
                  bgcolor: colors.cream,
                  color: colors.ink,
                  border: `2px solid ${colors.ink}`,
                  boxShadow: `4px 4px 0 ${colors.pink}`,
                  transform: 'rotate(-0.8deg)',
                }}
              >
                <MaskingTape corner="top" width={84} />
                <LabelTape color="black" size="sm" tilt={-1.5} sx={{ mb: 1.25 }}>
                  Next up
                </LabelTape>
                <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', lineHeight: 1.25, mb: 0.5 }}>
                  {nextEvent.title}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {nextEvent.dateLabel}
                  {nextEvent.location ? ` · ${nextEvent.location}` : ''}
                </Typography>
              </Box>
            )}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              useFlexGap
              flexWrap="wrap"
              alignItems={{ sm: 'center' }}
              sx={{ '& .MuiButton-root': { whiteSpace: 'nowrap' } }}
            >
              <Button variant="contained" size="large" onClick={() => setMailingListOpen(true)}>
                Become a General Member
              </Button>
              {primaryCta && (
                <Button
                  variant="outlined"
                  size="large"
                  component={primaryCta.external ? 'a' : RouterLink}
                  href={primaryCta.external ? primaryCta.href : undefined}
                  to={primaryCta.external ? undefined : primaryCta.href}
                  target={primaryCta.external ? '_blank' : undefined}
                  rel={primaryCta.external ? 'noopener' : undefined}
                  sx={onDarkOutline}
                >
                  {primaryCta.label}
                </Button>
              )}
              <Button
                variant="outlined"
                size="large"
                href="https://www.instagram.com/ucbsasc"
                target="_blank"
                rel="noopener"
                startIcon={<Instagram />}
                sx={onDarkOutline}
              >
                @ucbsasc
              </Button>
            </Stack>
          </Box>
        </Container>
      </HeroSection>

      {sections.map((section, index) => (
        <Box
          key={section.title}
          sx={{
            py: { xs: 7, md: 9 },
            bgcolor: index === 1 ? colors.blush : 'transparent',
            borderBottom: `2px solid ${colors.ink}`,
          }}
        >
          <Container>
            <Grid
              container
              spacing={{ xs: 4, md: 8 }}
              alignItems="center"
              direction={section.align === 'right' ? 'row' : 'row-reverse'}
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ mb: 2.5, fontSize: { xs: '2.3rem', md: '3.25rem' }, letterSpacing: '-0.03em' }}>
                  {section.title}
                </Typography>
                {section.paragraphs.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 40)}
                    variant="body1"
                    sx={{
                      color: colors.ink,
                      fontSize: { xs: '1.08rem', md: '1.2rem' },
                      lineHeight: 1.6,
                      mb: 2,
                      '&:last-of-type': { mb: section.aboutLink ? 2.5 : 0 },
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
                {section.aboutLink && (
                  <MuiLink
                    component={RouterLink}
                    to="/about"
                    underline="always"
                    sx={{ color: colors.ink, fontWeight: 700 }}
                  >
                    Read the full hxstory
                  </MuiLink>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 460,
                    ml: section.align === 'right' ? { md: 'auto' } : 0,
                    mx: { xs: 'auto', md: undefined },
                    pt: '108%',
                    overflow: 'hidden',
                    border: `2px solid ${colors.ink}`,
                    bgcolor: colors.paper,
                  }}
                >
                  <iframe
                    src={`${section.instagramPost}/embed`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                    scrolling="no"
                    allowFullScreen
                    loading="lazy"
                    title={`${section.title} Instagram post`}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}

      <Box id="programs" sx={{ py: { xs: 8, md: 11 }, scrollMarginTop: '64px' }}>
        <Container>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Every year
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 540 }}>
            The programs we run annually. Dates go on the Events page once rooms are booked.
          </Typography>
          <Grid container spacing={2.5}>
            {programs.map((program) => (
              <Grid item xs={12} md={6} key={program.title}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Typography variant="h5" gutterBottom>
                      {program.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          ...pinkPaper,
          color: colors.ink,
          py: { xs: 8, md: 10 },
          borderTop: `2px solid ${colors.ink}`,
        }}
      >
        <Container sx={{ textAlign: { xs: 'left', md: 'center' } }}>
          <Typography
            variant="h3"
            sx={{
              mb: 1.5,
              color: colors.ink,
            }}
          >
            Join the mailing list
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: colors.ink, maxWidth: 480, mx: { md: 'auto' } }}
          >
            We email GM dates, flyers, and applications when they open. Instagram usually posts the same day.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent={{ md: 'center' }}
          >
            <Button variant="contained" color="secondary" size="large" onClick={() => setMailingListOpen(true)}>
              Become a General Member
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://www.instagram.com/ucbsasc"
              target="_blank"
              rel="noopener"
              sx={{ bgcolor: 'transparent' }}
            >
              Follow @ucbsasc
            </Button>
          </Stack>
        </Container>
      </Box>
      <Footer />
      <MailingListModal open={mailingListOpen} onClose={() => setMailingListOpen(false)} />
      <LeadInviteModal open={leadInviteOpen} onClose={handleLeadInviteClose} />
    </Box>
  );
};

export default Home;
