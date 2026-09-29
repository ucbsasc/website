import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../theme/colors';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const menuItems = [
    { text: 'About', path: '/about' },
    { text: 'Events', path: '/events' },
    { text: 'Lead', path: '/lead' },
    { text: 'Resources', path: '/resources' },
    { text: 'Contact', path: '/contact' },
    { text: 'Store', path: 'https://sasc.bigcartel.com', external: true },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: colors.berkeleyBlue,
          borderBottom: `3px solid ${colors.calGold}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            variant="dense"
            sx={{
              minHeight: '52px !important',
              height: 52,
              py: 0,
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="SASC"
                sx={{ height: 36, width: 'auto', display: 'block' }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '1px',
                  lineHeight: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 700,
                    fontSize: '26px',
                    letterSpacing: '-0.03em',
                    color: '#fff',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  SASC
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '10px',
                    color: colors.calGold,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  UC Berkeley
                </Box>
              </Box>
            </Box>

            {isMobile ? (
              <IconButton
                sx={{ ml: 'auto', color: '#fff' }}
                onClick={handleDrawerToggle}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {menuItems.map((item) =>
                  item.external ? (
                    <Button
                      key={item.text}
                      href={item.path}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        color: 'rgba(255,255,255,0.75)',
                        fontWeight: 600,
                        px: 1.35,
                        minWidth: 0,
                        '&:hover': { color: colors.calGold, bgcolor: 'transparent' },
                      }}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: isActive(item.path) ? colors.calGold : 'rgba(255,255,255,0.75)',
                        fontWeight: 600,
                        px: 1.35,
                        minWidth: 0,
                        bgcolor: isActive(item.path) ? 'rgba(253, 181, 21, 0.16)' : 'transparent',
                        borderRadius: 1,
                        '&:hover': {
                          color: colors.calGold,
                          bgcolor: 'rgba(253, 181, 21, 0.16)',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  )
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: colors.berkeleyBlue,
            borderLeft: `3px solid ${colors.calGold}`,
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 2.5, borderBottom: `2px solid rgba(255,255,255,0.18)` }}>
          <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff' }}>
            SASC
          </Typography>
          <Typography variant="body2" sx={{ color: colors.calGold, fontWeight: 700, letterSpacing: '0.06em' }}>
            UC BERKELEY
          </Typography>
        </Box>
        <List sx={{ pt: 1 }}>
          <ListItem disablePadding>
            <Button
              component={Link}
              to="/"
              onClick={handleDrawerToggle}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                px: 3,
                py: 1.25,
                fontWeight: 600,
                color: location.pathname === '/' ? colors.calGold : 'rgba(255,255,255,0.85)',
                bgcolor: location.pathname === '/' ? 'rgba(253, 181, 21, 0.16)' : 'transparent',
              }}
            >
              Home
            </Button>
          </ListItem>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              {item.external ? (
                <Button
                  href={item.path}
                  target="_blank"
                  rel="noopener"
                  onClick={handleDrawerToggle}
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    px: 3,
                    py: 1.25,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    px: 3,
                    py: 1.25,
                    fontWeight: 600,
                    color: isActive(item.path) ? colors.calGold : 'rgba(255,255,255,0.85)',
                    bgcolor: isActive(item.path) ? 'rgba(253, 181, 21, 0.16)' : 'transparent',
                  }}
                >
                  {item.text}
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
