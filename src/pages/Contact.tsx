import { Box, Container, Typography, Grid, Stack, Button, IconButton, Divider } from '@mui/material';
import { EmailOutlined, LocationOnOutlined, Instagram, Facebook } from '@mui/icons-material';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { directors, LeadershipMember } from '../data/leadership';
import { usePageTitle } from '../hooks/usePageTitle';

const generalEmail = 'UCB.SASC@gmail.com';

const byCommittee = (committee: LeadershipMember['committee']) =>
  directors.filter((d) => d.committee === committee);

const contactRoutes: Array<{
  title: string;
  detail: string;
  people: Array<{ name: string; email: string }>;
}> = [
  {
    title: 'General questions & collabs',
    detail: 'Best starting point for most messages. We route things from here if needed.',
    people: [{ name: 'SASC inbox', email: generalEmail }],
  },
  {
    title: 'SEAM & external partnerships',
    detail: 'High school mentorship, campus partners, and off-campus collabs.',
    people: byCommittee('External').map((d) => ({ name: `${d.name} · ${d.role}`, email: d.email })),
  },
  {
    title: 'Media, flyers & social',
    detail: 'Logo use, graphics, photo/video requests, and Instagram collabs.',
    people: byCommittee('PR').map((d) => ({ name: `${d.name} · ${d.role}`, email: d.email })),
  },
  {
    title: 'Member support & internal programs',
    detail: 'Bonding, wellness spaces, and questions about getting involved as a member.',
    people: byCommittee('Internal').map((d) => ({ name: `${d.name} · ${d.role}`, email: d.email })),
  },
];

const Contact = () => {
  usePageTitle('Contact');

  return (
    <>
      <PageHeader
        title="Contact"
        subtitle="Email is the most reliable way to reach us. Use the topic list below if you already know who you need."
        image="/grid/tabling.webp"
        compact
      />

      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ mb: 3, fontSize: '1.5rem' }}>
              Who to email
            </Typography>
            <Stack spacing={3} divider={<Divider flexItem />}>
              {contactRoutes.map((route) => (
                <Box key={route.title}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.1rem' }}>
                    {route.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {route.detail}
                  </Typography>
                  <Stack spacing={1.25}>
                    {route.people.map((person) => (
                      <Box key={person.email}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {person.name}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EmailOutlined />}
                          href={`mailto:${person.email}?subject=${encodeURIComponent(`SASC: ${route.title}`)}`}
                        >
                          {person.email}
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <LocationOnOutlined color="primary" />
                  <Typography variant="h5" sx={{ fontSize: '1.25rem' }}>
                    Visit
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  506 Barrows Hall
                  <br />
                  Berkeley, CA 94720
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5" sx={{ fontSize: '1.25rem', mb: 1.5 }}>
                  Social
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Instagram is usually fastest for public updates. DMs work for quick questions; email is better for
                  longer asks.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    href="https://www.instagram.com/ucbsasc"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
                    sx={{ color: 'primary.dark', border: '1px solid', borderColor: 'divider' }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    href="https://www.facebook.com/ucbsasc"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                    sx={{ color: 'primary.dark', border: '1px solid', borderColor: 'divider' }}
                  >
                    <Facebook />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
