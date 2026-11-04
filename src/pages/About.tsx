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
import { colors } from '../theme/colors';
import { pinkPaper } from '../theme/textures';
import { LabelTape, MaskingTape } from '../components/brand';

type TeamSection = {
  name: string;
  focus: string;
  committee: LeadershipCommittee;
  blurb?: string;
  /** Also list members from other branches whose role carries this tag. */
  tag?: string;
};

/** The four recruiting branches, plus the roles that sit outside them. */
const teamSections: TeamSection[] = [
  ...leadBranches.map(({ name, focus, committee }) => ({ name, focus, committee })),
  {
    name: 'SEAM',
    focus: 'Southeast Asian Mentorship',
    committee: 'SEAM',
    tag: 'SEAM',
  },
  {
    name: 'Legal & Policy Advocacy',
    focus: 'Policy, rights & advocacy',
    committee: 'Advocacy',
    blurb:
      'This one sits outside the branches. It keeps track of policy that affects Southeast Asian students, like immigration enforcement, data disaggregation, and financial aid, and brings in the branches when we need to respond to something.',
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
      'By 2005, members were tired of rebuilding the officer board from scratch every couple of years. SASComm splits the work across a whole table of people, so the org survives when the two or three people running it graduate.',
  },
  {
    year: 'Today',
    title: 'SEAM, SEASO, Night Market, SEAGrad',
    body:
      'The lineup shifts with each cohort, but most years it includes SEAM (mentorship), SEASO (orientation), SEACF and Night Market (culture, food, and a stage for SEA orgs), and SEAGrad (graduation). We also table on Sproul, cook for SEAsgiving, run history workshops, and try to keep alumni in the loop.',
  },
];

const SectionHeading = ({ title, intro }: { title: string; intro?: string }) => (
  <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 760 }}>
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

const Portrait = ({ member }: { member: LeadershipMember }) =>
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
        bgcolor: colors.scrapGrey,
        color: colors.ink,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        fontSize: '2.25rem',
      }}
    >
      {initials(member.name)}
    </Box>
  );

const RoleTags = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <Stack direction="row" spacing={0.75} sx={{ mt: 1 }}>
      {tags.map((tag, i) => (
        <LabelTape key={tag} color="pink" size="sm" tilt={i % 2 ? 1.5 : -1.5} sx={{ fontSize: '0.62rem', py: 0.35 }}>
          {tag}
        </LabelTape>
      ))}
    </Stack>
  ) : null;

const DirectorCard = ({ member }: { member: LeadershipMember }) => {
  const { title, tags } = splitRole(member.role);
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        bgcolor: colors.paper,
        border: `1.5px solid ${colors.ink}`,
      }}
    >
      <Box sx={{ width: { xs: 112, sm: 136 }, flexShrink: 0, borderRight: `1.5px solid ${colors.ink}` }}>
        <Portrait member={member} />
      </Box>
      <Box sx={{ p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Typography variant="h5" component="h4" sx={{ lineHeight: 1.2, mb: 0.5 }}>
          {member.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
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
            color: colors.ink,
            '&:hover': {
              bgcolor: 'transparent',
              textDecoration: 'underline',
              textDecorationColor: colors.pink,
              textDecorationThickness: 2,
              textUnderlineOffset: 4,
            },
          }}
        >
          Email
        </Button>
      </Box>
    </Box>
  );
};

