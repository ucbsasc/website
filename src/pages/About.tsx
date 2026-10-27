import { Box, Container, Typography, Grid, Button, Stack, IconButton } from '@mui/material';
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

const values = [
  {
    title: 'Community',
    body: 'A lot of SASC is people looking out for each other, which shows up in bonding events, wellness check-ins, and alumni who stay in touch long after graduating.',
    accent: colors.gold,
  },
  {
    title: 'Culture',
    body: 'Our languages, food, dance, and histories are knowledge worth taking seriously. A good part of what we do is putting them in front of the rest of campus.',
    accent: colors.pink,
  },
  {
    title: 'Advocacy',
    body: 'Representation, funding, and campus resources don\'t arrive on their own, so a lot of this work is asking repeatedly, sitting in meetings, and following up when nothing happens.',
    accent: colors.calBlue,
  },
];

const SectionHeading = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 760 }}>
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.25 }}>
      <Box sx={{ width: 28, height: 2, bgcolor: colors.pink }} />
      <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.14em' }}>
        {eyebrow}
      </Typography>
    </Stack>
    <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: intro ? 1.5 : 0 }}>
      {title}
    </Typography>
    {intro && (
      <Typography variant="body1" color="text.secondary">
        {intro}
      </Typography>
    )}
  </Box>
);

/** "Internal Officer · SEAM" -> title "Internal Officer", tags ["SEAM"] */
const splitRole = (role: string) => {
  const [title, ...tags] = role.split(' · ');
  return { title, tags };
};

