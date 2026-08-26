import { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Card, CardContent, 
  CircularProgress, Alert
} from '@mui/material';
import { findRsvpByEmail, addEventRsvp, checkInStudentWithTransaction, EventRsvp } from '../firebase/rsvps';
import { auth } from '../firebase/config';
import { signInAnonymously } from 'firebase/auth';
import { usePageTitle } from '../hooks/usePageTitle';

const EVENT_KEY = 'professional-headshots-2026-02-06';

const StudentSlate = () => {
  usePageTitle('Check-In');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rsvp, setRsvp] = useState<EventRsvp | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setLoading(true);
    setError(null);

    try {
      if (!auth.currentUser) await signInAnonymously(auth);
      
      const existingRsvp = await findRsvpByEmail(EVENT_KEY, email.trim());
      
      if (existingRsvp) {
        // Found them! Check them in and show slate.
        // We pass the name they just typed to update it if needed.
        const updatedRsvp = await checkInStudentWithTransaction(existingRsvp.id!, EVENT_KEY, name.trim());
        setRsvp(updatedRsvp as EventRsvp);
      } else {
        // Not found, create new RSVP
        const newRsvp = await addEventRsvp(EVENT_KEY, name.trim(), email.trim());
        // Check in immediately
        const updatedRsvp = await checkInStudentWithTransaction(newRsvp.id!, EVENT_KEY);
        setRsvp(updatedRsvp as EventRsvp);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (rsvp) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'black', 
          color: 'white', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.7 }}>
          SASC Headshots
        </Typography>
        
        <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', lineHeight: 1, my: 4 }}>
          #{rsvp.sequenceNumber?.toString().padStart(3, '0')}
        </Typography>
        
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          {rsvp.name}
        </Typography>
        
        <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
          {rsvp.email}
        </Typography>

        <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2, mb: 2 }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(rsvp.id || '')}`}
            alt="ID QR Code"
            style={{ display: 'block', width: 200, height: 200 }}
          />
        </Box>
        
        <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.5 }}>
          ID: {rsvp.id}
        </Typography>

        <Alert severity="info" sx={{ mt: 4, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
          Please show this screen to the photographer.
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8, minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card elevation={3} sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Headshot Check-in
            </Typography>
            <Typography color="text.secondary">
              Enter your name and email to get your ticket.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              sx={{ mb: 3 }}
              autoFocus
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{ mb: 3 }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              disabled={loading}
              sx={{ py: 1.5, fontSize: '1.1rem' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Get Ticket'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentSlate;
