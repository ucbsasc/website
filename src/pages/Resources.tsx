import { Container, Typography, Link, Divider, Paper, Box, Grid, Card, CardContent, CardMedia, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const Resources = () => {
  usePageTitle('Resources');
  const theme = useTheme();
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
            borderRadius: 2,
            bgcolor: 'rgba(30, 43, 54, 0.04)',
            border: '1px solid',
            borderColor: 'divider',
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
            Immigration Resources
          </Typography>
          <Typography variant="body1" paragraph>
            For immediate immigration resources and know your right pamphlets in Arabic, Bengali, Burmese, Chinese, English, Gujarati, Hindi, Karen, Khmer, Korean, Nepali, Punjabi, Urdu, Vietnamese, Tagalog, Thai, and Spanish, please visit:
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
            Know Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            For all other know your rights resources please visit:
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
            Legal Aid
          </Typography>
          <Typography variant="body1" paragraph>
            For immediate help and direction please visit:
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
            California Wildfire Resources
          </Typography>
          <Typography variant="body1" paragraph>
            For California Wildfire Resources, please visit:
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
          Media Kit
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Download official SASC assets and reference our brand colors for flyers, social posts, and partner materials.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>Color Palette</Typography>
              <Grid container spacing={2}>
                {[ 
                  { label: 'Primary', value: theme.palette.primary.main },
                  { label: 'Primary Light', value: theme.palette.primary.light },
                  { label: 'Primary Dark', value: theme.palette.primary.dark },
                  { label: 'Secondary', value: theme.palette.secondary.main },
                  { label: 'Secondary Light', value: theme.palette.secondary.light },
                  { label: 'Secondary Dark', value: theme.palette.secondary.dark },
                  { label: 'Background', value: theme.palette.background.default },
                  { label: 'Text', value: theme.palette.text.primary },
                ].map((swatch) => (
                  <Grid item xs={6} sm={4} key={swatch.label}>
                    <Card>
                      <Box sx={{ height: 72, bgcolor: swatch.value, borderBottom: '1px solid rgba(0,0,0,0.08)' }} />
                      <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{swatch.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{swatch.value}</Typography>
                      </CardContent>
                    </Card>
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
                Please avoid altering colors or proportions. For alternate formats (SVG/white mark), contact us at UCB.SASC@gmail.com.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Usage Guidelines</Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            <li><Typography variant="body2">Use official colors and maintain sufficient contrast for accessibility.</Typography></li>
            <li><Typography variant="body2">Leave clear space around the logo; do not distort or recolor.</Typography></li>
            <li><Typography variant="body2">For co-branding, place partner marks with balanced visual weight.</Typography></li>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Resources; 