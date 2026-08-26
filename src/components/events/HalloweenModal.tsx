import { Dialog, DialogContent, IconButton, Box, Typography, Button, TextField, Alert, Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import { addEventRsvp } from '../../firebase/rsvps';
import { auth } from '../../firebase/config';
import { signInAnonymously } from 'firebase/auth';

interface HalloweenModalProps {
  open: boolean;
  onClose: () => void;
}

const HalloweenModal = ({ open, onClose }: HalloweenModalProps) => {
  const title = 'Halloween Movie Night + Costume Party';
  const location = 'SOCS 60';
  const dateLine = 'Friday, October 24 • 7:30 PM – 10:00 PM';
  const details = 'Join us for SASC\'s Halloween movie night and optional costume party. We\'ll watch the horror comedy "Pee Mak" (not too scary), with free snacks and prizes for costumes. Free to attend.';

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=20251025T023000Z/20251025T050000Z&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    location
  )}`;

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

  const handleClose = () => {
    try {
      localStorage.setItem('halloween_dismissed', 'true');
    } catch {
      // Continue closing if localStorage is unavailable.
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        aria-label="Close"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500',
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 200, sm: 300 },
            overflow: 'hidden',
          }}
        >
          <img
            src="/halloween night.webp"
            alt="Halloween Movie Night"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '4px',
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              THIS FRIDAY!
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {dateLine}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Location:</strong> {location}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {details}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>What to know:</Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <li><Typography variant="body2">Watching "Pee Mak," a horror comedy that's not too scary</Typography></li>
              <li><Typography variant="body2">Costume contest is optional, with prizes for anyone who dresses up</Typography></li>
              <li><Typography variant="body2">Free snacks provided</Typography></li>
            </Box>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 3 }}>
            <Button variant="outlined" color="primary" href={gcalUrl} target="_blank" startIcon={<CalendarMonthIcon />}>
              Add to Calendar
            </Button>
          </Stack>

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            RSVP Now
          </Typography>
          {!isFirebaseConfigured && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              RSVP temporarily unavailable. Site configuration is incomplete.
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={submitting || !isFirebaseConfigured}
                >
                  {submitting ? 'Submitting…' : 'Submit RSVP'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {(success || error) && (
            <Box sx={{ mt: 2 }}>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HalloweenModal;

