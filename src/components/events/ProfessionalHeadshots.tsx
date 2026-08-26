import { Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCard from './EventCard';

const ProfessionalHeadshots = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="text.disabled"
            borderColor="divider"
            cardSx={{ opacity: 0.9 }}
            image={{ src: '/headshots.webp', alt: 'Professional Headshots' }}
        >
                            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                                Professional Headshots
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                May 7, 2025
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                Free professional headshots for students to refresh their LinkedIn, resumes, and portfolios. Our media squad will guide
                you through poses and lighting so you walk away with polished shots.
                            </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            justifyContent="flex-start"
                            sx={{ mb: 2 }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Professional+Headshots&dates=20250507T000000Z/20250507T010000Z&details=Free+professional+headshots+for+students+to+update+their+LinkedIn,+resumes,+and+portfolios.&location=UC+Berkeley"
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

export default ProfessionalHeadshots; 