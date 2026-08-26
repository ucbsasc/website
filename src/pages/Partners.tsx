import { Box, Container, Typography, Grid, Stack, IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { partners, partnerCategories, PartnerCategory } from '../data/partners';
import { usePageTitle } from '../hooks/usePageTitle';
import { RADIUS } from '../theme/colors';

const categoryLabel: Record<PartnerCategory, string> = {
  'Student Orgs': 'Southeast Asian & Asian American Student Orgs',
  'Campus Resources': 'Campus & Academic Resources',
  'SASC Programs': 'SASC Subprograms',
};

const Partners = () => {
  usePageTitle('Community & Partners');

  return (
    <Box>
      <PageHeader
        title="Community & Partners"
        subtitle="We don't do this alone. SASC runs alongside other Southeast Asian and Asian American student orgs, campus resources built for our communities, and our own subprograms."
        image="/sascomm.webp"
        compact
      />

      <Container sx={{ pb: 8 }}>
        {partnerCategories.map((category) => {
          const categoryPartners = partners.filter((p) => p.category === category);
          if (categoryPartners.length === 0) return null;
          return (
            <Box key={category} sx={{ mb: 5, '&:last-of-type': { mb: 0 } }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                {categoryLabel[category]}
              </Typography>
              <Grid container spacing={1.5}>
                {categoryPartners.map((partner) => (
                  <Grid item xs={12} sm={6} md={4} key={partner.name}>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        border: '1.5px solid',
                        borderColor: 'divider',
                        borderRadius: `${RADIUS}px`,
                        bgcolor: 'background.paper',
                      }}
                    >
                      {partner.logo && (
                        <Box
                          component="img"
                          src={partner.logo}
                          alt=""
                          sx={{
                            width: 36,
                            height: 36,
                            objectFit: 'contain',
                            flexShrink: 0,
                            borderRadius: '4px',
                          }}
                        />
                      )}
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {partner.name}
                        </Typography>
                        {(partner.instagram || partner.emails) && (
                          <Stack direction="row" spacing={0.25} sx={{ mt: 0.25 }}>
                            {partner.instagram && (
                              <Tooltip title={partner.instagram}>
                                <IconButton
                                  size="small"
                                  href={`https://instagram.com/${partner.instagram.replace('@', '')}`}
                                  target="_blank"
                                  rel="noopener"
                                  aria-label={`${partner.name} on Instagram`}
                                >
                                  <InstagramIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {partner.emails?.map((email) => (
                              <Tooltip title={email} key={email}>
                                <IconButton
                                  size="small"
                                  href={`mailto:${email}`}
                                  aria-label={`Email ${partner.name}`}
                                >
                                  <EmailIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ))}
                          </Stack>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Container>

      <Footer />
    </Box>
  );
};

export default Partners;
