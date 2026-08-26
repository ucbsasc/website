import { Button, Stack, Typography, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EventCard from './EventCard';

const GeneralMeeting = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            cardSx={{ opacity: 0.9 }}
            image={{ src: '/internal.jpg', alt: 'SASC General Meeting' }}
        >
                            <Typography variant="h4" component="h2" sx={{ mb: 1, color: 'primary.main' }}>
                                SASC General Meeting
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                                September 17, 2025 • 8:00 PM - 9:00 PM
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
                                Our first general meeting of the semester covered:
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <GroupIcon color="primary" />
                                    <Typography variant="body2">
                                        Intros to SASC and what we do
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <GroupIcon color="primary" />
                                    <Typography variant="body2">
                                        Meeting people from other Southeast Asian organizations
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <CelebrationIcon color="primary" />
                                    <Typography variant="body2">
                                        Games and community bonding
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <RestaurantIcon color="primary" />
                                    <Typography variant="body2">
                                        Free food and refreshments
                                    </Typography>
                                </Stack>
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                                Location: TBA (Check our social media for updates)
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
                All students are welcome! Whether you&apos;re new to Berkeley or have been here for years,
                                come join our community and make new friends.
                            </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-start" sx={{ mb: 2 }}>
                <Button variant="outlined" disabled size="medium" startIcon={<CalendarMonthIcon />}>
                    Event Ended
                </Button>
                        </Stack>
        </EventCard>
    );
};

export default GeneralMeeting;
