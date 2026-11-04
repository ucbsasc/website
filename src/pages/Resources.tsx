import { Container, Typography, Link, Divider, Paper, Box, Grid, Card, CardMedia, Button, Stack } from '@mui/material';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors } from '../theme/colors';

/** The print palette from docs/brand/style.md, for anyone making a flyer with us. */
const palette = [
  { label: 'Flyer pink', value: colors.pink },
  { label: 'Duotone pink', value: colors.duotonePink },
  { label: 'Ink', value: colors.ink },
  { label: 'Black', value: colors.black },
  { label: 'Cream', value: colors.cream },
];

const Resources = () => {
  usePageTitle('Resources');
  return (
    <>
      <PageHeader
        title="Resources"
        subtitle="Start with immigration and legal links if you need them now. Media kit for flyers is further down."
        image="/grid/workshop.webp"
        compact
      />

      <Container sx={{ pb: 8 }}>
        <Box
          sx={{
            mb: 3,
            p: 2,
            border: `2px solid ${colors.ink}`,
            bgcolor: colors.paper,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            If you need this now
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The immigration, know-your-rights, and legal aid links below are for immediate use. SASC is a student
            coalition, not a legal service. These partner organizations can help directly.
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Immigration resources
          </Typography>
          <Typography variant="body1" paragraph>
            Immigration help and know-your-rights pamphlets in Arabic, Bengali, Burmese, Chinese, English, Gujarati, Hindi, Karen, Khmer, Korean, Nepali, Punjabi, Urdu, Vietnamese, Tagalog, Thai, and Spanish:
          </Typography>
          <Link 
            href="https://ajsocal.org/immigration/" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ display: 'block', mb: 3 }}
          >
            Immigration - Asian Americans Advancing Justice Southern California
          </Link>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            Know your rights
          </Typography>
          <Typography variant="body1" paragraph>
            What to do if you encounter ICE, plus other know-your-rights guides:
          </Typography>
          <Link 
            href="https://immigrantjustice.org/know-your-rights/ice-encounter" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ display: 'block', mb: 3 }}
          >
            Know Your Rights: If You Encounter ICE | National Immigrant Justice Center
          </Link>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            Legal aid
          </Typography>
          <Typography variant="body1" paragraph>
            If you need legal help and don&apos;t know where to start:
          </Typography>
          <Link 
            href="https://ajsocal.org/legal-victim-help/" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ display: 'block', mb: 3 }}
          >
            Legal Aid and Advice | Asian Americans Advancing Justice Southern California
          </Link>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" component="h2" gutterBottom>
            California wildfire resources
          </Typography>
          <Typography variant="body1" paragraph>
            Help for people affected by California wildfires:
          </Typography>
          <Link 
            href="https://ajsocal.org/california-wildfire-resources/" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ display: 'block', mb: 3 }}
          >
            California Wildfire Resources
          </Link>
        </Paper>

        <Divider sx={{ my: 6 }} />

        <Typography variant="h3" component="h2" gutterBottom>
          Media kit
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Our logo and colors, for anyone making a flyer or a collab post with us.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>Colors</Typography>
              <Grid container spacing={2}>
                {palette.map((swatch) => (
                  <Grid item xs={6} sm={4} key={swatch.label}>
                    <Box sx={{ height: 64, bgcolor: swatch.value, border: `1.5px solid ${colors.ink}`, mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{swatch.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{swatch.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>Logos</Typography>
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  image="/logo.png"
                  alt="SASC Logo"
                  sx={{ objectFit: 'contain', height: 140, bgcolor: 'background.default' }}
                />
              </Card>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button variant="contained" href="/logo.png" download>
                  Download PNG
                </Button>
                <Button variant="outlined" href="/logo.png" target="_blank">
                  Open Logo
                </Button>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Need an SVG or a white version? Email UCB.SASC@gmail.com.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Usage guidelines</Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Stick to our colors, and make sure any text on top of them is easy to read.</Typography></li>
            <li><Typography variant="body2">Give the logo some room. Don&apos;t stretch it or change its colors.</Typography></li>
            <li><Typography variant="body2">On collab posts, keep our logo and your partner&apos;s logo about the same size.</Typography></li>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Resources; 