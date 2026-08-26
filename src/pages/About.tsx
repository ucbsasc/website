import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import Tooltip from '@mui/material/Tooltip';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { directors as leadershipDirectors, officers as leadershipOfficers, LeadershipMember } from '../data/leadership';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors, RADIUS } from '../theme/colors';

type StoryMilestone = {
  year: string;
  title: string;
  body: string;
};

const storyMilestones: StoryMilestone[] = [
  {
    year: '2000',
    title: 'A conference becomes a coalition',
    body:
      'Professor Khatharya Um organized a Southeast Asian conference at UC Berkeley to mark 25 years of the Southeast Asian diaspora after the American wars in the region. Students from Lao, Hmong, Cambodian, and Vietnamese campus communities ran the youth program, then stayed together rather than let the work end with a weekend.',
  },
  {
    year: '2000–03',
    title: '“A Dream Denied”',
    body:
      'A Southeast Asian Youth Summit that December brought together high schoolers, college students, educators, and community workers. The data became A Dream Denied: Educational Experiences of Southeast Asian American Youth (with SEARAC, 2003) — evidence that folding SEA students into aggregate Asian American numbers hides real underrepresentation.',
  },
  {
    year: '2005',
    title: 'SASComm',
    body:
      'After years of figuring out how to keep the coalition alive past any one officer board, members organized SASComm, a round-table leadership structure that spreads the work of programs, outreach, and advocacy instead of parking it on a few people.',
  },
  {
    year: 'Today',
    title: 'SEAM, SEASO, Night Market, SEAgrad',
    body:
      'The lineup shifts with each cohort, but usually means SEAM (mentorship), SEASO (orientation), SEACF and Night Market (culture, food, a stage for SEA orgs), and SEAgrad (graduation). We still table on Sproul, cook for SEAsgiving, run history workshops, and keep alumni in the loop.',
  },
];

const TeamCard = ({ member, accent }: { member: LeadershipMember; accent: string }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `4px 4px 0 ${accent}`,
    }}
  >
    <CardMedia
      component="img"
      image={member.image}
      alt={member.name}
      sx={{ aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'top center' }}
    />
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
        {member.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {member.role}
      </Typography>
      <Box sx={{ mt: 'auto' }}>
        <Tooltip title={member.email}>
          <Button
            size="small"
            variant="text"
            href={`mailto:${member.email}`}
            startIcon={<EmailIcon fontSize="small" />}
            sx={{ pl: 0 }}
          >
            Email
          </Button>
        </Tooltip>
      </Box>
    </CardContent>
  </Card>
);

const About = () => {
  usePageTitle('About');
  const directors = leadershipDirectors;
  const officers = leadershipOfficers;

  return (
    <Box sx={{ position: 'relative' }}>
      <PageHeader
        title="About SASC"
        subtitle="Student-run at UC Berkeley since 2000. We support Southeast Asian students through mentorship, cultural programming, and community."
        image="/sascomm.jpg"
      />

      <Container sx={{ py: 2, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 780 }}>
          Student-founded and student-run since 2000. Every year looks a little different because students turn over
          and the political weather changes — what hasn&apos;t changed is the reason people keep rebuilding SASC:
          Southeast Asian students at Berkeley should have a place to find each other, learn our hxstories, put on
          culture in public, and push for resources when the university&apos;s defaults leave us out.
        </Typography>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {storyMilestones.map((milestone, i) => (
                <Box
                  key={milestone.year}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 0.5, sm: 3 },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      flexShrink: 0,
                      width: { sm: 88 },
                      fontWeight: 700,
                      color: i % 2 === 0 ? colors.darkPink : 'primary.dark',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {milestone.year}
                  </Typography>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {milestone.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                border: `2px solid ${colors.charcoal}`,
                borderRadius: `${RADIUS}px`,
                boxShadow: `5px 5px 0 ${colors.pink}`,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                position: { md: 'sticky' },
                top: { md: 76 },
              }}
            >
              <Box
                component="img"
                src="/alumni-tailgate.jpg"
                alt="SASC students and alumni at a 2026 tailgate, holding the coalition banner"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: 0,
                }}
              />
              <Box sx={{ px: { xs: 2, md: 2.5 }, py: 2 }}>
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.dark', display: 'block', letterSpacing: '0.1em' }}
                >
                  Alumni Tailgate · 2026
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A 2026 tailgate where current members reconvened with alumni spanning more than 20 years of SASC,
                  including people who built this coalition long before the current board was on campus.
                </Typography>
              </Box>
            </Box>
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
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            What We Care About
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Community',
                body: 'We look out for each other through bonding events, wellness check-ins, and alumni relationships that often last well beyond graduation.',
              },
              {
                title: 'Culture',
                body: 'We treat our languages, food, dance, and histories as sources of knowledge and pride worth sharing on campus.',
              },
              {
                title: 'Advocacy',
                body: 'We work for representation, funding, and campus resources so Southeast Asian students are not overlooked.',
              },
            ].map((value) => (
              <Grid item xs={12} md={4} key={value.title}>
                <Box sx={{ pr: { md: 2 } }}>
                  <Typography variant="h5" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {value.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: 7, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          Directors
        </Typography>
        <Grid container spacing={2.5} sx={{ mb: 5 }}>
          {directors.map((member, i) => (
            <Grid item xs={6} sm={4} md={3} key={member.name}>
              <TeamCard member={member} accent={i % 2 === 0 ? colors.gold : colors.pink} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          Officers
        </Typography>
        <Grid container spacing={2.5}>
          {officers.map((member, i) => (
            <Grid item xs={6} sm={4} md={3} key={member.name}>
              <TeamCard member={member} accent={i % 2 === 0 ? colors.pink : colors.gold} />
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
            Get Involved
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: 'rgba(255,255,255,0.75)', maxWidth: 560, mx: { md: 'auto' } }}
          >
            Fall 2026 recruiting is open; dates aren&apos;t set yet. Come to a GM, check the Lead page, or email{' '}
            <Box component="strong" sx={{ color: 'white' }}>
              UCB.SASC@gmail.com
            </Box>
            .
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent={{ md: 'center' }}
            sx={{ mb: 3 }}
          >
            <Button variant="contained" size="large" href="/lead">
              Leadership & Involvement
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="mailto:UCB.SASC@gmail.com?subject=Hello%20SASC"
              sx={{
                borderColor: 'rgba(255,255,255,0.65)',
                color: 'white',
                '&:hover': { borderColor: 'white', borderWidth: 1.5, bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              Email Us
            </Button>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 0.5, sm: 3 }}
            justifyContent={{ md: 'center' }}
          >
            <Button component={RouterLink} to="/partners" sx={{ color: 'rgba(255,255,255,0.75)' }}>
              Community & Partners →
            </Button>
            <Button component={RouterLink} to="/#programs" sx={{ color: 'rgba(255,255,255,0.75)' }}>
              Our Programs →
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default About;
