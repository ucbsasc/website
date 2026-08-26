import { Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const UpcomingGeneralMeeting = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            image={{ src: '/internal.webp', alt: 'SASC General Meeting' }}
        >
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                Spring General Meeting
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                February 10, 2026 • Evening
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                We lined up agenda items, speakers, and community announcements for our first general meeting of the new term. Expect
                updates from every branch, space to connect with fellow members, and a sneak peek at upcoming programs.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Members heard branch updates, reconnected after break, and got a preview of spring programs.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button variant="outlined" disabled startIcon={<CalendarMonthIcon />}>
                    Event Ended
                </Button>
            </Stack>
        </EventCard>
    );
};

export default UpcomingGeneralMeeting;
