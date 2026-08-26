import { Stack, Typography, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventCard from './EventCard';

const TasteOfSeaNightMarket = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="grey.700"
            borderColor="divider"
            minMediaHeight={500}
            maxMediaHeight={600}
            image={{ 
                src: '/nightmarketflyer.webp', 
                alt: 'Taste of Sea Night Market', 
                sx: { objectPosition: 'bottom center' } 
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 800, letterSpacing: '-0.02em' }}>
                        Taste of Sea Night Market
                    </Typography>
                    
                    <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                        <Chip 
                            icon={<AccessTimeIcon />} 
                            label="April 6, 2026 • 6:00 PM - 9:00 PM" 
                            color="primary" 
                            variant="outlined" 
                            sx={{ mb: 1 }}
                        />
                        <Chip 
                            icon={<LocationOnIcon />} 
                            label="Lower Sproul Plaza" 
                            color="primary" 
                            variant="outlined"
                            sx={{ mb: 1 }}
                        />
                    </Stack>

                    <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Our annual Taste of Sea Night Market brought the community together for an evening filled with Southeast Asian
                        culture, food, and performances.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                        Southeast Asian RSOs, vendors, performers, and community members helped showcase the diversity and pride of our
                        community.
                    </Typography>

                    <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2, borderLeft: 4, borderColor: 'primary.main' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
                            Community Showcase
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Vendor and performer sign-ups are now closed. Details for the next Night Market cycle will be shared when
                            planning opens.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                            Thank you to everyone who showed up, performed, sold food and merch, and supported SEA student organizations.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </EventCard>
    );
};

export default TasteOfSeaNightMarket;
