import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Instagram } from '@mui/icons-material';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors, RADIUS } from '../theme/colors';

const seamEmail = 'ucb.seam@gmail.com';
const seamInstagram = 'https://www.instagram.com/ucbseam';

const mission =
  'To empower high school youth and mentors by utilizing academic advising and mentorship as a way of addressing political and socio-economic issues facing the Southeast Asian community; to build a two-way exchange of knowledge and resources, instilling within both mentees and mentors the power to create social change.';

const steps = [
  {
    title: 'Applications',
    when: 'Spring',
    body: 'Berkeley students apply to be mentors and high school students apply to be mentees. We pair each mentee with a mentor before the workshops start.',
  },
  {
    title: 'Workshops on Zoom',
    when: 'May 9 to 31, 2025',
    body: 'For about four weeks, mentors and mentees attend virtual workshops together.',
  },
  {
    title: 'Conference at Berkeley',
    when: 'June 6 to 8, 2025',
    body: 'Mentors and mentees meet in person for three days and two nights on campus. SEAM covers all expenses, so food and housing are paid for.',
  },
];

const history = [
  {
    year: '2000',
    body:
      'SASC started after a Southeast Asian conference at Berkeley. In December, members held a Southeast Asian Youth Summit for high school students, college students, educators, and community workers.',
  },
  {
    year: '2002',
    body:
      'The first Summer Institute brought Southeast Asian high school students to stay on campus for a few days of college workshops, free of charge.',
  },
  {
    year: '2007',
    body: 'SASC members started mentoring students from South East Asian Youth Leaders (SEAYL) in Richmond.',
  },
  {
    year: '2008',
    body: 'The mentorship was renamed SEAM, the Southeast Asian Mentorship program.',
  },
  {
    year: '2019–20',
    body: 'After a hiatus, SEAM restarted as an online program and opened up to high school students outside the Bay Area.',
  },
];

const traditionalPhoto = {
  src: '/seam-traditional.webp',
  alt: 'SEAM mentees posing in traditional clothes, making heart shapes with their arms',
  caption: 'Mentees in traditional clothes',
};

const fundraiserPhoto = {
  src: '/seam-fundraiser.webp',
  alt: 'SEAM officers smiling at a fundraising table selling strawberry sago under the SASC banner',
  caption: 'Officers selling strawberry sago to raise money for SEAM',
};

const framedImage = {
  border: `2px solid ${colors.charcoal}`,
  borderRadius: `${RADIUS}px`,
  boxShadow: `6px 6px 0 ${colors.pink}`,
};

const Photo = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <Box component="figure" sx={{ ...framedImage, m: 0, overflow: 'hidden', bgcolor: 'background.paper' }}>
    <Box
      component="img"
      src={src}
      alt={alt}
      width={1440}
      height={1440}
      loading="lazy"
      sx={{ display: 'block', width: '100%', height: 'auto' }}
    />
    <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ px: 2.5, py: 1.5 }}>
      {caption}
    </Typography>
  </Box>
);

