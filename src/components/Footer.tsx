import { Box, Container, Grid, Typography, IconButton, Stack, Link as MuiLink } from '@mui/material';
import { Instagram, Facebook } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme/colors';

const Footer = () => {
  const links = [
    { label: 'About', to: '/about' },
    { label: 'Events', to: '/events' },
    { label: 'Partners', to: '/partners' },
    { label: 'Lead', to: '/lead' },
    { label: 'Resources', to: '/resources' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.charcoal,
        color: 'white',
        py: { xs: 5, md: 7 },
        mt: 'auto',
        borderTop: `4px solid ${colors.gold}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 700,
                fontSize: '1.75rem',
                letterSpacing: '-0.02em',
                mb: 1,
              }}
            >
              SASC
            </Typography>
            <Typography
              variant="overline"
              sx={{ color: colors.gold, display: 'block', mb: 1.5, letterSpacing: '0.1em' }}
            >
              UC Berkeley · Est. 2000
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)', maxWidth: 320, lineHeight: 1.65 }}>
              Southeast Asian Student Coalition. Mentorship, culture, and community. Built by students, for our people.
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 1.5 }}>
              Explore
            </Typography>
            <Stack spacing={1}>
              {links.map((link) => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="hover"
                  sx={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.95rem', fontWeight: 600 }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 1.5 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)', mb: 0.5 }}>
              506 Barrows Hall
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.88)', mb: 0.5 }}>
              Berkeley, CA 94720
            </Typography>
            <MuiLink
              href="mailto:UCB.SASC@gmail.com"
              underline="hover"
              sx={{ color: colors.pink, fontSize: '0.95rem', fontWeight: 600 }}
            >
              UCB.SASC@gmail.com
            </MuiLink>
            <Stack direction="row" spacing={0.5} sx={{ mt: 2 }}>
              <IconButton
                href="https://www.instagram.com/ucbsasc"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                size="small"
                sx={{ color: 'white' }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/ucbsasc"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                size="small"
                sx={{ color: 'white' }}
              >
                <Facebook fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} Southeast Asian Student Coalition
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
            Built at Cal
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
