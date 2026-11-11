import { Box, Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const rsvpHref = 'https://docs.google.com/forms/d/e/1FAIpQLSfs97PmbcPaFUzp3gZmlVgqUkgPq6LGWsKxNuQLdzZEvDw10w/viewform';

const calendarHref =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent('SEAsgiving (SASC)')}` +
  '&dates=20261119T020000Z/20261119T050000Z' +
  `&details=${encodeURIComponent(
    'Free dinner and a social mixer. Can drive: bring canned food for raffle tickets. RSVP: ucbsasc.org/seasgiving'
  )}` +
  `&location=${encodeURIComponent('Wilkinson Room, Warring, Clark Kerr Campus, 2601 Warring St, Berkeley, CA')}`;

const SeasgivingNov2026 = () => {
  return (
    <EventCard
      statusLabel="UPCOMING"
      minMediaHeight={500}
      maxMediaHeight={600}
      image={{
        src: '/seasgiving26.webp',
        alt: 'SEAsgiving flyer: last year’s group photo in front of a big SEAsgiving title. Wednesday, November 18, 6–9 PM, CKC Warring Wilkinson Room. Free dinner, social mixer, and a can drive: bring cans for raffle tickets.',
        sx: { objectFit: 'contain', objectPosition: 'center', bgcolor: 'black' },
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 0.5 }}>
        SEAsgiving
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Wednesday, November 18, 2026 · 6:00–9:00 PM · CKC Warring, Wilkinson Room
      </Typography>

      <Typography variant="body1" sx={{ mb: 1.5 }}>
        Dinner is completely free, and there will be a social mixer so you can come chill and meet the community. We’re
        also running a can drive, so bring canned food to get raffle tickets. Please RSVP so we know how much food to get.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          What to expect
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <li>
            <Typography variant="body2">Free dinner</Typography>
          </li>
          <li>
            <Typography variant="body2">Social mixer</Typography>
          </li>
          <li>
            <Typography variant="body2">Can drive: bring canned food for raffle tickets</Typography>
          </li>
        </Box>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap" useFlexGap>
        <Button variant="contained" color="primary" href={rsvpHref} target="_blank" rel="noopener">
          RSVP
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href={calendarHref}
          target="_blank"
          rel="noopener"
          startIcon={<CalendarMonthIcon />}
        >
          Add to Calendar
        </Button>
      </Stack>
    </EventCard>
  );
};

export default SeasgivingNov2026;
