import { Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const NightMarket = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            cardSx={{ opacity: 0.9 }}
            image={{ src: '/nightmarket-14.jpg', alt: 'Taste of Sea Night Market 2023' }}
        >
                            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                                Taste of Sea Night Market
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                March 14, 2025 • 7:00 PM - 10:00 PM
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                Taste of SEA is our annual night market with other Southeast Asian organizations, featuring food stalls and
                performances on Upper Sproul Plaza.
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                Come for dinner, stay for the performances, and bring friends.
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Location: Upper Sproul Plaza
                            </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            justifyContent="flex-start"
                            sx={{ mb: 2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Taste+of+SEA+Night+Market&dates=20250315T010000Z/20240315T050000Z&details=Join+us+for+an+evening+of+Southeast+Asian+culture,+cuisine,+and+performances!&location=Upper+Sproul+Plaza,+Berkeley,+CA"
                                target="_blank"
                                size="small"
                                startIcon={<CalendarMonthIcon />}
                                disabled
                            >
                                Add to Calendar
                            </Button>
                        </Stack>
        </EventCard>
    );
};

export default NightMarket;