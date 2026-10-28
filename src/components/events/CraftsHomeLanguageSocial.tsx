import { Box, Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const calendarHref =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent('Crafts + Home Language Social (SASC × VSA)')}` +
  '&dates=20261104T020000Z/20261104T040000Z' +
  `&details=${encodeURIComponent(
    'Tote bag decorating, slime making, snacks and drinks, and a short talk on how to relearn your home language. Free, no fluency needed. Hosted by SASC and VSA.'
  )}` +
  `&location=${encodeURIComponent('88 Dwinelle Hall, UC Berkeley')}`;

const CraftsHomeLanguageSocial = () => {
  return (
    <EventCard
      statusLabel="UPCOMING"
      statusBgColor="primary.main"
      borderColor="primary.main"
      minMediaHeight={500}
      maxMediaHeight={600}
      image={{
        src: '/crafts-home-language-social.webp',
        alt: 'Crafts + Home Language Social flyer, SASC × VSA: paint tote bags, make slime, Asian snacks, and a short talk on relearning your home language. Tuesday, November 3rd, 6–8 PM, Dwinelle 88.',
        sx: { objectFit: 'contain', objectPosition: 'center', bgcolor: 'black' },
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 0.5 }}>
        Crafts + Home Language Social
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
        Co-hosted with VSA
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Tuesday, November 3, 2026 · 6:00–8:00 PM · Dwinelle 88
      </Typography>

      <Typography variant="body1" sx={{ mb: 1.5 }}>
        SASC and VSA are cohosting a social with crafts from tote bag decorating to slime making. There will also be a
        short talk on how to relearn your home language. It’s completely free, snacks and drinks will be provided, and
        no fluency is needed. Come chill and meet the community!
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          What to expect
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <li>
            <Typography variant="body2">Tote bag decorating</Typography>
          </li>
          <li>
            <Typography variant="body2">Slime making</Typography>
          </li>
          <li>
            <Typography variant="body2">Asian snacks and drinks</Typography>
          </li>
          <li>
            <Typography variant="body2">A short talk on relearning the language your family speaks</Typography>
          </li>
        </Box>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexWrap="wrap" useFlexGap>
        <Button
          variant="contained"
          color="primary"
          href={calendarHref}
          target="_blank"
          rel="noopener"
          startIcon={<CalendarMonthIcon />}
        >
          Add to Calendar
        </Button>
        <Button variant="outlined" color="primary" href="https://www.instagram.com/ucbsasc" target="_blank" rel="noopener">
          Follow @ucbsasc
        </Button>
      </Stack>
    </EventCard>
  );
};

export default CraftsHomeLanguageSocial;
