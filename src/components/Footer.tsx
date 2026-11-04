import { Box, Container, Grid, Typography, IconButton, Stack, Link as MuiLink } from '@mui/material';
import { Instagram, Facebook } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme/colors';
import { blackPaper } from '../theme/textures';
import { LabelTape } from './brand';

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
        ...blackPaper,
        color: colors.textOnBlack,
        py: { xs: 5, md: 7 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.75rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                mb: 1.25,
              }}
            >
              SASC
            </Typography>
            <LabelTape color="pink" size="sm" tilt={-1.5} sx={{ mb: 2 }}>
              UC Berkeley · Est. 2000
            </LabelTape>
            <Typography variant="body2" sx={{ color: colors.mutedOnBlack, maxWidth: 320, lineHeight: 1.65 }}>
              Southeast Asian Student Coalition at UC Berkeley. Come say hi at a GM.
            </Typography>
          </Grid>

          <Grid item xs={5} md={3}>
            <Typography variant="overline" sx={{ color: colors.mutedOnBlack, display: 'block', mb: 1.5 }}>
              Explore
            </Typography>
            <Stack spacing={1}>
              {links.map((link) => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="hover"
                  sx={{ color: colors.textOnBlack, fontSize: '0.95rem', fontWeight: 700, width: 'fit-content' }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={7} md={4}>
            <Typography variant="overline" sx={{ color: colors.mutedOnBlack, display: 'block', mb: 1.5 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textOnBlack, mb: 0.5 }}>
              506 Barrows Hall
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textOnBlack, mb: 0.5 }}>
              Berkeley, CA 94720
            </Typography>
            <MuiLink
              href="mailto:UCB.SASC@gmail.com"
              underline="hover"
              sx={{ color: colors.pink, fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap' }}
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
                sx={{ color: colors.textOnBlack, ml: -1, '&:hover': { color: colors.pink, bgcolor: 'transparent' } }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/ucbsasc"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                size="small"
                sx={{ color: colors.textOnBlack, '&:hover': { color: colors.pink, bgcolor: 'transparent' } }}
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
            borderTop: '1px solid rgba(247,240,230,0.16)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: colors.mutedOnBlack }}>
            © {new Date().getFullYear()} Southeast Asian Student Coalition
          </Typography>
          <Typography variant="caption" sx={{ color: colors.mutedOnBlack }}>
            Built at Cal
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
