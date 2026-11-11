import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import MailingListModal from '../components/MailingListModal';
import { usePageTitle } from '../hooks/usePageTitle';
import { pastEvents, PastEvent } from '../data/pastEvents';
import { colors } from '../theme/colors';
import { LabelTape } from '../components/brand';
import SeasgivingNov2026 from '../components/events/SeasgivingNov2026';

const ArchiveRow = ({ event }: { event: PastEvent }) => (
  <Box
    component="li"
    sx={{
      display: 'flex',
      gap: { xs: 2, sm: 3 },
      py: { xs: 2.5, md: 3 },
      borderTop: `1.5px solid ${colors.ink}`,
    }}
  >
    <Box sx={{ width: { xs: 72, sm: 104 }, flexShrink: 0 }}>
      {event.image && (
        <Box
          component="img"
          src={event.image.src}
          alt={event.image.alt}
          loading="lazy"
          sx={{
            display: 'block',
            width: '100%',
            aspectRatio: '4 / 5',
            objectFit: 'cover',
            border: `1.5px solid ${colors.ink}`,
            bgcolor: colors.paper,
          }}
        />
      )}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="body2"
        sx={{ color: colors.ink, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.8rem' }}
      >
        {event.date}
        {event.location ? ` · ${event.location}` : ''}
      </Typography>
      <Typography variant="h5" component="h4" sx={{ mt: 0.5, mb: 0.75 }}>
        {event.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
        {event.summary}
      </Typography>
    </Box>
  </Box>
);

const Events = () => {
  usePageTitle('Events');
  const [mailingListOpen, setMailingListOpen] = useState(false);

  // Upcoming events get their own card component in components/events (see EventCard).
  // Once one is over, delete it from here and add a short entry to data/pastEvents.ts.
  const upcomingEvents: { key: string; render: () => JSX.Element }[] = [
    { key: 'seasgiving-2026', render: () => <SeasgivingNov2026 /> },
  ];

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="New events go up here once rooms are booked. Everything we’ve run since spring 2025 is further down."
        image="/nightmarket-14.jpg"
        compact
      />
      <Container sx={{ pb: { xs: 8, md: 10 } }}>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((ev) => <Box key={ev.key}>{ev.render()}</Box>)
        ) : (
          <Box
            sx={{
              mb: { xs: 7, md: 9 },
              p: { xs: 2.5, md: 3.5 },
              border: `2px solid ${colors.ink}`,
              boxShadow: `4px 4px 0 ${colors.ink}`,
              bgcolor: colors.paper,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
              Nothing on the calendar right now
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 640 }}>
              We post GMs and events on Instagram first. The mailing list gets GM dates and application
              deadlines.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" href="https://www.instagram.com/ucbsasc" target="_blank" rel="noopener">
                Follow @ucbsasc
              </Button>
              <Button variant="outlined" onClick={() => setMailingListOpen(true)}>
                Join the mailing list
              </Button>
            </Stack>
          </Box>
        )}

        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>
          Past events
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 4, md: 5 } }}>
          Flyers and recaps from what we’ve run, newest first.
        </Typography>

        {pastEvents.map((year) => (
          <Box component="section" key={year.label} sx={{ mb: { xs: 5, md: 6 } }}>
            <LabelTape component="h3" color="black" tilt={year.label.length % 2 ? -1.5 : 1.5} sx={{ m: 0, mb: 2 }}>
              {year.label}
            </LabelTape>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {year.events.map((event) => (
                <ArchiveRow key={`${event.title}-${event.date}`} event={event} />
              ))}
            </Box>
          </Box>
        ))}
      </Container>
      <Footer />
      <MailingListModal open={mailingListOpen} onClose={() => setMailingListOpen(false)} />
    </>
  );
};

export default Events;