const OfficerCard = ({ member }: { member: LeadershipMember }) => {
  const { title, tags } = splitRole(member.role);
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',
        bgcolor: colors.paper,
        border: `1.5px solid ${colors.ink}`,
      }}
    >
      <Box sx={{ borderBottom: `1.5px solid ${colors.ink}` }}>
        <Portrait member={member} />
      </Box>
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
              sx={{ mt: -0.5, mr: -0.75, color: colors.inkMuted, '&:hover': { color: colors.ink, bgcolor: colors.pink } }}
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
    sx={{ color: colors.ink, fontWeight: 700, letterSpacing: '0.18em', mb: 1.5 }}
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
          title="Our story"
          intro="The board changes every year, and so do the events. Since 2000 it’s been Southeast Asian students at Berkeley finding each other, learning our hxstories, and pushing the university for things it wasn’t going to offer on its own."
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
                  bgcolor: colors.ink,
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
                      top: 6,
                      width: 14,
                      height: 14,
                      bgcolor: i === storyMilestones.length - 1 ? colors.pink : colors.cream,
                      border: `2px solid ${colors.ink}`,
                    }}
                  />
                  <LabelTape
                    component="p"
                    color={i === storyMilestones.length - 1 ? 'pink' : 'black'}
                    size="sm"
                    tilt={i % 2 ? 1.5 : -1.5}
                    sx={{ m: 0, mb: 1.25 }}
                  >
                    {milestone.year}
                  </LabelTape>
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
                border: `2px solid ${colors.ink}`,
                bgcolor: colors.paper,
                position: { xs: 'relative', md: 'sticky' },
                top: { md: 96 },
              }}
            >
              <MaskingTape corner="tr" />
              <Box
                component="img"
                src="/alumni-tailgate.jpg"
                alt="SASC students and alumni at a 2026 tailgate, holding the coalition banner"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderBottom: `2px solid ${colors.ink}`,
                }}
              />
              <Box sx={{ px: { xs: 2, md: 2.5 }, py: 2 }}>
                <Typography
                  variant="overline"
                  sx={{ color: colors.ink, fontWeight: 700, display: 'block' }}
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
          pt: { xs: 8, md: 10 },
          pb: { xs: 6, md: 8 },
          bgcolor: colors.paper,
          borderTop: `2px solid ${colors.ink}`,
        }}
      >
        <Container>
          <SectionHeading
            title="Our team"
            intro="SASComm has four branches. Each one has a director or two, plus officers who help plan and staff things week to week. SEAM has its own team, and a few officers work on it alongside their branch. Legal & Policy Advocacy sits outside the branches."
          />

          {teamSections.map((section) => {
            const inSection = (member: LeadershipMember) =>
              member.committee === section.committee ||
              (!!section.tag && splitRole(member.role).tags.includes(section.tag));
            const sectionDirectors = directors.filter(inSection);
            const sectionOfficers = officers.filter(inSection);
            const count = sectionDirectors.length + sectionOfficers.length;
            if (count === 0) return null;
            
            return (
              <Box component="section" key={section.committee} sx={{ mb: { xs: 7, md: 9 } }}>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ pb: 1.5, mb: section.blurb ? 2 : 3, borderBottom: `2px solid ${colors.ink}` }}
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
                          <DirectorCard member={member} />
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
                          <OfficerCard member={member} />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
            );
          })}
        </Container>
      </Box>

      <Box
        sx={{
          ...pinkPaper,
          color: colors.ink,
          py: { xs: 7, md: 9 },
          borderTop: `2px solid ${colors.ink}`,
        }}
      >
        <Container sx={{ textAlign: { xs: 'left', md: 'center' } }}>
          <Typography variant="h3" sx={{ mb: 1.5, color: colors.ink }}>
            Get involved
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: colors.ink, maxWidth: 560, mx: { md: 'auto' } }}
          >
            Lead applications for Fall 2026 are closed. The Lead page explains what each branch does, and you can
            always email{' '}
            <Box component="strong" sx={{ color: colors.ink }}>
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
            <Button variant="contained" color="secondary" size="large" href="/lead">
              Lead with SASC
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="mailto:UCB.SASC@gmail.com?subject=Hello%20SASC"
            >
              Email Us
            </Button>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 0.5, sm: 3 }}
            justifyContent={{ md: 'center' }}
          >
            <Button component={RouterLink} to="/partners" sx={{ color: colors.ink }}>
              Community & Partners →
            </Button>
            <Button component={RouterLink} to="/#programs" sx={{ color: colors.ink }}>
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
