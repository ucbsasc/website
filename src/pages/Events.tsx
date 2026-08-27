import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import MailingListModal from '../components/MailingListModal';
import { usePageTitle } from '../hooks/usePageTitle';
import GeneralMeeting from '../components/events/GeneralMeeting';
import NightMarket from '../components/events/NightMarket';
import SEAGrad from '../components/events/SEAGrad';
import SEAPicnic from '../components/events/SEAPicnic';
import SEAGrad26 from '../components/events/SEAGrad26';
import ProfessionalHeadshots from '../components/events/ProfessionalHeadshots';
import HalloweenMovieNight from '../components/events/HalloweenMovieNight';
import ProfessionalHeadshotsOct1Past from '../components/events/ProfessionalHeadshotsOct1Past';
import SEAHistoryWorkshop from '../components/events/SEAHistoryWorkshop';
import AnniversaryRecap from '../components/events/AnniversaryRecap';
import UpcomingGeneralMeeting from '../components/events/UpcomingGeneralMeeting';
import BondingEventPreview from '../components/events/BondingEventPreview';
import ProfessionalHeadshotsFeb2026 from '../components/events/ProfessionalHeadshotsFeb2026';
import GameNight from '../components/events/GameNight';
import TasteOfSeaNightMarket from '../components/events/TasteOfSeaNightMarket';
import ResumeWorkshop from '../components/events/ResumeWorkshop';
import SEASO from '../components/events/SEASO';

const Events = () => {
  usePageTitle('Events');
  const [mailingListOpen, setMailingListOpen] = useState(false);

  const upcomingEvents: { date: Date; key: string; render: () => JSX.Element }[] = [
    { date: new Date('2026-09-03T16:00:00-07:00'), key: 'seaso-2026', render: () => <SEASO /> },
  ];

  const pastEvents: { date: Date; key: string; render: () => JSX.Element }[] = [
    { date: new Date('2026-05-09T18:00:00-07:00'), key: 'seagrad-2026', render: () => <SEAGrad26 /> },
    { date: new Date('2026-04-29T17:00:00-07:00'), key: 'seapicnic-2026', render: () => <SEAPicnic /> },
    { date: new Date('2026-04-06T18:00:00-07:00'), key: 'nightmarket-2026', render: () => <TasteOfSeaNightMarket /> },
    { date: new Date('2026-04-01T18:00:00-07:00'), key: 'resume-workshop-2026-04-01', render: () => <ResumeWorkshop /> },
    { date: new Date('2026-03-11T19:00:00-08:00'), key: 'game-night-2026', render: () => <GameNight /> },
    { date: new Date('2026-02-21T18:30:00-08:00'), key: 'bonding-2026', render: () => <BondingEventPreview /> },
    { date: new Date('2026-02-10T19:00:00-08:00'), key: 'gm-2026-spring', render: () => <UpcomingGeneralMeeting /> },
    { date: new Date('2026-02-06T14:00:00-08:00'), key: 'headshots-feb-2026', render: () => <ProfessionalHeadshotsFeb2026 /> },
    { date: new Date('2025-11-12T19:00:00-08:00'), key: 'anniv-2025', render: () => <AnniversaryRecap /> },
    { date: new Date('2025-10-28T19:00:00-07:00'), key: 'sea-history-2025', render: () => <SEAHistoryWorkshop /> },
    { date: new Date('2025-10-24T19:00:00-07:00'), key: 'halloween-2025', render: () => <HalloweenMovieNight /> },
    { date: new Date('2025-10-01T15:00:00-07:00'), key: 'headshots-2025-10-01', render: () => <ProfessionalHeadshotsOct1Past /> },
    { date: new Date('2024-09-17T20:00:00-07:00'), key: 'gm-2024', render: () => <GeneralMeeting /> },
    { date: new Date('2025-05-07T00:00:00-07:00'), key: 'headshots-may-2025', render: () => <ProfessionalHeadshots /> },
    { date: new Date('2025-05-15T00:00:00-07:00'), key: 'seagrad-2025', render: () => <SEAGrad /> },
    { date: new Date('2025-04-20T00:00:00-07:00'), key: 'nightmarket-2025', render: () => <NightMarket /> },
  ];

  upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  pastEvents.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Public programs, general meetings, and cultural nights. Archive below for what we ran this past year."
        image="/nightmarket-14.jpg"
        compact
      />

      <Container sx={{ pb: 8 }}>
        {upcomingEvents.length > 0 ? (
          <Box sx={{ display: 'contents' }}>
            {upcomingEvents.map((ev) => (
              <Box key={ev.key}>{ev.render()}</Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              mb: 4,
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 700, fontSize: '1.35rem' }}>
              Between school years
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 680 }}>
              Our 2025–26 public programming has wrapped. Fall dates for general meetings, cultural programs, and
              involvement opportunities will be posted here once rooms and partners are confirmed. Until then, Instagram
              and the mailing list are the best places to watch.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 680 }}>
              Looking for what we ran last year? Open the archive below for SEAGrad, Night Market, workshops, and more.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" href="https://www.instagram.com/ucbsasc" target="_blank" rel="noopener">
                Follow @ucbsasc
              </Button>
              <Button variant="outlined" onClick={() => setMailingListOpen(true)}>
                Become a General Member
              </Button>
              <Button variant="text" href="/lead">
                Lead with SASC
              </Button>
            </Stack>
          </Box>
        )}

        <Accordion defaultExpanded={false} disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent event archive
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            {pastEvents.map((ev) => (
              <Box key={ev.key}>{ev.render()}</Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Container>
      <Footer />
      <MailingListModal open={mailingListOpen} onClose={() => setMailingListOpen(false)} />
    </>
  );
};

export default Events;
