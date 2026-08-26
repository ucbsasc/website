import { Dialog, DialogContent, IconButton, Box, Typography, Button, Stack, Grid, TextField, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { addEventRsvp } from '../../firebase/rsvps';

interface SeasgivingModalProps {
  open: boolean;
  onClose: () => void;
}

const SeasgivingModal = ({ open, onClose }: SeasgivingModalProps) => {
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
  const title = 'SASC 25th Anniversary | SEAsgiving Celebration';
  const location = 'Clark Kerr Garden Room (Bldg 10), 2601 Warring St, Berkeley, CA 94720';
  const dateLine = 'Wednesday, November 12 • 7:00 PM – 9:00 PM';

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=20251113T030000Z/20251113T050000Z&details=${encodeURIComponent(
    'Join SASC for our special 25th Anniversary celebration held alongside SEAsgiving. Alumni and current members welcome!'
  )}&location=${encodeURIComponent(location)}`;

  const handleClose = () => {
    try {
      localStorage.setItem('seasgiving_dismissed_v2', 'true');
    } catch {
      // Continue closing if localStorage is unavailable.
    }
    onClose();
  };

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
      await addEventRsvp('seasgiving-anniversary-2025-11-12', name.trim(), email.trim());
      setSuccess('Thanks! Your RSVP has been received. See you there!');
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
            src="/seasgivinggroup.jpg"
            alt="SEAsgiving Celebration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
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
            Join us for an evening of food, gratitude, and connection with SASC alumni and current members. SEAsgiving includes a can-drive raffle: 1 can = 1 raffle ticket. All canned donations support the SEA Community Center in San Francisco.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2 }}>
            <Button variant="outlined" color="secondary" href={gcalUrl} target="_blank" startIcon={<CalendarMonthIcon />}>
              Add to Calendar
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            RSVP (Students & Community)
          </Typography>

          {!isFirebaseConfigured && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              RSVP temporarily unavailable. Site configuration is incomplete.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="secondary" fullWidth disabled={submitting || !isFirebaseConfigured}>
                  {submitting ? 'Submitting…' : 'RSVP'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {(success || error) && (
            <Box sx={{ mt: 1.5 }}>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SeasgivingModal;


