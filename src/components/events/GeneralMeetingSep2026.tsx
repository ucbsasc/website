import { Box, Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const calendarHref =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent('SASC Fall General Meeting')}` +
  '&dates=20260918T030000Z/20260918T040000Z' +
  `&details=${encodeURIComponent(
    'First SASC general meeting of the fall, plus an info session on leading with SASC. Free pandan waffles and bầu cua cá cọp / klah klouk / nam tao pu pla / hoo hey how. Lead applications due Fri, Sept. 25: https://ucbsasc.org/lead'
  )}` +
  `&location=${encodeURIComponent('120 Wheeler Hall, UC Berkeley')}`;

const GeneralMeetingSep2026 = () => {
  return (
    <EventCard
      statusLabel="UPCOMING"
      statusBgColor="primary.main"
      borderColor="primary.main"
      minMediaHeight={500}
      maxMediaHeight={600}
      image={{
        src: '/gen9-17.webp',
        alt: 'SASC General Meeting flyer: September 17, 8–9 PM, Wheeler 120. Free food and a social game.',
        sx: { objectFit: 'contain', objectPosition: 'center', bgcolor: 'black' },
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: 0.5 }}>
        Fall General Meeting
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
        + Lead with SASC info session
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Thursday, September 17, 2026 · 8:00–9:00 PM · Wheeler 120
      </Typography>

      <Typography variant="body1" sx={{ mb: 1.5 }}>
        Our first GM of the fall. Come meet SASC and other SEA students, eat some pandan waffles, and stick around for
        a round of bầu cua cá cọp, or klah klouk, nam tao pu pla, or hoo hey how, depending on who taught you.
      </Typography>

      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          What to expect
        </Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <li>
            <Typography variant="body2">Free pandan waffles</Typography>
          </li>
          <li>
            <Typography variant="body2">
              Bầu cua cá cọp (Vietnam), klah klouk (Cambodia), nam tao pu pla (Thailand), hoo hey how (Malaysia and
              Singapore): same dice game, different names
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              An info session on SASComm: what each branch does, what the workload looks like, and how to apply
            </Typography>
          </li>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fall 2026 lead applications are open for Internal, External, Ops, and PR and are due Friday, Sept. 25 @ 11:59
        p.m. Bring your questions.
      </Typography>

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
        <Button variant="outlined" color="primary" href="/lead">
          Lead with SASC
        </Button>
      </Stack>
    </EventCard>
  );
};

export default GeneralMeetingSep2026;
