import { Button, Stack, Typography } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EventCard from './EventCard';

const BondingEventPreview = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            image={{ src: '/seasgivinggroup.webp', alt: 'SASC Community Bonding' }}
        >
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
                SASCommunity Bonding Night
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                February 21, 2026 • Location TBA
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Officers and members from every branch got together for games, storytelling, and food before midterms hit.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                It was a chance to catch up and talk through ideas for the rest of spring.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button
                    variant="outlined"
                    disabled
                    startIcon={<Diversity3Icon />}
                >
                    Event Ended
                </Button>
            </Stack>
        </EventCard>
    );
};

export default BondingEventPreview;
