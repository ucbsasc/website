import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { Groups, Handshake, Home as HomeIcon, Instagram, VideoCall } from '@mui/icons-material';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const seamEmail = 'ucb.seam@gmail.com';
const seamInstagram = 'https://www.instagram.com/ucbseam';

const mission =
  'To empower high school youth and mentors by utilizing academic advising and mentorship as a way of addressing political and socio-economic issues facing the Southeast Asian community; to build a two-way exchange of knowledge and resources, instilling within both mentees and mentors the power to create social change.';

const portions = [
  {
    title: 'Virtual portion',
    icon: <VideoCall fontSize="large" color="inherit" />,
    when: 'Spring, about 4 weeks (May 9 – May 31 in 2025)',
    detail:
      'Mentors and mentees meet on Zoom for weekly workshops, and mentors check in with their mentees one-on-one.',
  },
  {
    title: 'In-person conference',
    icon: <HomeIcon fontSize="large" color="inherit" />,
    when: 'Early June at UC Berkeley, 3 days and 2 nights (June 6 – 8 in 2025)',
    detail:
      'Mentors and mentees meet in person and explore Southeast Asian identities together. SEAM covers all expenses, including food and housing.',
  },
];

const responsibilities = [
  'Contact your mentee once a week.',
  'Encourage your mentee to come to the workshops, and join them yourself.',
  'Support your mentee with whatever they want to pursue after high school.',
  'Take part in the in-person summer conference with us.',
];

const Seam = () => {
  usePageTitle('SEAM');
  return (
    <Box>
      <PageHeader
        title="SEAM"
        subtitle="The Southeast Asian Mentorship program pairs Berkeley students with Southeast Asian high schoolers, from workshops online in the spring to a conference on campus in the summer."
        image="/grid/workshop.webp"
        imagePosition="center 30%"
        lightOverlay
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
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
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.08)',
                borderWidth: 1.5,
              },
            }}
          >
            @ucbseam
          </Button>
        </Stack>
      </PageHeader>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/partners/seam.jpg"
              alt="SEAM logo"
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                mx: 'auto',
                borderRadius: 3,
                boxShadow: (theme) => theme.shadows[6],
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              What is SEAM?
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" color="text.secondary">
                SEAM started as a program that worked mainly with students from Richmond and the
                surrounding Bay Area. We held workshops and facilitated activities that empowered and
                supported high school youth, academically and politically.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We&apos;re continuing that mission. SEAM runs both online and in person, so mentors and
                mentees can build a relationship before they ever meet on campus.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          How it works
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 3 }}>
          SEAM has two parts, and we encourage everyone to join both. Dates shift a little each year, but
          they stay close to these times.
        </Typography>
        <Grid container spacing={3}>
          {portions.map((portion) => (
            <Grid item xs={12} md={6} key={portion.title}>
              <Card sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    color: 'primary.main',
                    display: 'inline-flex',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    width: 'fit-content',
                    opacity: 0.8,
                  }}
                >
                  {portion.icon}
                </Box>
                <Typography variant="h5" component="h3">
                  {portion.title}
                </Typography>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 600 }}>
                  {portion.when}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {portion.detail}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Being a mentor
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Mentors support mentees with whatever they want to pursue after high school. You&apos;ll make
              a real difference in the lives of Southeast Asian youth, and the cost of the summer
              conference, food and housing included, is covered.
            </Typography>
            <Box
              component="ul"
              sx={{ pl: 2, m: 0, display: 'grid', gap: 1, listStyleType: 'disc' }}
            >
              {responsibilities.map((item) => (
                <Typography
                  component="li"
                  variant="body1"
                  color="text.secondary"
                  key={item}
                  sx={{ listStyleType: 'inherit' }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/sascomm.webp"
              alt="SASC community members gathered together"
              sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: (theme) => theme.shadows[6],
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Card sx={{ p: { xs: 3, md: 5 }, backgroundColor: 'rgba(33, 150, 243, 0.08)' }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <Handshake color="primary" />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Our mission
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontStyle: 'italic', maxWidth: 820 }}
            >
              &ldquo;{mission}&rdquo;
            </Typography>
          </Stack>
        </Card>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Card sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <Groups color="primary" />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Get involved
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Applications for mentors and mentees open each spring. Follow @ucbseam to hear when they do,
              or email us at{' '}
              <Box component="strong" sx={{ color: 'text.primary' }}>
                {seamEmail}
              </Box>{' '}
              with any questions or concerns.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
              <Button variant="contained" color="primary" href={`mailto:${seamEmail}?subject=SEAM`}>
                Email SEAM
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href={seamInstagram}
                target="_blank"
                rel="noopener"
              >
                Follow @ucbseam
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Container>

      <Footer />
    </Box>
  );
};

export default Seam;
