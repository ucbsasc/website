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
    title: 'Apply',
    when: 'Before the program starts',
    body: 'Berkeley students apply to be mentors and high schoolers apply to be mentees. Each mentor is paired with a mentee.',
  },
  {
    title: 'Virtual workshops',
    when: 'About 4 weeks (May 9–31 in 2025)',
    body: 'Workshops on Zoom for mentors and mentees. Mentors also check in with their mentee once a week.',
  },
  {
    title: 'Summer conference',
    when: '3 days, 2 nights (June 6–8 in 2025)',
    body: 'Mentors and mentees meet in person at Berkeley. SEAM pays for everything, including food and housing.',
  },
];

const history = [
  {
    year: '2000',
    title: 'Youth summit',
    body:
      'SASC started at a Southeast Asian conference at Berkeley. That December it held a Southeast Asian Youth Summit with high schoolers, college students, educators, and community workers.',
  },
  {
    year: '2002',
    title: 'Summer Institute',
    body:
      'SASC started the Summer Institute, a free program where Southeast Asian high schoolers stayed on campus for several days of college workshops.',
  },
  {
    year: '2007',
    title: 'First mentorship pairing',
    body:
      'SASC members were paired with students from South East Asian Youth Leaders (SEAYL), a youth program in Richmond. Most early mentees came from Richmond and nearby Bay Area cities.',
  },
  {
    year: '2008',
    title: 'Renamed SEAM',
    body: 'The pairing became the Southeast Asian Mentorship program.',
  },
  {
    year: '2019–20',
    title: 'Back online',
    body: 'After a hiatus, SEAM came back as a virtual program, open to high schoolers across California.',
  },
  {
    year: 'Now',
    title: 'Virtual and in person',
    body: 'Spring workshops happen online, followed by a conference at Berkeley in early June.',
  },
];

const responsibilities = [
  'Check in with your mentee once a week.',
  'Go to the workshops and encourage your mentee to come too.',
  'Help your mentee with whatever they want to do after high school.',
  'Come to the summer conference.',
];

const gallery = [
  {
    src: '/seam-traditional.webp',
    alt: 'SEAM mentees posing in traditional clothes, making heart shapes with their arms',
    caption: 'Mentees in traditional clothes',
  },
  {
    src: '/seam-fundraiser.webp',
    alt: 'SEAM officers smiling at a fundraising table selling strawberry sago under the SASC banner',
    caption: 'Selling strawberry sago to fundraise for SEAM',
  },
];

const framedImage = {
  border: `2px solid ${colors.charcoal}`,
  borderRadius: `${RADIUS}px`,
  boxShadow: `6px 6px 0 ${colors.pink}`,
};

const Seam = () => {
  usePageTitle('SEAM');
  return (
    <Box>
      <PageHeader
        title="Southeast Asian Mentorship"
        subtitle="Berkeley students mentoring Southeast Asian high schoolers. Run by SASC since 2007."
        image="/seam-traditional.webp"
        imagePosition="center 35%"
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
              src="/partners/seam.jpg"
              alt="SEAM logo: the word Seam in green script above two hands holding a pink lotus"
              sx={{
                ...framedImage,
                display: 'block',
                width: '100%',
                maxWidth: 340,
                height: 'auto',
                mx: 'auto',
                bgcolor: 'white',
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              About SEAM
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" color="text.secondary">
                SEAM is SASC&apos;s mentorship program for Southeast Asian high schoolers. Each mentee gets a Berkeley
                student as a mentor, someone to ask about college applications, financial aid, and the stuff
                that&apos;s hard to ask about when nobody in your family has done it before.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Workshops also cover Southeast Asian history and identity and the issues our communities deal with.
                Our mission calls it a two-way exchange, so mentors are expected to learn from it as well.
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
            SEAM runs online first, then in person. Dates change a little each year. Here&apos;s what 2025 looked
            like.
          </Typography>
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {steps.map((item, i) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Box sx={{ borderTop: `3px solid ${colors.charcoal}`, pt: 2.5 }}>
                  <Typography
                    sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, color: colors.darkPink }}
                  >
                    {i + 1}
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                    {item.when}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mb: { xs: 7, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Being a mentor
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Mentors are Berkeley students. If you mentor, we ask you to:
            </Typography>
            <Stack spacing={1.5}>
              {responsibilities.map((item, i) => (
                <Stack direction="row" spacing={2} key={item} alignItems="baseline">
                  <Typography
                    sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, color: colors.darkPink, minWidth: 16 }}
                  >
                    {i + 1}
                  </Typography>
                  <Typography variant="body1">{item}</Typography>
                </Stack>
              ))}
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
              The conference costs you nothing. Food and housing are paid for.
            </Typography>
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
                Workshop: Reclaiming our Mental Health as Southeast Asians
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
              SASC has worked with Southeast Asian high schoolers since it started in 2000. SEAM is the current
              version of that work.
            </Typography>
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {item.title}
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

      <Box sx={{ bgcolor: colors.lightPink, py: { xs: 7, md: 9 }, mb: { xs: 7, md: 9 } }}>
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

      <Container sx={{ mb: { xs: 7, md: 9 } }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Photos
        </Typography>
        <Grid container spacing={3}>
          {gallery.map((photo) => (
            <Grid item xs={12} sm={6} key={photo.src}>
              <Box component="figure" sx={{ m: 0 }}>
                <Box
                  component="img"
                  src={photo.src}
                  alt={photo.alt}
                  width={1440}
                  height={1440}
                  loading="lazy"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    borderRadius: `${RADIUS}px`,
                    border: `2px solid ${colors.charcoal}`,
                  }}
                />
                <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
                  {photo.caption}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

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
            Applications for the next cycle aren&apos;t open yet. Follow @ucbseam for updates, or email{' '}
            <Box component="strong" sx={{ color: 'white' }}>
              {seamEmail}
            </Box>{' '}
            if you have questions.
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
