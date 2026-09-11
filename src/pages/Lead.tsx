import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  Campaign,
  Diversity3,
  EventAvailable,
  Groups,
  Lightbulb,
  VolunteerActivism,
  WorkspacePremium,
} from '@mui/icons-material';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Fragment } from 'react';
import {
  leadBenefits,
  leadBranches,
  leadApplicationSteps,
  leadRecruitingFacts,
  BenefitIconKey,
  ApplicationStepIconKey,
} from '../data/lead';
import { directors as leadershipDirectors } from '../data/leadership';
import { usePageTitle } from '../hooks/usePageTitle';

const applicationUrl = 'https://forms.gle/2vkFbNL3s8DxbCvi9';
const positionsUrl =
  'https://docs.google.com/document/d/1A-lNUm6g9DHF4C2DvHATFUrNFskGwxCy-GiSm9pe7YI/edit?usp=sharing';

const getBenefitIcon = (icon: BenefitIconKey) => {
  switch (icon) {
    case 'workspace':
      return <WorkspacePremium fontSize="large" color="inherit" />;
    case 'groups':
      return <Groups fontSize="large" color="inherit" />;
    case 'campaign':
      return <Campaign fontSize="large" color="inherit" />;
    default:
      return null;
  }
};

const getStepIcon = (icon: ApplicationStepIconKey) => {
  switch (icon) {
    case 'lightbulb':
      return <Lightbulb color="primary" />;
    case 'diversity':
      return <Diversity3 color="primary" />;
    case 'event':
      return <EventAvailable color="primary" />;
    case 'volunteer':
      return <VolunteerActivism color="primary" />;
    default:
      return null;
  }
};

