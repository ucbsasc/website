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
      'Professor Khatharya Um organized a Southeast Asian conference at UC Berkeley to mark 25 years of the Southeast Asian diaspora after the American wars in the region. Students from Lao, Hmong, Cambodian, and Vietnamese campus communities ran the youth program. The conference ended and they kept meeting. That is where SASC came from.',
  },
  {
    year: '2000–03',
    title: '“A Dream Denied”',
    body:
      'That December, a Southeast Asian Youth Summit brought together high schoolers, college students, educators, and community workers. What came out of it turned into A Dream Denied: Educational Experiences of Southeast Asian American Youth, published with SEARAC in 2003. The report showed how aggregate Asian American numbers bury the underrepresentation of SEA students.',
  },
  {
    year: '2005',
    title: 'SASComm',
    body:
      'Keeping the coalition alive past any one officer board took years to work out. The answer was SASComm, a round-table leadership structure where programs, outreach, and advocacy sit with the whole table. No one class takes the org with it.',
  },
  {
    year: 'Today',
    title: 'SEAM, SEASO, Night Market, SEAgrad',
    body:
      'The lineup shifts with each cohort. Most years that means SEAM (mentorship), SEASO (orientation), SEACF and Night Market (culture, food, a stage for SEA orgs), and SEAgrad (graduation). We still table on Sproul, cook for SEAsgiving, run history workshops, and keep alumni in the loop.',
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
        subtitle="Student-run at UC Berkeley since 2000. We do mentorship, cultural programming, and advocacy for Southeast Asian students on campus."
        image="/sascomm.webp"
      />

      <Container sx={{ py: 2, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 780 }}>
          Student-founded and student-run since 2000. Boards turn over every year and the programming turns over
          with them, but the reason people keep rebuilding SASC has stayed the same: Southeast Asian students at
          Berkeley need somewhere to find each other, learn our hxstories, put on culture in public, and push the
          university for resources it doesn&apos;t provide on its own.
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
                  Current members and alumni from more than twenty years of SASC, including a few people who built
                  this coalition before anyone on the current board got to Berkeley.
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
                body: 'Bonding events, wellness check-ins, and alumni who still answer the group chat years after graduating. That is most of what holds SASC together.',
              },
              {
                title: 'Culture',
                body: 'Our languages, food, dance, and histories carry real knowledge. We put them in public, loudly, because a campus that only ever meets us in an aggregate statistic does not actually know us.',
              },
              {
                title: 'Advocacy',
                body: 'Representation and funding do not show up on their own. We push for what SEA students are owed, and we keep pushing after the first no, and the second one.',
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
            Fall 2026 recruiting is open. Dates aren&apos;t locked yet. Come to a GM, read through the Lead page, or
            email{' '}
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