const Seam = () => {
  usePageTitle('SEAM');
  return (
    <Box>
      <PageHeader
        title="Southeast Asian Mentorship"
        subtitle="SASC's mentorship program for Southeast Asian high school students."
        image="/seam-group.webp"
        imagePosition="center 62%"
        lightOverlay
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            href={`mailto:${seamEmail}?subject=SEAM`}
            sx={{
              color: 'primary.main',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
            }}
          >
            Email SEAM
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href={seamInstagram}
            target="_blank"
            rel="noopener"
            startIcon={<Instagram />}
            sx={{
              borderColor: 'rgba(255,255,255,0.75)',
              color: 'white',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)', borderWidth: 1.5 },
            }}
          >
            @ucbseam
          </Button>
        </Stack>
      </PageHeader>

      <Container sx={{ mb: { xs: 7, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/seam-logo.png"
              alt="SEAM logo: the word Seam in green script above two hands holding a pink lotus"
              width={800}
              height={800}
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                mx: 'auto',
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              About SEAM
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" color="text.secondary">
                SEAM pairs UC Berkeley students with Southeast Asian high school students. When it started, SEAM
                worked mainly with students from Richmond and the surrounding Bay Area, holding workshops and
                activities that supported high school youth academically and politically. Mentees now join from
                all over California.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Mentors help their mentees with college applications and with planning for after high school.
                Workshops also cover Southeast Asian history and identity.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: 'background.paper',
          borderTop: '1.5px solid',
          borderBottom: '1.5px solid',
          borderColor: 'divider',
          mb: { xs: 7, md: 9 },
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            How it works
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mb: 5 }}>
            The program has two parts: a few weeks of workshops on Zoom and a conference at Berkeley. We
            encourage everyone to do both. The dates below are from 2025, and next year&apos;s will be around the
            same time.
          </Typography>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={4}>
                {steps.map((item) => (
                  <Box key={item.title} sx={{ borderTop: `3px solid ${colors.charcoal}`, pt: 2 }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.darkPink, fontWeight: 600, mb: 1 }}>
                      {item.when}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.body}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Photo {...traditionalPhoto} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mb: { xs: 7, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Being a mentor
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" color="text.secondary">
                As a mentor, you contact your mentee once a week, encourage them to come to our workshops, and come
                to the workshops yourself. You also support them with whatever they want to pursue after high
                school.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We expect mentors to come to the summer conference too. Food, housing, and other costs are covered.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="figure" sx={{ ...framedImage, m: 0, overflow: 'hidden', bgcolor: 'background.paper' }}>
              <Box
                component="img"
                src="/seam-workshop.webp"
                alt="A speaker presenting a workshop titled Reclaiming our Mental Health as Southeast Asians to students seated in a classroom"
                width={1440}
                height={1085}
                loading="lazy"
                sx={{ display: 'block', width: '100%', height: 'auto' }}
              />
              <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ px: 2.5, py: 1.75 }}>
                Irene Phuong Van presenting &ldquo;Reclaiming our Mental Health as Southeast Asians&rdquo;
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: { xs: 7, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              History
            </Typography>
            <Typography variant="body1" color="text.secondary">
              SASC has run programs for Southeast Asian high school students since it started in 2000.
            </Typography>
            <Box sx={{ mt: 4, maxWidth: { xs: 420, md: 'none' } }}>
              <Photo {...fundraiserPhoto} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ borderLeft: `2px solid ${colors.charcoal}`, pl: { xs: 2.5, sm: 4 } }}>
              <Stack spacing={3.5}>
                {history.map((item) => (
                  <Box key={item.year} sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: -27, sm: -39 },
                        top: 6,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: colors.pink,
                        border: `2px solid ${colors.charcoal}`,
                      }}
                    />
                    <Typography
                      variant="overline"
                      sx={{ display: 'block', fontWeight: 700, color: colors.darkPink, letterSpacing: '0.08em' }}
                    >
                      {item.year}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.body}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: colors.lightPink, py: { xs: 7, md: 9 } }}>
        <Container sx={{ maxWidth: '860px !important' }}>
          <Typography variant="h4" gutterBottom>
            Mission
          </Typography>
          <Typography
            component="blockquote"
            sx={{
              m: 0,
              fontFamily: '"Fraunces", serif',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              lineHeight: 1.5,
              color: colors.charcoal,
            }}
          >
            &ldquo;{mission}&rdquo;
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: colors.charcoal,
          color: 'white',
          py: { xs: 7, md: 9 },
          borderTop: `4px solid ${colors.pink}`,
        }}
      >
        <Container sx={{ textAlign: { xs: 'left', md: 'center' } }}>
          <Typography variant="h3" sx={{ mb: 1.5, color: 'white', fontFamily: '"Fraunces", serif' }}>
            Get involved
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: 'rgba(255,255,255,0.75)', maxWidth: 560, mx: { md: 'auto' } }}
          >
            Applications for next year aren&apos;t open yet. We&apos;ll post on Instagram when they are. If you
            have questions, email us at{' '}
            <Box component="strong" sx={{ color: 'white' }}>
              {seamEmail}
            </Box>
            .
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent={{ md: 'center' }}>
            <Button variant="contained" size="large" href={`mailto:${seamEmail}?subject=SEAM`}>
              Email SEAM
            </Button>
            <Button
              variant="outlined"
              size="large"
              href={seamInstagram}
              target="_blank"
              rel="noopener"
              startIcon={<Instagram />}
              sx={{
                borderColor: 'rgba(255,255,255,0.65)',
                color: 'white',
                '&:hover': { borderColor: 'white', borderWidth: 1.5, bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              Follow @ucbseam
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Seam;
