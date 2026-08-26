import { Stack, Typography, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const ProfessionalHeadshotsOct1Past = () => {
  const location = 'In front of Doe Library';
  const dateLine = 'Wednesday, October 1 • 3:00 PM – 5:00 PM';

  return (
    <EventCard
      statusLabel="PAST EVENT"
      statusBgColor="text.disabled"
      borderColor="divider"
      cardSx={{ opacity: 0.9 }}
      image={{ src: '/fhs.webp', alt: 'Free Professional Headshots' }}
    >
            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
              Free Professional Headshots
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {dateLine}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Location: {location}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
        Swing by for free professional headshots hosted by SASC PR & Media. We’ll have a simple queue, on-site posing tips, and edited
        photos delivered to your inbox after the shoot.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button variant="outlined" size="small" startIcon={<CalendarMonthIcon />} disabled>
                Add to Calendar
              </Button>
            </Stack>
    </EventCard>
  );
};

export default ProfessionalHeadshotsOct1Past;