const Lead = () => {
  usePageTitle('Lead');
  return (
    <Box>
      <PageHeader
        title="Lead with SASC"
        subtitle="SASC doesn't run itself. SASComm is the student leadership group that plans the programs, books the rooms, and keeps the day-to-day moving."
        image="/sascatnightmarket.webp"
        imagePosition="center 20%"
        lightOverlay
      >
        <Typography
          variant="body1"
          sx={{
            opacity: 0.9,
            maxWidth: 720,
            mt: 2,
            textShadow: '0 1px 10px rgba(0,0,0,0.45)',
          }}
        >
          We&apos;re recruiting for all four branches this fall: Internal, External, Ops, and PR. We read
          applications as they come in, so earlier is better. Due Friday, Sept. 25 at 11:59 p.m.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            href={applicationUrl}
            target="_blank"
            rel="noopener"
            sx={{
              color: 'primary.main',
              bgcolor: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
            }}
          >
            Apply now
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="#branches"
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
            See the branches
          </Button>
        </Stack>
      </PageHeader>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/fall26sascomm.webp"
              alt="Fall 2026 recruiting flyer: the Southeast Asian Student Coalition is recruiting for SASCommittee. Plan programs, work with SEA students, build community."
              width={1000}
              height={1250}
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: 440,
                height: 'auto',
                mx: 'auto',
                borderRadius: 3,
                boxShadow: (theme) => theme.shadows[6],
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              Fall 2026 recruiting
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
              Applications are open for every branch. We read them as they come in and reach out to schedule
              interviews, so applying early helps. Not sure yet? Come to the info session and ask us anything.
            </Typography>
            <Box
              component="dl"
              sx={{
                m: 0,
                mb: 3,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '160px 1fr' },
                columnGap: 3,
                rowGap: { xs: 0.25, sm: 1.5 },
              }}
            >
              {leadRecruitingFacts.map((fact, i) => (
                <Fragment key={fact.label}>
                  <Typography
                    component="dt"
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mt: { xs: i === 0 ? 0 : 1.25, sm: 0 } }}
                  >
                    {fact.label}
                  </Typography>
                  <Typography component="dd" variant="body1" color="text.secondary" sx={{ m: 0 }}>
                    {fact.value}
                  </Typography>
                </Fragment>
              ))}
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" color="primary" href={applicationUrl} target="_blank" rel="noopener">
                Apply now
              </Button>
              <Button variant="outlined" color="primary" href={positionsUrl} target="_blank" rel="noopener">
                Read the position descriptions
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
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
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h4">
                What it&apos;s like
              </Typography>
              <Typography variant="body1" color="text.secondary">
                SASC feels like home because people show up, especially when it’s messy. We have wellness nights when people are burnt
                out, pull together teach-ins when something happens, and check in off the agenda to make sure folks are doing okay.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Most officers didn&apos;t have experience running an org before this. Our alumni include educators, organizers, policy
                advocates, and creatives who still stay involved and mentor us, and we try to offer that same care to new members.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                As a coalition, we host SEAsgiving with alumni, run history workshops, meet with other orgs for shared planning, and
                put on cultural events like Night Market and SEACF. For a clearer picture of what a year looks like,{' '}
                <Button
                  variant="text"
                  color="primary"
                  href="/events"
                  sx={{ p: 0, minWidth: 0, textTransform: 'none', fontWeight: 600 }}
                >
                  browse our event archive
                </Button>
                .
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Why Lead with SASC
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 3 }}>
          Some weeks you&apos;re printing flyers or lining up volunteers. Other weeks you&apos;re cooking for
          SEAsgiving or dealing with whatever just hit campus.
        </Typography>
        <Grid container spacing={3}>
          {leadBenefits.map((benefit) => (
            <Grid item xs={12} md={4} key={benefit.title}>
              <Card
                sx={{
                  height: '100%',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
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
                  {getBenefitIcon(benefit.icon)}
                </Box>
                <Typography variant="h5" component="h3">
                  {benefit.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container id="branches" sx={{ mb: 8, scrollMarginTop: 96 }}>
        <Typography variant="h4" gutterBottom>
          Ways to Lead
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 760 }}>
          All four branches are recruiting for Fall 2026. Most weeks are about 5 hours: branch meeting, SASComm,
          and prep. Big events take more. Email a director if you want details on a specific branch.
        </Typography>
        <Grid container spacing={4}>
          {leadBranches.map((branch) => {
            const branchDirectors = leadershipDirectors.filter(
              (member) => member.committee === branch.committee
            );

            return (
            <Grid item xs={12} md={6} key={branch.name}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                        {branch.name}
                      </Typography>
                      <Chip
                        label={branch.focus}
                        color="primary"
                        variant="outlined"
                        sx={{ mt: 1, fontWeight: 500 }}
                      />
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {branch.overview}
                    </Typography>
                      <Box
                        component="img"
                        src={branch.image}
                        alt={`${branch.name} moments`}
                        sx={{
                          width: '100%',
                          borderRadius: 2,
                          objectFit: 'cover',
                          height: { xs: 180, sm: 210 },
                          boxShadow: (theme) => theme.shadows[3],
                          objectPosition: 'center 40%',
                        }}
                      />
                      {branchDirectors.length > 0 && (
                        <Box>
                          <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Directors
                          </Typography>
                          <Stack spacing={0.5}>
                            {branchDirectors.map((director) => (
                              <Typography key={director.email} variant="body2" color="text.secondary">
                                {director.name} • {director.email.replace('@', ' AT ')}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>
                      )}
                      {branch.keyFocus.length > 0 && (
                        <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Includes
                        </Typography>
                        <Box
                          component="ul"
                          sx={{
                            pl: 2,
                            mt: 0,
                            display: 'grid',
                            gap: 0.75,
                            listStyleType: 'disc',
                          }}
                        >
                            {branch.keyFocus.map((bullet) => (
                            <Typography
                              component="li"
                              variant="body2"
                              color="text.secondary"
                              key={bullet}
                              sx={{ listStyleType: 'inherit' }}
                            >
                              {bullet}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                      )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            );
          })}
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          How to apply
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
          Read the{' '}
          <Button
            variant="text"
            color="primary"
            href={positionsUrl}
            target="_blank"
            rel="noopener"
            sx={{ p: 0, minWidth: 0, textTransform: 'none', fontWeight: 600 }}
          >
            position descriptions
          </Button>{' '}
          to see what each role does, then{' '}
          <Button
            variant="text"
            color="primary"
            href={applicationUrl}
            target="_blank"
            rel="noopener"
            sx={{ p: 0, minWidth: 0, textTransform: 'none', fontWeight: 600 }}
          >
            apply here
          </Button>
          .
        </Typography>
        <Grid container spacing={3}>
          {leadApplicationSteps.map((step) => (
            <Grid item xs={12} md={6} key={step.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    {getStepIcon(step.icon)}
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {step.detail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Card sx={{ p: { xs: 3, md: 5 }, backgroundColor: 'rgba(33, 150, 243, 0.08)' }}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Questions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Not sure which branch fits, or how much time it takes? Come to the info session at our GM on Sept. 17,
              DM @ucbsasc, or email one of the directors listed above.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                href={applicationUrl}
                target="_blank"
                rel="noopener"
              >
                Apply now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href="https://www.instagram.com/ucbsasc"
                target="_blank"
                rel="noopener"
              >
                DM @ucbsasc
              </Button>
              <Button variant="outlined" color="primary" href="/contact">
                Contact a director
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Container>

      <Footer />
    </Box>
  );
};

export default Lead;