const initials = (name: string) => {
  const parts = name.split(' ');
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ''}`;
};

const Portrait = ({ member, accent }: { member: LeadershipMember; accent: string }) =>
  member.image ? (
    <Box
      component="img"
      src={member.image}
      alt={member.name}
      loading="lazy"
      sx={{
        display: 'block',
        width: '100%',
        aspectRatio: '4 / 5',
        objectFit: 'cover',
        objectPosition: 'top center',
        borderRadius: 0,
      }}
    />
  ) : (
    <Box
      role="img"
      aria-label={member.name}
      sx={{
        width: '100%',
        aspectRatio: '4 / 5',
        display: 'grid',
        placeItems: 'center',
        bgcolor: `${accent}26`,
        color: 'text.primary',
        fontFamily: '"Fraunces", serif',
        fontSize: '2.25rem',
      }}
    >
      {initials(member.name)}
    </Box>
  );

const RoleTags = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <Stack direction="row" spacing={0.5} sx={{ mt: 0.75 }}>
      {tags.map((tag) => (
        <Box
          key={tag}
          component="span"
          sx={{
            px: 0.75,
            py: 0.125,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: `${RADIUS / 2}px`,
            color: 'text.secondary',
          }}
        >
          {tag}
        </Box>
      ))}
    </Stack>
  ) : null;

const DirectorCard = ({ member, accent }: { member: LeadershipMember; accent: string }) => {
  const { title, tags } = splitRole(member.role);
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: `4px solid ${accent}`,
        borderRadius: `${RADIUS}px`,
      }}
    >
      <Box sx={{ width: { xs: 112, sm: 136 }, flexShrink: 0 }}>
        <Portrait member={member} accent={accent} />
      </Box>
      <Box sx={{ p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Typography variant="h5" component="h4" sx={{ lineHeight: 1.2, mb: 0.5 }}>
          {member.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {title}
        </Typography>
        <RoleTags tags={tags} />
        <Button
          size="small"
          href={`mailto:${member.email}`}
          startIcon={<EmailIcon fontSize="small" />}
          sx={{
            mt: 'auto',
            pt: 1.5,
            pl: 0,
            alignSelf: 'flex-start',
            color: 'text.secondary',
            '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
          }}
        >
          Email
        </Button>
      </Box>
    </Box>
  );
};

const OfficerCard = ({ member, accent }: { member: LeadershipMember; accent: string }) => {
  const { title, tags } = splitRole(member.role);
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: `${RADIUS}px`,
      }}
    >
      <Portrait member={member} accent={accent} />
      <Box sx={{ p: 1.5 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={0.5}>
          <Typography variant="subtitle2" component="h4" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {member.name}
          </Typography>
          <Tooltip title={member.email}>
            <IconButton
              size="small"
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              sx={{ mt: -0.5, mr: -0.75, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <EmailIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.4 }}>
          {title}
        </Typography>
        <RoleTags tags={tags} />
      </Box>
    </Box>
  );
};

const TierLabel = ({ children }: { children: string }) => (
  <Typography
    variant="overline"
    component="p"
    sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.12em', mb: 1.5 }}
  >
    {children}
  </Typography>
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

      <Container sx={{ pt: 2, pb: { xs: 8, md: 10 } }}>
        <SectionHeading
          eyebrow="Since 2000"
          title="Our Story"
          intro="The board turns over every year and the events change with it. What stays the same is Southeast Asian students at Berkeley finding each other, learning our hxstories, and pushing the university for resources it wouldn’t hand over on its own."
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={7}>
            <Box
              component="ol"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                pl: { xs: 3.5, sm: 4.5 },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 6,
                  top: 10,
                  bottom: 10,
                  width: 2,
                  bgcolor: 'divider',
                },
              }}
            >
              {storyMilestones.map((milestone, i) => (
                <Box
                  component="li"
                  key={milestone.year}
                  sx={{ position: 'relative', pb: i < storyMilestones.length - 1 ? 4.5 : 0 }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: -28, sm: -36 },
                      top: 5,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: 'background.default',
                      border: `3px solid ${i === storyMilestones.length - 1 ? colors.pink : colors.charcoal}`,
                    }}
                  />
                  <Typography
                    variant="overline"
                    component="p"
                    sx={{ color: colors.darkPink, fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1.6 }}
                  >
                    {milestone.year}
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ mb: 0.75 }}>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560 }}>
                    {milestone.body}
                  </Typography>
                </Box>
              ))}
            </Box>
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
                top: { md: 96 },
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
                  sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', letterSpacing: '0.1em' }}
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
          py: { xs: 8, md: 10 },
          bgcolor: 'background.paper',
          borderTop: '1.5px solid',
          borderBottom: '1.5px solid',
          borderColor: 'divider',
        }}
      >
        <Container>
          <SectionHeading eyebrow="Values" title="What We Care About" />
          <Grid container spacing={3}>
            {values.map((value, i) => (
              <Grid item xs={12} md={4} key={value.title}>
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 3, md: 3.5 },
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderTop: `4px solid ${value.accent}`,
                    borderRadius: `${RADIUS}px`,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: '"Fraunces", serif', fontSize: '0.95rem', color: 'text.secondary', mb: 1.5 }}
                  >
                    0{i + 1}
                  </Typography>
                  <Typography variant="h4" component="h3" sx={{ mb: 1.25 }}>
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

      <Container sx={{ pt: { xs: 8, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <SectionHeading
          eyebrow="Leadership"
          title="Our Team"
          intro="SASComm is organized into four branches. Each is run by a director or two, with officers helping plan and staff the work week to week. A couple of roles sit outside the branches."
        />

        {teamSections.map((section) => {
          const sectionDirectors = directors.filter((member) => member.committee === section.committee);
          const sectionOfficers = officers.filter((member) => member.committee === section.committee);
          const count = sectionDirectors.length + sectionOfficers.length;
          if (count === 0) return null;
          const accent = committeeAccent[section.committee];

          return (
            <Box component="section" key={section.committee} sx={{ mb: { xs: 7, md: 9 } }}>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="space-between"
                spacing={2}
                sx={{ pb: 1.5, mb: section.blurb ? 2 : 3, borderBottom: `2px solid ${accent}` }}
              >
                <Box>
                  <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.6rem', md: '2rem' } }}>
                    {section.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                    {section.focus}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', pb: 0.25 }}>
                  {count} {count === 1 ? 'person' : 'people'}
                </Typography>
              </Stack>
              {section.blurb && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
                  {section.blurb}
                </Typography>
              )}

              {sectionDirectors.length > 0 && (
                <Box sx={{ mb: sectionOfficers.length > 0 ? 3.5 : 0 }}>
                  <TierLabel>{sectionDirectors.length === 1 ? 'Director' : 'Directors'}</TierLabel>
                  <Grid container spacing={2}>
                    {sectionDirectors.map((member) => (
                      <Grid item xs={12} sm={6} md={4} key={member.email}>
                        <DirectorCard member={member} accent={accent} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {sectionOfficers.length > 0 && (
                <>
                  <TierLabel>Officers</TierLabel>
                  <Grid container spacing={2}>
                    {sectionOfficers.map((member) => (
                      <Grid item xs={6} sm={4} md={2} key={member.email}>
                        <OfficerCard member={member} accent={accent} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
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
            Fall 2026 lead applications have closed. Read through the Lead page to see what the branches do, or
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
