import { createTheme, responsiveFontSizes } from '@mui/material';
import { colors, RADIUS } from './colors';

const serif = '"Fraunces", "Times New Roman", Times, serif';
const sans = '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif';

let theme = createTheme({
  palette: {
    primary: {
      main: colors.berkeleyBlue,
      light: colors.foundersRock,
      dark: colors.darkBlue,
    },
    secondary: {
      main: colors.calGold,
      light: colors.lightGold,
      dark: colors.medalist,
    },
    background: {
      default: colors.cream,
      paper: colors.paper,
    },
    text: {
      primary: colors.charcoal,
      secondary: '#4A6072',
    },
    divider: 'rgba(0, 50, 98, 0.18)',
    info: {
      main: colors.foundersRock,
      light: '#5D9BBC',
      dark: colors.darkBlue,
      contrastText: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: RADIUS,
  },
  typography: {
    fontFamily: sans,
    h1: {
      fontFamily: serif,
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      color: colors.charcoal,
    },
    h2: {
      fontFamily: serif,
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      color: colors.charcoal,
    },
    h3: {
      fontFamily: serif,
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
      color: colors.charcoal,
    },
    h4: {
      fontFamily: serif,
      fontSize: '1.55rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: colors.charcoal,
    },
    h5: {
      fontFamily: serif,
      fontSize: '1.3rem',
      fontWeight: 600,
      color: colors.charcoal,
    },
    h6: {
      fontFamily: sans,
      fontSize: '1.05rem',
      fontWeight: 600,
      color: colors.charcoal,
    },
    body1: {
      fontFamily: sans,
      fontSize: '1.0625rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: sans,
      fontSize: '0.95rem',
      lineHeight: 1.65,
    },
    button: {
      fontFamily: sans,
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    overline: {
      fontFamily: sans,
      letterSpacing: '0.12em',
      fontWeight: 700,
      fontSize: '0.7rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.cream,
          color: colors.charcoal,
          backgroundImage: `
            radial-gradient(rgba(0, 50, 98, 0.06) 0.8px, transparent 0.8px)
          `,
          backgroundSize: '7px 7px',
        },
        a: {
          color: 'inherit',
        },
        '::selection': {
          backgroundColor: colors.lightGold,
          color: colors.charcoal,
        },
        'img, video, iframe, canvas': {
          borderRadius: RADIUS,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.berkeleyBlue,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: RADIUS,
          padding: '10px 20px',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: colors.berkeleyBlue,
          color: '#fff',
          '&:hover': {
            backgroundColor: colors.foundersRock,
          },
        },
        outlined: {
          borderWidth: 1.5,
          borderColor: colors.berkeleyBlue,
          color: colors.berkeleyBlue,
          '&:hover': {
            borderWidth: 1.5,
            borderColor: colors.berkeleyBlue,
            backgroundColor: 'rgba(0, 50, 98, 0.06)',
          },
        },
        sizeLarge: {
          padding: '12px 26px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS,
          boxShadow: '3px 3px 0 rgba(0, 50, 98, 0.22)',
          border: `1.5px solid ${colors.berkeleyBlue}`,
          backgroundImage: 'none',
          backgroundColor: colors.paper,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: RADIUS,
        },
        elevation1: {
          boxShadow: 'none',
          border: `1.5px solid rgba(0, 50, 98, 0.28)`,
        },
        elevation2: {
          boxShadow: '2px 2px 0 rgba(0, 50, 98, 0.16)',
          border: `1.5px solid rgba(0, 50, 98, 0.3)`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS,
          fontWeight: 600,
          border: `1px solid ${colors.berkeleyBlue}`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: RADIUS,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: `${RADIUS}px !important`,
          '&:before': { display: 'none' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
