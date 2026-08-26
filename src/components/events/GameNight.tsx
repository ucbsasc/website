import { Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const GameNight = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            image={{ src: '/jeopardy.webp', alt: 'Game Night' }}
        >
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                Game Night
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                March 11, 2026 • 7:00 PM - 8:00 PM • Wheeler 202
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                We had a fun night of Southeast Asian themed Jeopardy and games! Milk tea was provided!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Thanks for coming to hang out, meet new people, and test your trivia skills!
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button variant="outlined" disabled startIcon={<CalendarMonthIcon />}>
                    Event Ended
                </Button>
            </Stack>
        </EventCard>
    );
};

export default GameNight;
