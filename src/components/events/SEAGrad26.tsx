import { Typography } from '@mui/material';
import EventCard from './EventCard';

const SEAGrad26 = () => {
    return (
        <EventCard
            statusLabel="PAST EVENT"
            statusBgColor="grey.700"
            borderColor="divider"
            minMediaHeight={500}
            maxMediaHeight={600}
            image={{ src: '/seagrad26.webp', alt: 'Southeast Asian Graduation 2026', sx: { objectFit: 'contain', objectPosition: 'center', bgcolor: 'black' } }}
        >
            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                Class of 2026 - UC Berkeley SEAGrad
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                May 9, 2026 • 6:00 PM - 8:00 PM PDT
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                SEAGrad is an annual ceremony hosted by SASC that celebrates graduating Southeast Asian students within the UC Berkeley
                community. The Class of 2026 ceremony brought graduates, families, friends, and community members together for cultural
                recognition and celebration.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Registration for this ceremony has closed. Details for the next SEAGrad cycle will be shared once planning begins.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontSize: '0.8rem', color: 'text.secondary' }}>
                Cap and gown rental reimbursements were available for eligible first-generation and low-income graduates while funds lasted.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Location: 1 Alumni House<br />
                Berkeley, CA 94720
            </Typography>
        </EventCard>
    );
};

export default SEAGrad26;
