import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Fragment } from 'react';
import { leadBranches, leadApplicationSteps, leadRecruitingFacts } from '../data/lead';
import { directors as leadershipDirectors } from '../data/leadership';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors } from '../theme/colors';
import { MaskingTape } from '../components/brand';

/** Inline text link: ink with a pink underline (pink text is too faint on the light page). */
const inlineLinkSx = {
  p: 0,
  minWidth: 0,
  verticalAlign: 'baseline',
  font: 'inherit',
  fontWeight: 700,
  color: colors.ink,
  textDecoration: 'underline',
  textDecorationColor: colors.pink,
  textDecorationThickness: 2,
  textUnderlineOffset: 3,
  boxShadow: 'none',
  '&:hover': { bgcolor: 'transparent', textDecorationThickness: 3 },
};

const framedImageSx = {
  display: 'block',
  border: `2px solid ${colors.ink}`,
};

const positionsUrl =
  'https://docs.google.com/document/d/1A-lNUm6g9DHF4C2DvHATFUrNFskGwxCy-GiSm9pe7YI/edit?usp=sharing';

const Lead = () => {
  usePageTitle('Lead');
  return (
    <Box>
      <PageHeader
        title="Lead with SASC"
        subtitle="SASComm is the student board behind SASC. Officers plan the programs, book rooms, and chase down reimbursements."
        image="/sascatnightmarket.webp"
        imagePosition="center 20%"
        lightOverlay
      >
        <Typography
          variant="body1"
          sx={{
            color: colors.textOnBlack,
            fontWeight: 500,
            maxWidth: 720,
            mt: 2,
            textShadow: '0 1px 2px rgba(20,16,18,0.6)',
          }}
        >
          Fall 2026 applications closed Friday, Oct. 2. We post on @ucbsasc when the next round opens.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="#branches"
            sx={{
              borderColor: colors.textOnBlack,
              color: colors.textOnBlack,
              '&:hover': { borderColor: colors.textOnBlack, bgcolor: 'rgba(247,240,230,0.1)' },
            }}
          >
            See the branches
          </Button>
        </Stack>
      </PageHeader>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative', maxWidth: 440, mx: 'auto' }}>
            <MaskingTape corner="top" width={96} />
            <Box
              component="img"
              src="/updatedleadershipflyer.jpeg"
              alt="Fall 2026 recruiting flyer: the Southeast Asian Student Coalition is recruiting for SASCommittee. Plan programs, work with SEA students, build community."
              width={1000}
              height={1250}
              sx={{
                ...framedImageSx,
                width: '100%',
                height: 'auto',
              }}
            />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              Fall 2026 recruiting
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
              Applications are closed and interviews are being scheduled. If you want to apply next time, a
              director can tell you what their branch is like.
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
              <Button variant="contained" color="primary" href={positionsUrl} target="_blank" rel="noopener">
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
              alt="SASC members posing together as a big group indoors"
              sx={{
                ...framedImageSx,
                width: '100%',
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
                People here show up for each other. We run wellness nights when everyone&apos;s burnt out and put
                teach-ins together when something happens on campus, and a lot of the checking in happens outside
                meetings.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Most officers had never run an org before joining. Alumni still come back to help the board out, and
                we try to do the same for whoever joins after us.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A normal year has SEAsgiving with alumni, a history workshop or two, Night Market, SEACF, and a lot of
                planning meetings with other SEA orgs. For the full list,{' '}
                <Button variant="text" href="/events" disableRipple sx={inlineLinkSx}>
                  see the event archive
                </Button>
                .
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          What the work looks like
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2 }}>
          Some weeks you&apos;re printing flyers or lining up volunteers. Other weeks you&apos;re cooking for
          SEAsgiving or dealing with whatever just hit campus.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          You plan with your branch and sit in on SASComm, where the board decides what we&apos;re doing and who&apos;s
          paying for it. Plenty of people stay close with their board after they graduate.
        </Typography>
      </Container>

      <Container id="branches" sx={{ mb: 8, scrollMarginTop: 96 }}>
        <Typography variant="h4" gutterBottom>
          The branches
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 760 }}>
          Most weeks are about 5 hours between your branch meeting, SASComm, and prep. Big events like Night Market
          take more. Email a director if you want specifics.
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
                      <Typography variant="h5" component="h3" sx={{ mb: 0.5 }}>
                        {branch.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {branch.focus}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {branch.overview}
                    </Typography>
                      <Box
                        component="img"
                        src={branch.image}
                        alt={`${branch.name} moments`}
                        sx={{
                          display: 'block',
                          width: '100%',
                          objectFit: 'cover',
                          height: { xs: 180, sm: 210 },
                          border: `1.5px solid ${colors.ink}`,
                          objectPosition: 'center 40%',
                        }}
                      />
                      {branchDirectors.length > 0 && (
                        <Box>
                          <Typography variant="overline" component="p" sx={{ color: colors.ink, mb: 0.5 }}>
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
                        <Typography variant="overline" component="p" sx={{ color: colors.ink, mb: 0.5 }}>
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
          <Button variant="text" href={positionsUrl} target="_blank" rel="noopener" disableRipple sx={inlineLinkSx}>
            position descriptions
          </Button>{' '}
          first. This is how it went for Fall 2026, and it&apos;s usually about the same.
        </Typography>
        <Box component="ol" sx={{ m: 0, pl: 3, maxWidth: 760 }}>
          {leadApplicationSteps.map((step) => (
            <Box component="li" key={step.title} sx={{ mb: 2, pl: 0.5 }}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
                {step.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {step.detail}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Container sx={{ mb: 8 }}>
        <Card sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={2}>
            <Typography variant="h5">
              Questions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              DM @ucbsasc or email one of the directors above. They&apos;ll tell you honestly how much time it takes.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
              <Button
                variant="contained"
                color="primary"
                href="https://www.instagram.com/ucbsasc"
                target="_blank"
                rel="noopener"
              >
                DM @ucbsasc
              </Button>
              <Button variant="outlined" href="/contact">
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
