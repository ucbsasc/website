import { Box, Button, Stack, Typography, TextField, Alert } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import { addEventRsvp } from '../../firebase/rsvps';
import { auth } from '../../firebase/config';
import { signInAnonymously } from 'firebase/auth';
import EventCard from './EventCard';

const SEAPicnic = () => {
  const isPast = true;
  const location = 'VLSB Lawn';
  const dateLine = 'Wednesday, April 29, 2026 • 5:00 PM – 7:00 PM';
  const details = 'Chill picnic event for us to have a SEA community hangout opportunity before finals hell! We will cater food (Secrets of Tiger Thai Sensory), have games, and activities. You do not have to be at the whole event but please do show out for the community for at least a bit!';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isFirebaseConfigured = Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    try {
      setSubmitting(true);
      if (!auth.currentUser) {
        try { await signInAnonymously(auth); } catch (authErr) {
          console.error('Anonymous auth failed:', authErr);
        }
      }
      await addEventRsvp('sea-picnic-2026-04-29', name.trim(), email.trim());
      setSuccess('Thanks! Your RSVP has been received. See you there! 🧺');
      setName('');
      setEmail('');
    } catch (err) {
      console.error('RSVP submit failed:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EventCard
      statusLabel={isPast ? 'PAST EVENT' : 'UPCOMING'}
      statusBgColor={isPast ? 'grey.700' : 'primary.main'}
      borderColor="primary.main"
      minMediaHeight={500}
      maxMediaHeight={600}
      image={{ src: '/seapicnic.webp', alt: 'SEA Community Picnic', sx: { objectFit: 'contain', objectPosition: 'center', bgcolor: 'black' } }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
        SEA Community Picnic
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {dateLine}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Location: {location}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {details}
      </Typography>

      <Box sx={{ mb: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>What to expect</Typography>
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <li><Typography variant="body2">Free catered food from Secrets of Tiger Thai Sensory</Typography></li>
          <li><Typography variant="body2">Fun games, activities, and a raffle!</Typography></li>
          <li><Typography variant="body2">A great chance to de-stress before finals</Typography></li>
        </Box>
      </Box>

      {!isPast && (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 1 }}>
          <Button 
            variant="outlined" 
            color="primary"
            size="small" 
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=SEA+Community+Picnic&dates=20260430T000000Z/20260430T020000Z&details=Chill+picnic+event+for+us+to+have+a+SEA+community+hangout+opportunity+before+finals+hell!+Free+catered+food,+games,+and+activities.&location=VLSB+Lawn,+UC+Berkeley"
            target="_blank"
            startIcon={<CalendarMonthIcon />}
          >
            Add to Calendar
          </Button>
        </Stack>
      )}

      {!isPast && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
            RSVP for the Picnic
          </Typography>
          {!isFirebaseConfigured && (
            <Alert severity="warning" sx={{ mb: 1.5 }}>
              RSVP temporarily unavailable. Site configuration is incomplete.
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                <TextField
                  label="Name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={submitting || !isFirebaseConfigured}
                fullWidth
              >
                {submitting ? 'Submitting…' : 'RSVP Now'}
              </Button>
            </Stack>
          </Box>

          {(success || error) && (
            <Box sx={{ mt: 1.5 }}>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          )}
        </Box>
      )}
    </EventCard>
  );
};

export default SEAPicnic;
