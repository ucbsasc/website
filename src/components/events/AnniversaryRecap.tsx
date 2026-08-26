import { Typography } from '@mui/material';
import EventCard from './EventCard';

const AnniversaryRecap = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            cardSx={{ opacity: 0.95 }}
            image={{ src: '/seasgivinggroup.webp', alt: '25th Anniversary & SEAsgiving' }}
        >
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                25th Anniversary & SEAsgiving Celebration
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                November 12, 2025 • Clark Kerr Garden Room
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                SASC alumni and current members marked 25 years of the coalition with a SEAsgiving dinner, a raffle, and
                stories from across generations of members.
            </Typography>
            <Typography variant="body2" color="text.secondary">
                The night included alumni panels and a can drive for the SEA Community Center in San Francisco.
            </Typography>
        </EventCard>
    );
};

export default AnniversaryRecap;
