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
import Footer from '../components/Footer';
import { programs } from '../data/programs';
import { siteSeason } from '../data/season';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors, RADIUS } from '../theme/colors';

const kenBurns = keyframes`
  from { transform: scale(1.04); }
  to { transform: scale(1.12); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: colors.charcoal,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(105deg, rgba(20,18,16,0.82) 0%, rgba(20,18,16,0.55) 45%, rgba(20,18,16,0.35) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
      background:
        'linear-gradient(180deg, rgba(20,18,16,0.5) 0%, rgba(20,18,16,0.38) 40%, rgba(20,18,16,0.86) 74%, rgba(20,18,16,0.95) 100%)',
    },
  },
}));

const MasonryGrid = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'none',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: 6,
  padding: 6,
  opacity: 0.9,
  zIndex: 0,
  [theme.breakpoints.up('md')]: {
    display: 'grid',
  },
}));

const ImageCell = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: RADIUS,
  border: `1.5px solid rgba(255,255,255,0.2)`,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 20%',
    display: 'block',
    filter: 'saturate(0.92) contrast(1.05)',
    borderRadius: RADIUS,
  },
});

/** Mobile: rotating top/bottom pair. */
const MobileStage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  display: 'block',
  padding: 3,
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

const sections = [
  {
    title: 'Community Building',
    paragraphs: [
      'SASC began in 2000 after a Southeast Asian conference at Berkeley organized with Professor Khatharya Um. Students from Lao, Hmong, Cambodian, and Vietnamese groups helped run the youth program, then stayed together to build a coalition focused on recruitment, retention, and shared community issues. The longer hxstory, including A Dream Denied, the Summer Institute, and SASComm, lives on our About page.',
    ],
    aboutLink: true,
    instagramPost: 'https://www.instagram.com/p/8mkvEjw-66',
    align: 'left' as const,
  },
  {
    title: 'SEA Grad',
    paragraphs: [
      'SEAGrad is our yearly ceremony for graduating Southeast Asian seniors and the families who got them here. It usually includes speeches, performances, and cultural sashes, and it is intentionally smaller than campus commencement so seniors can be recognized by people who know them.',
      'For many first-generation students, finishing Berkeley is a family milestone as much as an academic one. Alumni often come back, and current members help put the night together.',
    ],
    instagramPost: 'https://www.instagram.com/p/DZBGmcWElwT',
    align: 'right' as const,
  },
  {
    title: 'SEAMentorship',
    paragraphs: [
      'SEAM pairs Berkeley students with SEA high schoolers for a semester of applications, academics, and questions that are hard to ask if nobody in your family has done this before.',
      'Mentors and mentees work through essays, deadlines, financial aid forms, and what campus life is actually like. High school students from across California have come through the program, including visits that let them see Berkeley in person.',
    ],
    instagramPost: 'https://www.instagram.com/p/DKpgpl5pGhL',
    align: 'left' as const,
  },
];

const Home = () => {
  usePageTitle();
  const [mailingListOpen, setMailingListOpen] = useState(false);
  const [pairIndex, setPairIndex] = useState(0);
  const { mode, nextEvent } = siteSeason;
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#programs') {
      document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

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
            <ImageCell
              key={img.src}
              sx={{
                gridColumn: `span ${img.span}`,
              }}
            >
              <Box
                component="img"
                src={img.src}
                alt={img.alt}
                loading="eager"
                sx={{ objectPosition: img.position }}
              />
            </ImageCell>
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
                  inset: 3,
                  display: 'grid',
                  gridTemplateRows: tallTop ? '1.15fr 0.85fr' : '0.85fr 1.15fr',
                  gap: 2,
                  opacity: i === pairIndex ? 1 : 0,
                  transition: 'opacity 1s ease',
                  pointerEvents: 'none',
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                {pair.map((img, row) => (
                  <Box
                    key={img.src}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: `${RADIUS}px`,
                      border: '1.5px solid rgba(255,255,255,0.22)',
                      minHeight: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={img.src}
                      alt=""
                      loading={i === 0 ? 'eager' : 'lazy'}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: img.position,
                        filter: 'saturate(0.95) contrast(1.06)',
                        display: 'block',
                        animation:
                          i === pairIndex
                            ? `${kenBurns} 4.8s ease-out forwards`
                            : 'none',
                        animationDelay: row === 0 ? '0s' : '0.15s',
                        '@media (prefers-reduced-motion: reduce)': {
                          animation: 'none',
                        },
                      }}
                    />
                  </Box>
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
            <Typography
              variant="overline"
              sx={{
                color: colors.gold,
                display: 'inline-block',
                border: `1.5px solid ${colors.gold}`,
                borderRadius: `${RADIUS}px`,
                px: 1.25,
                py: 0.5,
                mb: 2.5,
                bgcolor: 'rgba(0,0,0,0.35)',
                letterSpacing: '0.14em',
              }}
            >
              Est. 2000 · UC Berkeley
            </Typography>

            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontFamily: '"Fraunces", serif',
                fontWeight: 700,
                fontSize: { xs: '4rem', sm: '5.5rem', md: '7rem' },
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                mb: 2,
                textShadow: '0 4px 28px rgba(0,0,0,0.45)',
              }}
            >
              SASC
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.92)',
                fontFamily: '"Fraunces", serif',
                fontSize: { xs: '1.35rem', md: '1.65rem' },
                fontWeight: 500,
                fontStyle: 'italic',
                maxWidth: 480,
                mb: 1.5,
                lineHeight: 1.35,
              }}
            >
              Southeast Asian Student Coalition
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.78)',
                maxWidth: 460,
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Mentorship, culture nights, and a stage for SEA orgs: Night Market performances, festivals, and showing up
              for our communities on campus and in the Bay.
            </Typography>

            {nextEvent && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  maxWidth: 400,
                  border: `1.5px solid ${colors.gold}`,
                  borderRadius: `${RADIUS}px`,
                  bgcolor: 'rgba(0,0,0,0.4)',
                }}
              >
                <Typography variant="overline" sx={{ color: colors.gold }}>
                  Next up
                </Typography>
                <Typography sx={{ color: 'white', fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: '1.2rem' }}>
                  {nextEvent.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  {nextEvent.dateLabel}
                  {nextEvent.location ? ` · ${nextEvent.location}` : ''}
                </Typography>
              </Box>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
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
                  sx={{
                    borderColor: 'rgba(255,255,255,0.75)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.08)',
                      borderWidth: 1.5,
                    },
                  }}
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
                sx={{
                  borderColor: 'rgba(255,255,255,0.75)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1.5,
                  },
                }}
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
            py: { xs: 8, md: 11 },
            bgcolor: index % 2 ? 'background.paper' : 'transparent',
            borderBottom: '1.5px solid',
            borderColor: 'divider',
          }}
        >
          <Container>
            <Grid
              container
              spacing={{ xs: 4, md: 7 }}
              alignItems="center"
              direction={section.align === 'right' ? 'row' : 'row-reverse'}
            >
              <Grid item xs={12} md={6}>
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.dark', display: 'block', mb: 1 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography variant="h2" sx={{ mb: 2.5 }}>
                  {section.title}
                </Typography>
                {section.paragraphs.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 40)}
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2, '&:last-of-type': { mb: section.aboutLink ? 2.5 : 0 } }}
                  >
                    {paragraph}
                  </Typography>
                ))}
                {section.aboutLink && (
                  <MuiLink
                    component={RouterLink}
                    to="/about"
                    underline="always"
                    sx={{ color: 'info.main', fontWeight: 700, textUnderlineOffset: 3 }}
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
                    border: `2px solid ${colors.charcoal}`,
                    borderRadius: `${RADIUS}px`,
                    boxShadow: `6px 6px 0 ${colors.pink}`,
                    bgcolor: 'background.paper',
                    transform: {
                      xs: 'none',
                      md: section.align === 'right' ? 'rotate(0.6deg)' : 'rotate(-0.6deg)',
                    },
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
          <Typography variant="overline" sx={{ color: 'primary.dark', display: 'block', mb: 1 }}>
            What we run
          </Typography>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Programs
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 540 }}>
            Flagship programs through the school year. Dates live on Events once rooms are locked.
          </Typography>
          <Grid container spacing={2.5}>
            {programs.map((program, i) => (
              <Grid item xs={12} md={6} key={program.title}>
                <Card
                  sx={{
                    height: '100%',
                    boxShadow: i % 2 === 0 ? `5px 5px 0 ${colors.gold}` : `5px 5px 0 ${colors.pink}`,
                  }}
                >
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
          bgcolor: colors.charcoal,
          color: 'white',
          py: { xs: 8, md: 10 },
          borderTop: `4px solid ${colors.pink}`,
        }}
      >
        <Container sx={{ textAlign: { xs: 'left', md: 'center' } }}>
          <Typography
            variant="h3"
            sx={{
              mb: 1.5,
              color: 'white',
              fontFamily: '"Fraunces", serif',
            }}
          >
            Stay in the loop
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: 'rgba(255,255,255,0.75)', maxWidth: 480, mx: { md: 'auto' } }}
          >
            GMs, culture nights, and next year&apos;s dates hit the mailing list and Instagram first.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent={{ md: 'center' }}
          >
            <Button variant="contained" size="large" onClick={() => setMailingListOpen(true)}>
              Become a General Member
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://www.instagram.com/ucbsasc"
              target="_blank"
              rel="noopener"
              sx={{
                borderColor: 'rgba(255,255,255,0.65)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  borderWidth: 1.5,
                  bgcolor: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              Follow @ucbsasc
            </Button>
          </Stack>
        </Container>
      </Box>
      <Footer />
      <MailingListModal open={mailingListOpen} onClose={() => setMailingListOpen(false)} />
    </Box>
  );
};

export default Home;
