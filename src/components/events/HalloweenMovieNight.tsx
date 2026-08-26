import { Box, Button, Stack, Typography, TextField, Alert } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import { addEventRsvp } from '../../firebase/rsvps';
import { auth } from '../../firebase/config';
import { signInAnonymously } from 'firebase/auth';
import EventCard from './EventCard';

const HalloweenMovieNight = () => {
  const isPast = true;
  const location = 'SOCS 60';
  const dateLine = 'Friday, October 24 • 7:30 PM – 10:00 PM';
  const details = 'SASC\'s Halloween movie night and optional costume party. We watched the horror comedy "Pee Mak" (not too scary), with free snacks and prizes for costumes. Free to attend.';

  // Oct 24, 2025 7:30–10 PM PT → 02:30Z–05:00Z on Oct 25

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
      await addEventRsvp('halloween-movie-night-2025-10-24', name.trim(), email.trim());
      setSuccess('Thanks! Your RSVP has been received. See you there! 🎃');
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
      statusBgColor="grey.700"
      borderColor="primary.main"
      image={{ src: '/halloween night.webp', alt: 'Halloween Movie Night' }}
    >
              <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                Halloween Movie Night + Costume Party
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
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>What to know</Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <li><Typography variant="body2">Watched "Pee Mak," a horror comedy that&apos;s not too scary</Typography></li>
                  <li><Typography variant="body2">Costume contest was optional, with prizes for anyone who dressed up</Typography></li>
                  <li><Typography variant="body2">Free snacks provided</Typography></li>
              </Box>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 1 }}>
              <Button variant="outlined" disabled size="small" startIcon={<CalendarMonthIcon />}>
                Event Ended
              </Button>
            </Stack>

            {!isPast && (
              <>
                {!isFirebaseConfigured && (
                  <Alert severity="warning" sx={{ mt: 1.5 }}>
                    RSVP temporarily unavailable. Site configuration is incomplete.
                  </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' } }}>
                      <TextField
                        label="Name"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                          '& .MuiInputBase-input': { py: 0.5, fontSize: '0.9rem' },
                          '& .MuiInputLabel-root': { fontSize: '0.875rem' }
                        }}
                      />
                      <TextField
                        label="Email"
                        type="email"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                          '& .MuiInputBase-input': { py: 0.5, fontSize: '0.9rem' },
                          '& .MuiInputLabel-root': { fontSize: '0.875rem' }
                        }}
                      />
              <Button type="submit" variant="contained" color="primary" disabled={submitting || !isFirebaseConfigured}>
                        {submitting ? 'Submitting…' : 'RSVP'}
                      </Button>
            </Box>
                </Box>

                {(success || error) && (
                  <Box sx={{ mt: 1.5 }}>
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                  </Box>
                )}
              </>
            )}
    </EventCard>
  );
};

export default HalloweenMovieNight;


