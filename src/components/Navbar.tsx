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

/** Active page sits on a strip of pink label tape; hover gets a pink underline. */
const linkSx = (active: boolean) => ({
  color: colors.ink,
  fontWeight: 700,
  px: 1.35,
  py: 0.5,
  minWidth: 0,
  bgcolor: active ? colors.pink : 'transparent',
  transform: active ? 'rotate(-1.5deg)' : 'none',
  textDecoration: 'none',
  '&:hover': {
    bgcolor: active ? colors.pink : 'transparent',
    textDecoration: active ? 'none' : 'underline',
    textDecorationColor: colors.pink,
    textDecorationThickness: 3,
    textUnderlineOffset: 5,
  },
});

const drawerActiveSx = (active: boolean) => ({
  bgcolor: active ? colors.pink : 'transparent',
  '&:hover': { bgcolor: active ? colors.pink : 'rgba(30,26,28,0.06)' },
});

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
    // /seam is proxied by Netlify to its own site, so it needs a full page load, not a router Link
    { text: 'SEAM', path: '/seam', external: true },
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
          backgroundColor: colors.page,
          borderBottom: `2px solid ${colors.ink}`,
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
                    fontWeight: 700,
                    fontSize: '24px',
                    letterSpacing: '-0.02em',
                    color: colors.ink,
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
                    fontSize: '9.5px',
                    color: colors.inkMuted,
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  UC Berkeley
                </Box>
              </Box>
            </Box>

            {isMobile ? (
              <IconButton sx={{ ml: 'auto', color: colors.ink }} onClick={handleDrawerToggle} aria-label="Open menu">
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {menuItems.map((item) =>
                  item.external ? (
                    <Button
                      key={item.text}
                      href={item.path}
                      sx={linkSx(false)}
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                      sx={linkSx(isActive(item.path))}
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
            bgcolor: colors.page,
            borderLeft: `2px solid ${colors.ink}`,
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 2.5, borderBottom: `2px solid ${colors.ink}` }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            SASC
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: colors.inkMuted, fontWeight: 700, letterSpacing: '0.16em', fontSize: '0.7rem' }}
          >
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
                fontWeight: 700,
                color: 'text.primary',
                ...drawerActiveSx(location.pathname === '/'),
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
                  onClick={handleDrawerToggle}
                  sx={{ width: '100%', justifyContent: 'flex-start', px: 3, py: 1.25, fontWeight: 700, color: 'text.primary' }}
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
                    fontWeight: 700,
                color: 'text.primary',
                    ...drawerActiveSx(isActive(item.path)),
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
