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
  Advocacy: colors.calBlue,
};

type TeamSection = {
  name: string;
  focus: string;
  committee: LeadershipCommittee;
  blurb?: string;
};

/** The four recruiting branches, plus the roles that sit outside them. */
const teamSections: TeamSection[] = [
  ...leadBranches.map(({ name, focus, committee }) => ({ name, focus, committee })),
  {
    name: 'Legal & Policy Advocacy',
    focus: 'Policy, rights & advocacy',
    committee: 'Advocacy',
    blurb:
      'A standing role rather than a branch. It tracks the policy that reaches Southeast Asian students — immigration and deportation, disaggregated data, financial aid — and works with the branches when something needs a response.',
  },
];

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
      'By 2005, members wanted something sturdier than an officer board that got rebuilt from scratch every couple of years. SASComm is a round table where programs, outreach, and advocacy are split across everyone, so the org doesn’t fall apart when the two or three people running it graduate.',
  },
  {
    year: 'Today',
    title: 'SEAM, SEASO, Night Market, SEAGrad',
    body:
      'The lineup shifts with each cohort, but most years it includes SEAM (mentorship), SEASO (orientation), SEACF and Night Market (culture, food, and a stage for SEA orgs), and SEAGrad (graduation). We also table on Sproul, cook for SEAsgiving, run history workshops, and try to keep alumni in the loop.',
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
        subtitle="Student-run at UC Berkeley since 2000, for Southeast Asian students on campus and the high schoolers coming up after them."
        image="/sascomm.webp"
      />

      <Container sx={{ py: 2, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 780 }}>
          The board turns over every year and the events change with it. What stays the same is Southeast Asian
          students at Berkeley finding each other, learning our hxstories, and pushing the university for resources
          it wouldn&apos;t hand over on its own.
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
          helping plan and staff the work week to week. A couple of roles sit outside the branches.
        </Typography>

        {teamSections.map((section) => {
          const members = [...directors, ...officers].filter(
            (member) => member.committee === section.committee
          );
          if (members.length === 0) return null;
          const accent = committeeAccent[section.committee];

          return (
            <Box key={section.committee} sx={{ mb: { xs: 5, md: 6 } }}>
              <Stack
                direction="row"
                alignItems="baseline"
                spacing={1.25}
                sx={{ mb: section.blurb ? 1 : 2.5, flexWrap: 'wrap' }}
              >
                <Box
                  sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: accent, flexShrink: 0 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {section.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {section.focus}
                </Typography>
              </Stack>
              {section.blurb && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 700 }}>
                  {section.blurb}
                </Typography>
              )}
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
            Fall 2026 lead applications are open until Friday, Sept. 25. Come to our GM on Sept. 17 for the info
            session, read through the Lead page, or email{' '}
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
              Lead with SASC
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
