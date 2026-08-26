import { Box, Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const ProfessionalHeadshotsFeb2026 = () => {
  const title = 'Free Professional Headshots/Portraits';
  const location = 'Doe Library Entrance';
  const details = 'SASC hosted free professional headshots and portraits for students updating LinkedIn profiles, resumes, portfolios, or personal photos.';
  
  return (
    <EventCard
      statusLabel="PAST EVENT"
      statusBgColor="text.disabled"
      borderColor="divider"
      image={{ src: '/headshots-feb6.webp', alt: 'Free Professional Headshots Flyer' }}
    >
      <Box>
        <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Friday, February 6th • 2:00 PM – 5:00 PM
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Location: {location}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {details}
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>What to know</Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <li><Typography variant="body2">Free and open to all students</Typography></li>
            <li><Typography variant="body2">Meet at the Doe Library Entrance</Typography></li>
            <li><Typography variant="body2">Edited photos were shared with attendees after the session</Typography></li>
          </Box>
        </Box>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2 }}>
        <Button variant="outlined" disabled startIcon={<CalendarMonthIcon />}>
          Event Ended
        </Button>
      </Stack>
    </EventCard>
  );
};

export default ProfessionalHeadshotsFeb2026;
