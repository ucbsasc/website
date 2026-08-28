import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import Tooltip from '@mui/material/Tooltip';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import {
  directors as leadershipDirectors,
  officers as leadershipOfficers,
  LeadershipMember,
  LeadershipCommittee,
} from '../data/leadership';
import { leadBranches } from '../data/lead';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors, RADIUS } from '../theme/colors';

const committeeAccent: Record<LeadershipCommittee, string> = {
  Internal: colors.gold,
  External: colors.darkPink,
  Operations: colors.bayNavy,
  PR: colors.pink,
};

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
      'Professor Khatharya Um organized a Southeast Asian conference at UC Berkeley to mark 25 years of the Southeast Asian diaspora after the American wars in the region. Students from the Lao, Hmong, Cambodian, and Vietnamese communities on campus ran the youth program, and they kept meeting after the conference was over, which is how SASC started.',
  },
  {
    year: '2000–03',
    title: '“A Dream Denied”',
    body:
      'A Southeast Asian Youth Summit that December brought together high schoolers, college students, educators, and community workers, and the research from it was published a few years later as A Dream Denied: Educational Experiences of Southeast Asian American Youth, put out with SEARAC in 2003. The report argued that counting Southeast Asian students inside aggregate Asian American statistics makes their underrepresentation hard to see.',
  },
  {
    year: '2005',
    title: 'SASComm',
    body:
      'By 2005, members had worked out something more durable than an officer board that got rebuilt from scratch every couple of years. SASComm is a round-table leadership structure that spreads programs, outreach, and advocacy across the whole table, which keeps the org from depending on the two or three people who happen to be running it that year.',
  },
  {
    year: 'Today',
    title: 'SEAM, SEASO, Night Market, SEAgrad',
    body:
      'The lineup shifts with each cohort, but most years it includes SEAM (mentorship), SEASO (orientation), SEACF and Night Market (culture, food, and a stage for SEA orgs), and SEAgrad (graduation). We also table on Sproul, cook for SEAsgiving, run history workshops, and try to keep alumni in the loop.',
  },
];

const TeamCard = ({ member, accent }: { member: LeadershipMember; accent: string }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: 'none',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: (theme) => theme.shadows[6],
      },
    }}
  >
    <Box sx={{ lineHeight: 0 }}>
      <Box sx={{ height: 4, bgcolor: accent }} />
      <CardMedia
        component="img"
        image={member.image}
        alt={member.name}
        sx={{ aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'top center' }}
      />
    </Box>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
        {member.name}
      </Typography>
      <Typography variant="body2" sx={{ color: accent, fontWeight: 600, mb: 1.5 }}>
        {member.role}
      </Typography>
      <Box sx={{ mt: 'auto' }}>
        <Tooltip title={member.email}>
          <Button
            size="small"
            variant="text"
            href={`mailto:${member.email}`}
            startIcon={<EmailIcon fontSize="small" />}
            sx={{
              pl: 0,
              color: 'text.secondary',
              '&:hover': { color: accent, bgcolor: 'transparent' },
            }}
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
          SASC has been student-founded and student-run since 2000. Officer boards change every year and so does a
          lot of the programming, though the core of it is fairly consistent: a place for Southeast Asian students at
          Berkeley to find each other, learn our hxstories, put on culture in public, and push the university for
          resources it doesn&apos;t otherwise provide.
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
                body: 'A lot of SASC is people looking out for each other, which shows up in bonding events, wellness check-ins, and alumni who stay in touch long after graduating.',
              },
              {
                title: 'Culture',
                body: 'Our languages, food, dance, and histories are knowledge worth taking seriously. A good part of what we do is putting them in front of the rest of campus.',
              },
              {
                title: 'Advocacy',
                body: 'Representation, funding, and campus resources don\'t arrive on their own, so a lot of this work is asking repeatedly, sitting in meetings, and following up when nothing happens.',
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
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 700 }}>
          SASComm is organized into four branches. Each is run by a director or two, with officers
          helping plan and staff the work week to week.
        </Typography>

        {leadBranches.map((branch) => {
          const members = [...directors, ...officers].filter(
            (member) => member.committee === branch.committee
          );
          if (members.length === 0) return null;
          const accent = committeeAccent[branch.committee];

          return (
            <Box key={branch.committee} sx={{ mb: { xs: 5, md: 6 } }}>
              <Stack direction="row" alignItems="baseline" spacing={1.25} sx={{ mb: 2.5 }}>
                <Box
                  sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: accent, flexShrink: 0 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {branch.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {branch.focus}
                </Typography>
              </Stack>
              <Grid container spacing={2.5}>
                {members.map((member) => (
                  <Grid item xs={6} sm={4} md={3} key={member.email}>
                    <TeamCard member={member} accent={accent} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
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
            Fall 2026 recruiting is open, though we haven&apos;t set dates yet. Come to a GM, read through the Lead
            page, or email{' '}
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
