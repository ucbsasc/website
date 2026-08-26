import { Button, Stack, Typography, Box, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventCard from './EventCard';

const ResumeWorkshop = () => {
  const title = 'Resume Workshop';

  return (
    <EventCard
      statusLabel="PAST EVENT"
      statusBgColor="text.disabled"
      borderColor="divider"
      cardSx={{ opacity: 0.9 }}
      minMediaHeight={520}
      maxMediaHeight={640}
      image={{
        src: '/resume-workshop.webp',
        alt: 'Resume Workshop flyer',
        sx: { objectPosition: 'center' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 800, letterSpacing: '-0.02em' }}>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<AccessTimeIcon />}
              label="Wed, April 1, 2026 • 6:00 PM - 7:00 PM"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <Chip
              icon={<LocationOnIcon />}
              label="Wheeler 126"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          </Stack>

          <Typography variant="body1" sx={{ mb: 1.5, fontSize: '1.1rem', lineHeight: 1.6 }}>
            SASC held a free resume and job-search workshop led by our PR Director. Attendees brought resumes for constructive feedback on
            structure, bullet points, and what recruiters look for, plus tips on applying and following up.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
            Thanks to everyone who came out.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="outlined" disabled size="medium" startIcon={<CalendarMonthIcon />}>
              Event Ended
            </Button>
          </Stack>
        </Box>
      </Box>
    </EventCard>
  );
};

export default ResumeWorkshop;
